'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Scale, Cpu, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import type { LensVerdict } from '@/lib/demo-data';

interface LensSectionProps {
  id: string;
  sectionNumber: string;
  verdict: LensVerdict;
  lensColor: string;
  lensIcon: typeof Eye;
}

export function LensSection({ id, sectionNumber, verdict, lensColor, lensIcon: Icon }: LensSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.lens-reveal').forEach((child, i) => {
            (child as HTMLElement).style.animation = `float-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s forwards`;
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const decisionIcon = verdict.decision === 'INTERVENE' || verdict.decision === 'DISCLOSE'
    ? <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
    : verdict.decision === 'DO NOT INTERVENE'
    ? <XCircle size={16} style={{ color: 'var(--danger)' }} />
    : <MinusCircle size={16} style={{ color: 'var(--warning)' }} />;

  return (
    <section id={id} ref={ref} className="ruled-section" style={{
      padding: 'var(--space-3xl) 0',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
        gap: 'var(--space-xl)',
        alignItems: 'start',
      }} className="lens-grid">
        {/* Editorial column */}
        <div className="lens-reveal" style={{ opacity: 0 }}>
          <span className="font-label" style={{
            color: lensColor,
            display: 'block',
            marginBottom: 'var(--space-sm)',
          }}>
            {sectionNumber}
          </span>
          <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-md)' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: `${lensColor}15`,
              border: `1px solid ${lensColor}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon size={20} style={{ color: lensColor }} />
            </div>
            <h2 className="font-heading" style={{
              fontSize: 'var(--text-h2)',
              color: 'var(--text-primary)',
            }}>
              {verdict.lensTitle}
            </h2>
          </div>

          {/* Score ring */}
          <div className="neu-raised-sm flex items-center gap-4" style={{
            padding: 'var(--space-md)',
            marginBottom: 'var(--space-md)',
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: `conic-gradient(${lensColor} ${verdict.score * 3.6}deg, var(--bg-sunken) 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'var(--bg-base)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span className="font-mono" style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: lensColor,
                }}>
                  {verdict.score}
                </span>
              </div>
            </div>
            <div>
              <div className="font-label" style={{ color: 'var(--text-muted)', marginBottom: 4 }}>
                Confidence
              </div>
              <div style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-secondary)',
              }}>
                {verdict.score >= 80 ? 'High certainty in analysis' :
                 verdict.score >= 60 ? 'Moderate confidence' :
                 'Complex case, lower certainty'}
              </div>
            </div>
          </div>

          {/* Decision badge */}
          <div className="flex items-center gap-2" style={{
            padding: '8px 14px',
            borderRadius: 12,
            background: `${lensColor}10`,
            border: `1px solid ${lensColor}25`,
          }}>
            {decisionIcon}
            <span className="font-label" style={{ color: lensColor }}>
              {verdict.decision}
            </span>
          </div>
        </div>

        {/* Analysis column */}
        <div>
          <div
            className="lens-reveal neu-raised"
            style={{
              padding: 'var(--space-xl)',
              opacity: 0,
            }}
          >
            <p style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: 'var(--space-lg)',
            }}>
              {verdict.reasoning}
            </p>

            {/* Key arguments */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="neu-button flex items-center gap-2 w-full justify-between"
              style={{ padding: '12px 16px' }}
            >
              <span className="font-label" style={{ color: 'var(--text-secondary)' }}>
                Key Arguments ({verdict.keyArguments.length})
              </span>
              {expanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
            </button>

            {expanded && (
              <div style={{
                marginTop: 'var(--space-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}>
                {verdict.keyArguments.map((arg, i) => (
                  <div
                    key={i}
                    className="neu-inset flex items-start gap-3"
                    style={{ padding: '12px 16px' }}
                  >
                    <span className="font-mono" style={{
                      fontSize: '0.75rem',
                      color: lensColor,
                      fontWeight: 600,
                      flexShrink: 0,
                      marginTop: 2,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}>
                      {arg}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .lens-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
