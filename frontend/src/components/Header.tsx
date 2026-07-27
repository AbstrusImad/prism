'use client';

import { useState, useCallback } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { shortAddr } from '@/lib/format';
import { Wallet, Copy, LogOut, Check, ExternalLink, Network } from 'lucide-react';

export function Header() {
  const wallet = useWallet();
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const copyAddress = useCallback(() => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [wallet.address]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{
      backdropFilter: 'blur(16px) saturate(180%)',
      background: 'rgba(238, 240, 244, 0.85)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div className="mx-auto flex items-center justify-between" style={{
        maxWidth: '1200px',
        padding: 'clamp(12px, 2vw, 16px) clamp(20px, 5vw, 40px)',
      }}>
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: 'var(--gradient-accent)',
            boxShadow: '0 2px 8px rgba(167, 139, 250, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s var(--ease-out)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 12H2L8 2Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span className="font-display" style={{
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            transition: 'color 0.2s',
          }}>
            Prism
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Network badge */}
          <div className="hidden sm:flex items-center gap-2 neu-raised-sm" style={{
            padding: '6px 12px',
            fontSize: 'var(--text-label)',
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: wallet.isOnBradbury ? 'var(--success)' : 'var(--text-muted)',
              boxShadow: wallet.isOnBradbury ? '0 0 6px var(--success)' : 'none',
            }} />
            <span className="font-label" style={{ color: 'var(--text-tertiary)' }}>
              Bradbury
            </span>
          </div>

          {/* Wallet chip */}
          {wallet.connected ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="neu-button flex items-center gap-2"
                style={{ padding: '8px 14px' }}
                aria-label="Wallet menu"
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: wallet.isOnBradbury ? 'var(--accent-lavender)' : 'var(--danger)',
                }} />
                <span className="font-mono" style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  {shortAddr(wallet.address || '')}
                </span>
              </button>

              {dropdownOpen && (
                <div
                  className="neu-raised"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    padding: '12px',
                    minWidth: 220,
                    zIndex: 60,
                  }}
                >
                  <div style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-tertiary)',
                    marginBottom: 8,
                  }}>
                    Connected
                  </div>
                  <div className="font-mono" style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-primary)',
                    wordBreak: 'break-all',
                    marginBottom: 12,
                  }}>
                    {wallet.address}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyAddress}
                      className="neu-button flex items-center gap-1"
                      style={{ padding: '6px 10px', fontSize: 'var(--text-label)', flex: 1 }}
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {copied ? 'Copied' : 'Copy'}
                      </span>
                    </button>
                    <button
                      onClick={() => { wallet.disconnect(); setDropdownOpen(false); }}
                      className="neu-button flex items-center gap-1"
                      style={{ padding: '6px 10px', fontSize: 'var(--text-label)', flex: 1 }}
                    >
                      <LogOut size={12} />
                      <span style={{ color: 'var(--text-secondary)' }}>Disconnect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={wallet.connect}
              className="neu-button flex items-center gap-2"
              style={{ padding: '8px 16px' }}
              disabled={wallet.connecting}
            >
              <Wallet size={14} style={{ color: 'var(--accent-lavender)' }} />
              <span className="font-label" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-label)' }}>
                {wallet.connecting ? 'Connecting...' : 'Connect'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Close dropdown on click outside */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
