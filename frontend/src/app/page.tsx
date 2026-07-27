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
import { SkeletonList } from '@/components/Skeleton';
import { Eye, Scale, Cpu } from 'lucide-react';
import Lenis from 'lenis';

export default function Home() {
  const { analyses, dilemmas, loading } = useContractData();
  const mainRef = useRef<HTMLDivElement>(null);

  // Smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
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
              <div style={{ padding: 'var(--space-3xl) 0' }}>
                <SkeletonList count={4} />
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
