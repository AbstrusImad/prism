'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
  sublabel?: string;
}

const SECTIONS: Section[] = [
  { id: 'introduction', label: 'Introduction', sublabel: 'What is Prism' },
  { id: 'dilemma', label: 'The Dilemma', sublabel: 'Submit your question' },
  { id: 'lens-utilitarian', label: 'Utilitarian Lens', sublabel: 'Greatest good' },
  { id: 'lens-deontological', label: 'Deontological Lens', sublabel: 'Duty and rules' },
  { id: 'lens-virtue', label: 'Virtue Ethics Lens', sublabel: 'Character matters' },
  { id: 'synthesis', label: 'Synthesis', sublabel: 'Convergence point' },
  { id: 'archive', label: 'Archive', sublabel: 'Past analyses' },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState('introduction');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="hidden lg:block"
      style={{
        position: 'sticky',
        top: 100,
        width: 200,
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
      aria-label="Table of contents"
    >
      <div className="font-label" style={{
        color: 'var(--text-muted)',
        marginBottom: 16,
        paddingLeft: 16,
      }}>
        Contents
      </div>
      <ol className="flex flex-col gap-1">
        {SECTIONS.map((section, i) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className="flex items-center gap-3 w-full text-left"
                style={{
                  padding: '8px 16px',
                  borderRadius: 12,
                  background: isActive ? 'rgba(167, 139, 250, 0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--ease-out)',
                }}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Number indicator */}
                <span style={{
                  width: 20,
                  height: 20,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontFamily: 'Fira Code, monospace',
                  fontWeight: 600,
                  background: isActive ? 'var(--gradient-accent)' : 'var(--bg-sunken)',
                  color: isActive ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.3s var(--ease-out)',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <div>
                  <div style={{
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    transition: 'color 0.3s',
                    lineHeight: 1.3,
                  }}>
                    {section.label}
                  </div>
                  {section.sublabel && (
                    <div style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.2,
                    }}>
                      {section.sublabel}
                    </div>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Connector line */}
      <div style={{
        position: 'absolute',
        left: 25,
        top: 50,
        bottom: 20,
        width: 1,
        background: 'var(--border-subtle)',
        zIndex: -1,
      }} />
    </nav>
  );
}
