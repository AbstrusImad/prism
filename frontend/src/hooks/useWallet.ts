'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
}

interface WalletState {
  address: string | null;
  chainId: number | null;
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

const BRADBURY_CHAIN_ID = 4221; // 0x107D

const BRADBURY_PARAMS = {
  chainId: '0x107D',
  chainName: 'GenLayer Bradbury Testnet',
  nativeCurrency: { name: 'GEN', symbol: 'GEN', decimals: 18 },
  rpcUrls: ['https://rpc-bradbury.genlayer.com'],
  blockExplorerUrls: ['https://explorer-bradbury.genlayer.com/'],
};

function getEthereum(): EthereumProvider | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).ethereum ?? null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    connected: false,
    connecting: false,
    error: null,
  });
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => { aliveRef.current = false; };
  }, []);

  const hasProvider = typeof window !== 'undefined' && !!(window as unknown as { ethereum?: unknown }).ethereum;

  const connect = useCallback(async () => {
    const eth = getEthereum();
    if (!eth) {
      setState((s) => ({ ...s, error: 'No wallet detected. Install MetaMask to connect.' }));
      return;
    }
    setState((s) => ({ ...s, connecting: true, error: null }));
    try {
      const accounts = await eth.request({ method: 'eth_requestAccounts' }) as string[];
      if (!accounts.length) throw new Error('No accounts returned');

      try {
        await eth.request({
          method: 'wallet_addEthereumChain',
          params: [BRADBURY_PARAMS],
        });
      } catch {
        // Chain may already be added
      }

      try {
        await eth.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BRADBURY_PARAMS.chainId }],
        });
      } catch {
        // User may reject switch
      }

      const chainIdHex = await eth.request({ method: 'eth_chainId' }) as string;
      const chainId = parseInt(chainIdHex, 16);

      if (aliveRef.current) {
        setState({
          address: accounts[0],
          chainId,
          connected: true,
          connecting: false,
          error: null,
        });
      }
    } catch (e) {
      if (aliveRef.current) {
        const msg = String(e);
        const friendly = msg.includes('user rejected') || msg.includes('4001')
          ? 'You cancelled the connection request.'
          : `Connection failed: ${msg}`;
        setState((s) => ({ ...s, connecting: false, error: friendly }));
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      chainId: null,
      connected: false,
      connecting: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    const eth = getEthereum();
    if (!eth) return;

    const onAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (!accounts.length) {
        disconnect();
      } else {
        setState((s) => ({ ...s, address: accounts[0] }));
      }
    };

    const onChainChanged = (...args: unknown[]) => {
      const chainIdHex = args[0] as string;
      setState((s) => ({ ...s, chainId: parseInt(chainIdHex, 16) }));
    };

    eth.on('accountsChanged', onAccountsChanged);
    eth.on('chainChanged', onChainChanged);

    return () => {
      eth.removeListener('accountsChanged', onAccountsChanged);
      eth.removeListener('chainChanged', onChainChanged);
    };
  }, [disconnect]);

  return {
    ...state,
    hasProvider,
    isOnBradbury: state.chainId === BRADBURY_CHAIN_ID,
    connect,
    disconnect,
  };
}
