'use client';

import { useRef, useEffect, useState } from 'react';
import { PrismCanvas } from './PrismCanvas';
import { ArrowDown } from 'lucide-react';

export function PrismHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const progress = Math.min(1, scrollY / viewportH);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 'var(--space-3xl)',
      }}
    >
      <div className="mx-auto w-full" style={{
        maxWidth: 1200,
        padding: '0 clamp(20px, 5vw, 40px)',
      }}>
        <div style={{
          display: 'grid',
          gap: 'var(--space-xl)',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Text column */}
          <div>
            <div
              className="hero-reveal font-label"
              style={{
                color: 'var(--accent-lavender)',
                marginBottom: 'var(--space-md)',
              }}
            >
              GenLayer Intelligent Contracts
            </div>

            <h1
              className="hero-reveal font-display"
              style={{
                fontSize: 'var(--text-display)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              <span>Ethics</span>{' '}
              <span className="gradient-text">refracted</span>
              <br />
              <span style={{
                fontWeight: 300,
                color: 'var(--text-secondary)',
              }}>
                through consensus
              </span>
            </h1>

            <p
              className="hero-reveal"
              style={{
                fontSize: 'var(--text-body-lg)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '48ch',
                marginBottom: 'var(--space-xl)',
              }}
            >
              Submit an ethical dilemma and watch three philosophical frameworks analyze it independently.
              Each lens produces a scored verdict, validated under GenLayer consensus by five independent validators.
            </p>

            <div className="hero-reveal flex items-center gap-4 flex-wrap">
              <button
                className="neu-button"
                style={{
                  padding: '14px 28px',
                  background: 'var(--gradient-accent)',
                  boxShadow: '4px 4px 12px rgba(167, 139, 250, 0.3), -2px -2px 8px rgba(255, 255, 255, 0.5)',
                }}
                onClick={() => {
                  document.getElementById('dilemma')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="font-label" style={{
                  color: 'white',
                  fontSize: 'var(--text-body-sm)',
                  letterSpacing: '0.06em',
                }}>
                  Submit a Dilemma
                </span>
              </button>

              <button
                className="neu-button"
                style={{ padding: '14px 20px' }}
                onClick={() => {
                  document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="font-label" style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-body-sm)',
                  letterSpacing: '0.06em',
                }}>
                  View Archive
                </span>
              </button>
            </div>

            {/* Status chips */}
            <div className="hero-reveal flex flex-wrap items-center gap-3" style={{ marginTop: 'var(--space-xl)' }}>
              <div className="neu-raised-sm flex items-center gap-2" style={{ padding: '6px 12px' }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--success)',
                  boxShadow: '0 0 6px var(--success)',
                }} />
                <span className="font-label" style={{ color: 'var(--text-tertiary)' }}>
                  Bradbury Testnet
                </span>
              </div>
              <div className="neu-raised-sm flex items-center gap-2" style={{ padding: '6px 12px' }}>
                <span className="font-label" style={{ color: 'var(--text-tertiary)' }}>
                  3 Lenses
                </span>
              </div>
              <div className="neu-raised-sm flex items-center gap-2" style={{ padding: '6px 12px' }}>
                <span className="font-label" style={{ color: 'var(--text-tertiary)' }}>
                  5 Validators
                </span>
              </div>
            </div>
          </div>

          {/* Canvas column */}
          <div className="hero-reveal" style={{ borderRadius: 28, overflow: 'hidden' }}>
            <div className="neu-inset-lg" style={{
              aspectRatio: '1',
              maxWidth: 500,
              margin: '0 auto',
              position: 'relative',
            }}>
              <PrismCanvas scrollProgress={scrollProgress} />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-reveal flex justify-center" style={{
          paddingBottom: 'var(--space-lg)',
          marginTop: 'var(--space-xl)',
        }}>
          <button
            onClick={() => document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' })}
            className="neu-button"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'prism-breathe 3s ease-in-out infinite',
            }}
            aria-label="Scroll to introduction"
          >
            <ArrowDown size={16} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .hero-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 769px) {
          .hero-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
