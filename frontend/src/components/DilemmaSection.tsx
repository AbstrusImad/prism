'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Send, AlertCircle, Check, Loader2, FileText } from 'lucide-react';

interface DilemmaSectionProps {
  onSubmit?: (title: string, text: string) => void;
}

export function DilemmaSection({ onSubmit }: DilemmaSectionProps) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.dilemma-reveal').forEach((child, i) => {
            (child as HTMLElement).style.animation = `float-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s forwards`;
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isValid = title.trim().length >= 5 && text.trim().length >= 20 && text.trim().length <= 600;

  const handleSubmit = useCallback(() => {
    if (!isValid) return;
    setShowConfirm(true);
  }, [isValid]);

  const confirmSubmit = useCallback(() => {
    setShowConfirm(false);
    setSubmitted(true);
    onSubmit?.(title, text);
    setTimeout(() => {
      setTitle('');
      setText('');
      setSubmitted(false);
    }, 3000);
  }, [title, text, onSubmit]);

  return (
    <section id="dilemma" ref={ref} className="ruled-section" style={{
      padding: 'var(--space-3xl) 0',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
        gap: 'var(--space-xl)',
        alignItems: 'start',
      }} className="dilemma-grid">
        {/* Left editorial column */}
        <div className="dilemma-reveal" style={{}}>
          <span className="font-label" style={{
            color: 'var(--accent-rose)',
            display: 'block',
            marginBottom: 'var(--space-sm)',
          }}>
            Section II
          </span>
          <h2 className="font-heading" style={{
            fontSize: 'var(--text-h2)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-md)',
          }}>
            The Dilemma
          </h2>
          <p style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-tertiary)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-md)',
          }}>
            Present your ethical question with enough context for each philosophical lens to reason about it clearly.
          </p>

          <div className="neu-inset" style={{ padding: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <FileText size={14} style={{ color: 'var(--accent-lavender)' }} />
              <span className="font-label" style={{ color: 'var(--text-tertiary)' }}>
                Guidelines
              </span>
            </div>
            <ul style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-tertiary)',
              lineHeight: 1.8,
              paddingLeft: 16,
            }}>
              <li>Describe the specific scenario</li>
              <li>Identify the parties affected</li>
              <li>State the core ethical tension</li>
              <li>20 to 600 characters</li>
            </ul>
          </div>
        </div>

        {/* Right form column */}
        <div className="dilemma-reveal" style={{}}>
          <div className="neu-raised" style={{ padding: 'var(--space-xl)' }}>
            {/* Title input */}
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label
                htmlFor="dilemma-title"
                className="font-label"
                style={{
                  display: 'block',
                  color: 'var(--text-tertiary)',
                  marginBottom: 8,
                }}
              >
                Title
              </label>
              <input
                id="dilemma-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Autonomous Vehicle Choice"
                className="neu-inset"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                }}
                maxLength={100}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 4,
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  color: title.length < 5 ? 'var(--danger)' : 'var(--text-muted)',
                }}>
                  {title.length < 5 ? 'Minimum 5 characters' : ''}
                </span>
                <span className="font-mono" style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}>
                  {title.length}/100
                </span>
              </div>
            </div>

            {/* Text area */}
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label
                htmlFor="dilemma-text"
                className="font-label"
                style={{
                  display: 'block',
                  color: 'var(--text-tertiary)',
                  marginBottom: 8,
                }}
              >
                The Dilemma
              </label>
              <textarea
                id="dilemma-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Describe the ethical scenario in detail. Who is affected? What are the options? What makes this a hard choice?"
                className="neu-inset"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  minHeight: 140,
                  resize: 'vertical',
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                  lineHeight: 1.6,
                }}
                maxLength={600}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 4,
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  color: text.length > 0 && text.length < 20 ? 'var(--danger)' : 'var(--text-muted)',
                }}>
                  {text.length > 0 && text.length < 20 ? 'Minimum 20 characters' : ''}
                </span>
                <span className="font-mono" style={{
                  fontSize: '0.7rem',
                  color: text.length > 550 ? 'var(--warning)' : 'var(--text-muted)',
                }}>
                  {text.length}/600
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || submitted}
              className="neu-button flex items-center justify-center gap-2"
              style={{
                width: '100%',
                padding: '14px 20px',
                background: isValid ? 'var(--gradient-accent)' : undefined,
                boxShadow: isValid
                  ? '4px 4px 12px rgba(167, 139, 250, 0.3), -2px -2px 8px rgba(255, 255, 255, 0.5)'
                  : undefined,
              }}
            >
              {submitted ? (
                <>
                  <Check size={16} style={{ color: 'white' }} />
                  <span className="font-label" style={{ color: 'white' }}>Submitted for Analysis</span>
                </>
              ) : (
                <>
                  <Send size={14} style={{ color: isValid ? 'white' : 'var(--text-muted)' }} />
                  <span className="font-label" style={{ color: isValid ? 'white' : 'var(--text-muted)' }}>
                    Submit for Consensus
                  </span>
                </>
              )}
            </button>

            {/* Faucet link */}
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: 12,
            }}>
              Analysis requires network fees only.{' '}
              <a
                href="https://testnet-faucet.genlayer.foundation/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-lavender)', textDecoration: 'underline' }}
              >
                Claim test GEN
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="neu-raised" style={{
            maxWidth: 420,
            width: '90vw',
            padding: 'var(--space-xl)',
          }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: 'rgba(167, 139, 250, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AlertCircle size={18} style={{ color: 'var(--accent-lavender)' }} />
              </div>
              <h3 className="font-heading" style={{ fontSize: 'var(--text-h3)' }}>
                Confirm Submission
              </h3>
            </div>

            <p style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-lg)',
            }}>
              This submits your dilemma for analysis on Bradbury Testnet. Three AI lenses will evaluate it under validator consensus. Network fees apply.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="neu-button"
                style={{ flex: 1, padding: '12px 16px' }}
              >
                <span className="font-label" style={{ color: 'var(--text-secondary)' }}>Cancel</span>
              </button>
              <button
                onClick={confirmSubmit}
                className="neu-button"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'var(--gradient-accent)',
                  boxShadow: '4px 4px 12px rgba(167, 139, 250, 0.3)',
                }}
              >
                <span className="font-label" style={{ color: 'white' }}>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .dilemma-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
