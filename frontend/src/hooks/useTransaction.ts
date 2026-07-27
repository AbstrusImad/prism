'use client';

import { useState, useCallback, useRef } from 'react';
import type { LeaderDraft } from '@/lib/contract';

type TxPhase = 'idle' | 'wallet' | 'submitted' | 'consensus' | 'confirmed' | 'error';

interface TransactionState {
  phase: TxPhase;
  hash: string | null;
  liveStatus: string | null;
  draft: LeaderDraft | null;
  error: string | null;
}

const ERROR_MAP: Record<string, string> = {
  LackOfFundForMaxFee: 'Your wallet is below the fee reserve for AI transactions (mostly refunded). Top up at testnet-faucet.genlayer.foundation',
  'user rejected': 'You cancelled the signature.',
  '4001': 'You cancelled the signature.',
  timeout: 'The network is congested. Your transaction is still being processed.',
};

function friendlyError(raw: string): string {
  for (const [key, msg] of Object.entries(ERROR_MAP)) {
    if (raw.toLowerCase().includes(key.toLowerCase())) return msg;
  }
  return raw;
}

export function useTransaction() {
  const [state, setState] = useState<TransactionState>({
    phase: 'idle',
    hash: null,
    liveStatus: null,
    draft: null,
    error: null,
  });
  const submittingRef = useRef(false);

  const reset = useCallback(() => {
    setState({
      phase: 'idle',
      hash: null,
      liveStatus: null,
      draft: null,
      error: null,
    });
    submittingRef.current = false;
  }, []);

  const startWalletPhase = useCallback(() => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setState((s) => ({ ...s, phase: 'wallet', error: null }));
  }, []);

  const setSubmitted = useCallback((hash: string) => {
    setState((s) => ({
      ...s,
      phase: 'submitted',
      hash,
      liveStatus: 'SUBMITTED',
    }));
  }, []);

  const setConsensusStatus = useCallback((status: string, draft: LeaderDraft | null) => {
    setState((s) => ({
      ...s,
      phase: 'consensus',
      liveStatus: status,
      draft: draft ?? s.draft,
    }));
  }, []);

  const setConfirmed = useCallback(() => {
    setState((s) => ({
      ...s,
      phase: 'confirmed',
      liveStatus: 'ACCEPTED',
    }));
    submittingRef.current = false;
  }, []);

  const setError = useCallback((rawError: string) => {
    setState((s) => ({
      ...s,
      phase: 'error',
      error: friendlyError(rawError),
    }));
    submittingRef.current = false;
  }, []);

  return {
    ...state,
    isSubmitting: submittingRef.current,
    reset,
    startWalletPhase,
    setSubmitted,
    setConsensusStatus,
    setConfirmed,
    setError,
  };
}
