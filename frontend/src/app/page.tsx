'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { PrismHero } from '@/components/PrismHero';
import { TableOfContents } from '@/components/TableOfContents';
import { IntroductionSection } from '@/components/IntroductionSection';
import { DilemmaSection } from '@/components/DilemmaSection';
import { LensSection } from '@/components/LensSection';
import { SynthesisPanel } from '@/components/SynthesisPanel';
import { ArchiveSection } from '@/components/ArchiveSection';
import { Footer } from '@/components/Footer';
import { ToastProvider } from '@/components/ToastProvider';
import { useContractData } from '@/hooks/useContractData';
import { Eye, Scale, Cpu } from 'lucide-react';

export default function Home() {
  const { analyses, loading } = useContractData();
  const mainRef = useRef<HTMLDivElement>(null);

  // Smooth scroll with Lenis - wrapped in try/catch to prevent hydration break
  useEffect(() => {
    let lenisInstance: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    import('lenis').then((mod) => {
      try {
        const LenisClass = mod.default || mod;
        lenisInstance = new LenisClass({
          lerp: 0.08,
          smoothWheel: true,
        });

        function raf(time: number) {
          if (lenisInstance) lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis not available, fall back to native scroll
      }
    }).catch(() => {
      // Dynamic import failed, native scroll is fine
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  const featuredAnalysis = analyses[0];

  return (
    <ToastProvider>
      <Header />

      {/* Scroll progress line (overdrive signature) */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ height: 2 }}>
        <div
          className="scroll-progress-line"
          style={{
            height: '100%',
            background: 'var(--gradient-accent)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      <main ref={mainRef}>
        <PrismHero />

        {/* Document body with TOC sidebar */}
        <div className="mx-auto" style={{
          maxWidth: 1200,
          padding: '0 clamp(20px, 5vw, 40px)',
          display: 'flex',
          gap: 'var(--space-xl)',
          alignItems: 'flex-start',
        }}>
          <TableOfContents />

          {/* Main document column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {loading ? (
              <div className="loading-fade-in" style={{ padding: 'var(--space-3xl) 0' }}>
                <div className="neu-raised" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                  <div className="skeleton-pulse" style={{ width: '60%', height: 20, borderRadius: 8, marginBottom: 12 }} />
                  <div className="skeleton-pulse" style={{ width: '100%', height: 14, borderRadius: 6, marginBottom: 8 }} />
                  <div className="skeleton-pulse" style={{ width: '80%', height: 14, borderRadius: 6 }} />
                </div>
              </div>
            ) : (
              <>
                <div className="scroll-reveal">
                  <IntroductionSection />
                </div>

                <div className="scroll-reveal">
                  <DilemmaSection />
                </div>

                {featuredAnalysis && (
                  <>
                    <div className="scroll-reveal">
                      <LensSection
                        id="lens-utilitarian"
                        sectionNumber="Section III"
                        verdict={featuredAnalysis.verdicts[0]}
                        lensColor="#a78bfa"
                        lensIcon={Eye}
                      />
                    </div>
                    <div className="scroll-reveal">
                      <LensSection
                        id="lens-deontological"
                        sectionNumber="Section IV"
                        verdict={featuredAnalysis.verdicts[1]}
                        lensColor="#f472b6"
                        lensIcon={Scale}
                      />
                    </div>
                    <div className="scroll-reveal">
                      <LensSection
                        id="lens-virtue"
                        sectionNumber="Section V"
                        verdict={featuredAnalysis.verdicts[2]}
                        lensColor="#60a5fa"
                        lensIcon={Cpu}
                      />
                    </div>

                    <div className="scroll-reveal">
                      <SynthesisPanel analysis={featuredAnalysis} />
                    </div>
                  </>
                )}

                <div className="scroll-reveal">
                  <ArchiveSection analyses={analyses} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </ToastProvider>
  );
}
