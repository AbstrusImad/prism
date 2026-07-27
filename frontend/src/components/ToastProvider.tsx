'use client';

import { useState, useCallback, createContext, useContext, useEffect, type ReactNode } from 'react';
import { Check, AlertCircle, Info, Loader2, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  hash?: string;
  autoDismiss?: boolean;
  exiting?: boolean;
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const ICON_MAP = {
  success: Check,
  error: AlertCircle,
  info: Info,
  loading: Loader2,
};

const COLOR_MAP = {
  success: 'var(--success)',
  error: 'var(--danger)',
  info: 'var(--info)',
  loading: 'var(--accent-lavender)',
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  const handleRemove = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  // Auto-dismiss
  useEffect(() => {
    if (toast.autoDismiss !== false && toast.type !== 'loading' && toast.type !== 'error') {
      const timer = setTimeout(handleRemove, 8000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const Icon = ICON_MAP[toast.type];
  const color = COLOR_MAP[toast.type];

  return (
    <div
      className="neu-raised"
      style={{
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        transform: entered && !exiting ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: entered && !exiting ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
      }}
      role="alert"
    >
      <div style={{
        width: 28,
        height: 28,
        borderRadius: 10,
        background: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon
          size={14}
          style={{ color }}
          className={toast.type === 'loading' ? 'animate-spin' : ''}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--text-primary)',
          lineHeight: 1.4,
          margin: 0,
        }}>
          {toast.message}
        </p>
        {toast.hash && (
          <a
            href={`https://explorer-bradbury.genlayer.com/tx/${toast.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{
              fontSize: '0.7rem',
              color: 'var(--accent-lavender)',
              textDecoration: 'underline',
              marginTop: 4,
              display: 'block',
            }}
          >
            {toast.hash.slice(0, 10)}...{toast.hash.slice(-6)}
          </a>
        )}
      </div>

      <button
        onClick={handleRemove}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          flexShrink: 0,
        }}
        aria-label="Dismiss notification"
      >
        <X size={12} style={{ color: 'var(--text-muted)' }} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <div
        className="fixed z-50 flex flex-col gap-3"
        style={{
          bottom: 24,
          right: 24,
          maxWidth: 380,
          width: 'calc(100vw - 48px)',
          pointerEvents: 'none',
        }}
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
