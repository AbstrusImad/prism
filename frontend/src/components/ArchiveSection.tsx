'use client';

import { useRef, useEffect } from 'react';
import { Archive, ChevronRight, Clock } from 'lucide-react';
import type { Analysis } from '@/lib/demo-data';
import { timeAgo } from '@/lib/format';

interface ArchiveSectionProps {
  analyses: Analysis[];
}

export function ArchiveSection({ analyses }: ArchiveSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.archive-reveal').forEach((child, i) => {
            (child as HTMLElement).style.animation = `float-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s forwards`;
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!analyses.length) {
    return (
      <section id="archive" className="ruled-section" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="neu-raised" style={{
          padding: 'var(--space-3xl)',
          textAlign: 'center',
        }}>
          <Archive size={32} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
          <h3 className="font-heading" style={{
            fontSize: 'var(--text-h3)',
            color: 'var(--text-secondary)',
            marginBottom: 8,
          }}>
            No analyses yet
          </h3>
          <p style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-tertiary)',
            maxWidth: '40ch',
            margin: '0 auto',
          }}>
            Submit an ethical dilemma above to see it analyzed by three philosophical frameworks under validator consensus.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="archive" ref={ref} className="ruled-section" style={{
      padding: 'var(--space-3xl) 0',
    }}>
      <div className="archive-reveal" style={{ marginBottom: 'var(--space-xl)' }}>
        <span className="font-label" style={{
          color: 'var(--accent-sky)',
          display: 'block',
          marginBottom: 'var(--space-sm)',
        }}>
          Section VII
        </span>
        <h2 className="font-heading" style={{
          fontSize: 'var(--text-h2)',
          color: 'var(--text-primary)',
        }}>
          Analysis Archive
        </h2>
      </div>

      {/* Numbered timeline */}
      <div style={{ position: 'relative' }}>
        {/* Timeline connector */}
        <div style={{
          position: 'absolute',
          left: 16,
          top: 0,
          bottom: 0,
          width: 1,
          background: 'var(--border-subtle)',
        }} />

        <div className="flex flex-col gap-6" style={{ paddingLeft: 48 }}>
          {analyses.map((analysis, i) => (
            <div
              key={analysis.dilemmaId}
              className="archive-reveal"
              style={{ position: 'relative' }}
            >
              {/* Timeline number */}
              <div style={{
                position: 'absolute',
                left: -48,
                top: 12,
                width: 32,
                height: 32,
                borderRadius: 10,
                background: 'var(--bg-base)',
                boxShadow: 'var(--shadow-neu-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span className="font-mono" style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent-lavender)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Card */}
              <div className="neu-raised" style={{
                padding: 'var(--space-lg)',
                cursor: 'pointer',
              }}>
                <div className="flex items-start justify-between gap-4" style={{ marginBottom: 'var(--space-md)' }}>
                  <div>
                    <h3 className="font-heading" style={{
                      fontSize: 'var(--text-h3)',
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                    }}>
                      {analysis.dilemma.title}
                    </h3>
                    <div className="flex items-center gap-3" style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--text-tertiary)',
                    }}>
                      <span className="font-mono">{analysis.dilemma.author}</span>
                      <span style={{ color: 'var(--border-subtle)' }}>|</span>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{timeAgo(new Date(analysis.analyzedAt))}</span>
                      </div>
                    </div>
                  </div>

                  {/* Convergence badge */}
                  <div className="neu-inset flex items-center gap-2" style={{
                    padding: '6px 12px',
                    flexShrink: 0,
                  }}>
                    <span className="font-mono" style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: analysis.synthesis.confidence >= 80 ? 'var(--success)' : 'var(--warning)',
                    }}>
                      {analysis.synthesis.confidence}%
                    </span>
                    <span className="font-label" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>
                      consensus
                    </span>
                  </div>
                </div>

                <p style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-md)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {analysis.synthesis.recommendation}
                </p>

                {/* Lens scores row */}
                <div className="flex flex-wrap gap-2">
                  {analysis.verdicts.map((v) => (
                    <div key={v.lens} className="flex items-center gap-2 neu-raised-sm" style={{
                      padding: '4px 10px',
                    }}>
                      <span className="font-label" style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.6rem',
                      }}>
                        {v.lens}
                      </span>
                      <span className="font-mono" style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}>
                        {v.score}
                      </span>
                    </div>
                  ))}
                  <button
                    className="neu-button flex items-center gap-1"
                    style={{ padding: '4px 10px', marginLeft: 'auto' }}
                    aria-label={`View full analysis for ${analysis.dilemma.title}`}
                  >
                    <span className="font-label" style={{ color: 'var(--accent-lavender)', fontSize: '0.6rem' }}>
                      Details
                    </span>
                    <ChevronRight size={12} style={{ color: 'var(--accent-lavender)' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
