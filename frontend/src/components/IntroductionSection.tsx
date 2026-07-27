'use client';

import { useRef, useEffect } from 'react';
import { Eye, Cpu, Scale } from 'lucide-react';

export function IntroductionSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.intro-reveal').forEach((child, i) => {
            (child as HTMLElement).style.animation = `float-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s forwards`;
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="introduction" ref={ref} className="ruled-section" style={{
      padding: 'var(--space-3xl) 0',
    }}>
      {/* Two column editorial layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
        gap: 'var(--space-xl)',
        alignItems: 'start',
      }} className="intro-grid">
        {/* Left column - editorial label */}
        <div className="intro-reveal" style={{ opacity: 0 }}>
          <span className="font-label" style={{
            color: 'var(--accent-lavender)',
            display: 'block',
            marginBottom: 'var(--space-sm)',
          }}>
            Section I
          </span>
          <h2 className="font-heading" style={{
            fontSize: 'var(--text-h2)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-md)',
          }}>
            What is Prism?
          </h2>
          <p style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-tertiary)',
            lineHeight: 1.7,
          }}>
            Prism refracts ethical questions through three philosophical lenses, each running as an independent AI analysis under GenLayer validator consensus.
          </p>
        </div>

        {/* Right column - main content */}
        <div>
          <p
            className="intro-reveal"
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: 'var(--space-lg)',
              opacity: 0,
            }}
          >
            Most ethical analysis tools give you a single answer. Prism believes that ethical questions deserve multiple perspectives, each held accountable by independent validator consensus. You submit a dilemma, and three distinct philosophical frameworks evaluate it simultaneously on-chain.
          </p>

          {/* Three lens cards in editorial flow */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-md)',
          }} className="lens-cards-grid">
            {[
              {
                icon: Eye,
                title: 'Utilitarian',
                desc: 'Maximizes overall well-being. Weighs outcomes and consequences across all affected parties.',
                color: '#a78bfa',
              },
              {
                icon: Scale,
                title: 'Deontological',
                desc: 'Evaluates actions against universal moral duties and rules, regardless of outcomes.',
                color: '#f472b6',
              },
              {
                icon: Cpu,
                title: 'Virtue Ethics',
                desc: 'Focuses on character and virtue. Asks what a wise, courageous person would do.',
                color: '#60a5fa',
              },
            ].map((lens, i) => (
              <div
                key={lens.title}
                className="intro-reveal neu-raised"
                style={{
                  padding: 'var(--space-lg)',
                  opacity: 0,
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: `${lens.color}15`,
                  border: `1px solid ${lens.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <lens.icon size={20} style={{ color: lens.color }} />
                </div>
                <h3 className="font-heading" style={{
                  fontSize: 'var(--text-h3)',
                  marginBottom: 8,
                  color: 'var(--text-primary)',
                }}>
                  {lens.title}
                </h3>
                <p style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.6,
                }}>
                  {lens.desc}
                </p>
              </div>
            ))}
          </div>

          <p
            className="intro-reveal"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-tertiary)',
              lineHeight: 1.7,
              marginTop: 'var(--space-lg)',
              opacity: 0,
              fontStyle: 'italic',
              borderLeft: '2px solid var(--accent-lavender)',
              paddingLeft: 'var(--space-md)',
            }}
          >
            Each analysis runs through gl.nondet.exec_prompt under GenLayer validator consensus. A custom validator compares leader and validator outputs with exact decision matching and numeric score tolerance. The result is not a decoration, it is a settled on-chain judgment.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .intro-grid {
            grid-template-columns: 1fr !important;
          }
          .lens-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .lens-cards-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
