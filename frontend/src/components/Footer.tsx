import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: 'var(--space-xl) 0',
      marginTop: 'var(--space-xl)',
    }}>
      <div className="mx-auto" style={{
        maxWidth: 1200,
        padding: '0 clamp(20px, 5vw, 40px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 'var(--space-xl)',
        }} className="footer-grid">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'var(--gradient-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 12H2L8 2Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="font-display" style={{
                fontSize: '1.125rem',
                color: 'var(--text-primary)',
              }}>
                Prism
              </span>
            </div>
            <p style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-tertiary)',
              lineHeight: 1.6,
              maxWidth: '36ch',
            }}>
              Ethical dilemmas refracted through three philosophical lenses under GenLayer validator consensus. Built on Bradbury Testnet.
            </p>
          </div>

          {/* Resources */}
          <div>
            <div className="font-label" style={{
              color: 'var(--text-muted)',
              marginBottom: 12,
            }}>
              Resources
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'GenLayer Docs', href: 'https://docs.genlayer.com' },
                { label: 'Bradbury Explorer', href: 'https://explorer-bradbury.genlayer.com' },
                { label: 'Testnet Faucet', href: 'https://testnet-faucet.genlayer.foundation' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--text-tertiary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-lavender)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                  >
                    {link.label}
                    <ExternalLink size={10} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <div className="font-label" style={{
              color: 'var(--text-muted)',
              marginBottom: 12,
            }}>
              Technology
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Next.js 14',
                'genlayer-js',
                'Framer Motion',
                'GSAP ScrollTrigger',
              ].map((tech) => (
                <li key={tech} style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--text-tertiary)',
                }}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <div className="font-label" style={{
              color: 'var(--text-muted)',
              marginBottom: 12,
            }}>
              Status
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="flex items-center gap-2">
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--success)',
                  boxShadow: '0 0 6px var(--success)',
                }} />
                <span style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--text-tertiary)',
                }}>
                  Bradbury Testnet
                </span>
              </div>
              <span style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-tertiary)',
              }}>
                Frontend-only mode
              </span>
              <span style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-muted)',
              }}>
                Contract: pending deployment
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 'var(--space-xl)',
          paddingTop: 'var(--space-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
        }}>
          <span style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-muted)',
          }}>
            Built on GenLayer Bradbury Testnet
          </span>
          <span style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-muted)',
          }}>
            No deposits required. Network fees only.
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
