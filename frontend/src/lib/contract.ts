import { createClient } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

// Future contract address - replace after deployment
export const CONTRACT_ADDRESS = '' as const;
export const DEPLOY_TX = '' as const;
export const EXPLORER = 'https://explorer-bradbury.genlayer.com';

export const readClient = createClient({ chain: testnetBradbury });

export const makeWalletClient = (account: `0x${string}`) =>
  createClient({ chain: testnetBradbury, account });

export async function withRpcRetry<T>(fn: () => Promise<T>, tries = 4): Promise<T> {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (!/rate limit|429|timeout|network|fetch/i.test(String(e))) throw e;
      await new Promise((r) => setTimeout(r, 2500 * 2 ** i));
    }
  }
  throw last;
}

// Transaction status names
const STATUS_NAME: Record<string, string> = {
  '1': 'PENDING', '2': 'PROPOSING', '3': 'COMMITTING', '4': 'REVEALING',
  '5': 'ACCEPTED', '6': 'UNDETERMINED', '7': 'FINALIZED', '8': 'CANCELED',
  '12': 'VALIDATORS_TIMEOUT', '13': 'LEADER_TIMEOUT',
};

export const statusName = (s: unknown) => STATUS_NAME[String(s)] ?? String(s).toUpperCase();

const TERMINAL = new Set(['ACCEPTED', 'FINALIZED', 'UNDETERMINED', 'CANCELED']);

export interface LeaderDraft {
  decision: string;
  score?: number;
  note?: string;
}

function pick(obj: unknown, key: string): unknown {
  if (obj instanceof Map) return obj.get(key);
  if (obj && typeof obj === 'object') return (obj as Record<string, unknown>)[key];
  return undefined;
}

export function extractLeaderDraft(tx: unknown): LeaderDraft | null {
  try {
    const receipts = pick(pick(tx, 'consensus_data'), 'leader_receipt');
    const first = Array.isArray(receipts) ? receipts[0] : receipts;
    const b64 = pick(pick(first, 'eq_outputs'), '0');
    if (typeof b64 !== 'string' || b64.length === 0) return null;
    const text = atob(b64);
    for (let i = text.length - 1; i >= 0; i--) {
      if (text[i] !== '{') continue;
      try {
        const obj = JSON.parse(text.slice(i));
        if (obj && typeof obj === 'object' && 'decision' in obj) return obj as LeaderDraft;
      } catch { /* keep scanning */ }
    }
    return null;
  } catch {
    return null;
  }
}

export async function pollUntilDecided(
  client: ReturnType<typeof makeWalletClient>,
  hash: `0x${string}`,
  onUpdate?: (status: string, draft: LeaderDraft | null) => void,
): Promise<{ status: string; draft: LeaderDraft | null }> {
  let draft: LeaderDraft | null = null;
  for (let i = 0; i < 150; i++) {
    const tx = await (client as unknown as {
      getTransaction: (params: { hash: string }) => Promise<unknown>
    }).getTransaction({ hash }).catch(() => null);
    const status = statusName(tx ? (tx as { status?: unknown }).status : 'PENDING');
    const txDraft = tx ? extractLeaderDraft(tx) : null;
    if (txDraft !== null) draft = txDraft;
    onUpdate?.(status, draft);
    if (TERMINAL.has(status)) return { status, draft };
    await new Promise((r) => setTimeout(r, 8000));
  }
  return { status: 'TIMEOUT', draft };
}
