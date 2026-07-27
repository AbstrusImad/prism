'use client';

import { useRef, useEffect } from 'react';
import { Layers, TrendingUp } from 'lucide-react';
import type { Analysis } from '@/lib/demo-data';

interface SynthesisPanelProps {
  analysis: Analysis;
}

export function SynthesisPanel({ analysis }: SynthesisPanelProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.synth-reveal').forEach((child, i) => {
            (child as HTMLElement).style.animation = `float-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s forwards`;
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { synthesis } = analysis;

  return (
    <section id="synthesis" ref={ref} className="ruled-section" style={{
      padding: 'var(--space-3xl) 0',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
        gap: 'var(--space-xl)',
        alignItems: 'start',
      }} className="synth-grid">
        {/* Editorial column */}
        <div className="synth-reveal" style={{ opacity: 0 }}>
          <span className="font-label" style={{
            color: 'var(--accent-peach)',
            display: 'block',
            marginBottom: 'var(--space-sm)',
          }}>
            Section VI
          </span>
          <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-md)' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: 'rgba(251, 146, 60, 0.1)',
              border: '1px solid rgba(251, 146, 60, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Layers size={20} style={{ color: 'var(--accent-peach)' }} />
            </div>
            <h2 className="font-heading" style={{
              fontSize: 'var(--text-h2)',
              color: 'var(--text-primary)',
            }}>
              Synthesis
            </h2>
          </div>

          <p style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-tertiary)',
            lineHeight: 1.7,
          }}>
            Where the three lenses converge or diverge, and what the consensus reveals about the ethical landscape of this dilemma.
          </p>
        </div>

        {/* Synthesis panel */}
        <div className="synth-reveal" style={{ opacity: 0 }}>
          {/* Convergence score */}
          <div className="neu-raised" style={{
            padding: 'var(--space-xl)',
            marginBottom: 'var(--space-md)',
          }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-lg)' }}>
              <TrendingUp size={16} style={{ color: 'var(--accent-peach)' }} />
              <span className="font-label" style={{ color: 'var(--text-tertiary)' }}>
                Convergence Score
              </span>
              <span className="font-mono" style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: synthesis.confidence >= 80 ? 'var(--success)' :
                       synthesis.confidence >= 60 ? 'var(--warning)' : 'var(--danger)',
              }}>
                {synthesis.confidence}%
              </span>
            </div>

            {/* Visual convergence bar */}
            <div className="neu-inset" style={{
              height: 8,
              borderRadius: 4,
              overflow: 'hidden',
              marginBottom: 'var(--space-lg)',
            }}>
              <div style={{
                width: `${synthesis.confidence}%`,
                height: '100%',
                borderRadius: 4,
                background: 'var(--gradient-accent)',
                transition: 'width 1s var(--ease-out)',
              }} />
            </div>

            {/* Recommendation */}
            <p style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              marginBottom: 'var(--space-md)',
              fontWeight: 500,
            }}>
              {synthesis.recommendation}
            </p>

            {/* Consensus note */}
            <div style={{
              padding: 'var(--space-md)',
              borderRadius: 12,
              background: 'rgba(167, 139, 250, 0.05)',
              borderLeft: '3px solid var(--accent-lavender)',
            }}>
              <p style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                {synthesis.consensusNote}
              </p>
            </div>
          </div>

          {/* Lens comparison mini-grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-sm)',
          }}>
            {analysis.verdicts.map((v) => (
              <div key={v.lens} className="neu-raised-sm" style={{
                padding: 'var(--space-md)',
                textAlign: 'center',
              }}>
                <div className="font-label" style={{
                  color: 'var(--text-muted)',
                  marginBottom: 6,
                  fontSize: '0.6rem',
                }}>
                  {v.lens}
                </div>
                <div className="font-mono" style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: v.score >= 80 ? 'var(--success)' :
                         v.score >= 60 ? 'var(--accent-lavender)' : 'var(--warning)',
                  marginBottom: 4,
                }}>
                  {v.score}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-tertiary)',
                  fontWeight: 600,
                }}>
                  {v.decision}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .synth-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
