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

// In frontend-only mode, data comes from demo-data.
// When a contract is deployed, replace with real chain reads.
const POLL_INTERVAL = 90000; // 90s minimum

export function useContractData() {
  const [state, setState] = useState<ContractDataState>({
    dilemmas: [],
    analyses: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });
  const aliveRef = useRef(true);
  const txInFlightRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (txInFlightRef.current) return;

    try {
      // Simulated loading for demo mode
      await new Promise((r) => setTimeout(r, 800));

      if (aliveRef.current) {
        setState({
          dilemmas: DEMO_DILEMMAS,
          analyses: DEMO_ANALYSES,
          loading: false,
          error: null,
          lastUpdated: new Date(),
        });
      }
    } catch (e) {
      if (aliveRef.current) {
        setState((s) => ({
          ...s,
          loading: false,
          error: `Could not reach the data source: ${String(e)}`,
        }));
      }
    }
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    fetchData();
    timerRef.current = setInterval(() => {
      if (!txInFlightRef.current) fetchData();
    }, POLL_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchData]);

  const setTxInFlight = useCallback((inFlight: boolean) => {
    txInFlightRef.current = inFlight;
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

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
