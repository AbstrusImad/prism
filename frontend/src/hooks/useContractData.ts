'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DEMO_DILEMMAS, DEMO_ANALYSES, type Dilemma, type Analysis } from '@/lib/demo-data';

interface ContractDataState {
  dilemmas: Dilemma[];
  analyses: Analysis[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useContractData() {
  const [state, setState] = useState<ContractDataState>({
    dilemmas: DEMO_DILEMMAS,
    analyses: DEMO_ANALYSES,
    loading: false,
    error: null,
    lastUpdated: new Date(),
  });
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => { aliveRef.current = false; };
  }, []);

  const refresh = useCallback(() => {
    setState({
      dilemmas: DEMO_DILEMMAS,
      analyses: DEMO_ANALYSES,
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
  }, []);

  const setTxInFlight = useCallback((_inFlight: boolean) => {
    // Placeholder for future contract integration
  }, []);

  const stats = {
    totalDilemmas: state.dilemmas.length,
    analyzed: state.dilemmas.filter((d) => d.status === 'ANALYZED').length,
    open: state.dilemmas.filter((d) => d.status === 'OPEN').length,
  };

  return {
    ...state,
    stats,
    setTxInFlight,
    refresh,
  };
}
