'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Beam {
  angle: number;
  speed: number;
  hue: number;
  width: number;
  opacity: number;
  offset: number;
}

export function PrismCanvas({
  className = '',
  scrollProgress = 0,
}: {
  className?: string;
  scrollProgress?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visibleRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const w = rect.width;
    const h = rect.height;
    const time = performance.now() * 0.001;
    const scroll = scrollRef.current;

    ctx.clearRect(0, 0, w, h);

    // Scroll-reactive parameters
    const spreadFactor = 0.6 + scroll * 0.8; // beams spread wider as user scrolls
    const intensityFactor = 0.5 + scroll * 0.5; // beams get brighter
    const prismGlow = 0.08 + scroll * 0.15; // prism glows more

    // Draw the prism shape
    const cx = w * 0.5;
    const cy = h * 0.48;
    const size = Math.min(w, h) * 0.22;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.sin(time * 0.3) * 0.03);

    // Prism body with scroll-reactive fill
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.866, size * 0.5);
    ctx.lineTo(-size * 0.866, size * 0.5);
    ctx.closePath();

    const prismGrad = ctx.createLinearGradient(-size, -size, size, size);
    prismGrad.addColorStop(0, `rgba(167, 139, 250, ${0.08 + prismGlow})`);
    prismGrad.addColorStop(0.5, `rgba(244, 114, 182, ${0.05 + prismGlow * 0.6})`);
    prismGrad.addColorStop(1, `rgba(96, 165, 250, ${0.06 + prismGlow * 0.7})`);
    ctx.fillStyle = prismGrad;
    ctx.fill();

    // Prism edge glow - intensifies with scroll
    ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 + scroll * 0.3})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner refraction glow
    const innerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.6);
    innerGrad.addColorStop(0, `rgba(167, 139, 250, ${0.1 + scroll * 0.15})`);
    innerGrad.addColorStop(0.5, `rgba(244, 114, 182, ${0.03 + scroll * 0.08})`);
    innerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = innerGrad;
    ctx.fill();

    ctx.restore();

    // Incoming white beam from left - intensifies
    const beamEntryX = cx - size * 1.2;
    const beamEntryY = cy - size * 0.15;
    const beamOpacity = 0.2 + intensityFactor * 0.2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, beamEntryY);
    ctx.lineTo(beamEntryX, beamEntryY);
    ctx.strokeStyle = `rgba(200, 200, 220, ${beamOpacity})`;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, beamEntryY);
    ctx.lineTo(beamEntryX, beamEntryY);
    ctx.strokeStyle = `rgba(200, 200, 220, ${beamOpacity * 0.3})`;
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();

    // Refracted spectral beams - spread with scroll
    const beams: Beam[] = [
      { angle: -0.22 * spreadFactor, speed: 0.4, hue: 270, width: 2.2, opacity: 0.35, offset: 0 },
      { angle: -0.14 * spreadFactor, speed: 0.5, hue: 290, width: 2.0, opacity: 0.30, offset: 0.5 },
      { angle: -0.06 * spreadFactor, speed: 0.35, hue: 320, width: 2.4, opacity: 0.35, offset: 1.0 },
      { angle: 0.02 * spreadFactor, speed: 0.45, hue: 340, width: 2.0, opacity: 0.28, offset: 1.5 },
      { angle: 0.10 * spreadFactor, speed: 0.38, hue: 15, width: 2.2, opacity: 0.32, offset: 2.0 },
      { angle: 0.18 * spreadFactor, speed: 0.42, hue: 40, width: 1.8, opacity: 0.25, offset: 2.5 },
      { angle: 0.26 * spreadFactor, speed: 0.3, hue: 60, width: 2.0, opacity: 0.22, offset: 3.0 },
    ];

    const exitX = cx + size * 0.5;
    const exitY = cy - size * 0.05;

    beams.forEach((beam) => {
      const wobble = Math.sin(time * beam.speed + beam.offset) * 0.02;
      const angle = beam.angle + wobble;
      const pulseOpacity = beam.opacity * intensityFactor * (0.7 + 0.3 * Math.sin(time * 0.8 + beam.offset));

      const endX = exitX + Math.cos(angle) * w * 0.6;
      const endY = exitY + Math.sin(angle) * w * 0.6;

      // Glow beam
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(exitX, exitY);
      ctx.lineTo(endX, endY);
      const grad = ctx.createLinearGradient(exitX, exitY, endX, endY);
      grad.addColorStop(0, `hsla(${beam.hue}, 80%, 70%, ${pulseOpacity})`);
      grad.addColorStop(0.4, `hsla(${beam.hue}, 80%, 70%, ${pulseOpacity * 0.6})`);
      grad.addColorStop(1, `hsla(${beam.hue}, 80%, 70%, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = beam.width + 3;
      ctx.stroke();

      // Core beam
      ctx.beginPath();
      ctx.moveTo(exitX, exitY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = beam.width;
      ctx.stroke();
      ctx.restore();
    });

    // Floating particles along beams - more particles with scroll
    const particleCount = Math.floor(12 + scroll * 10);
    for (let i = 0; i < particleCount; i++) {
      const t = (time * 0.15 + i * 0.12) % 1;
      const beamIdx = i % beams.length;
      const beam = beams[beamIdx];
      const wobble = Math.sin(time * beam.speed + beam.offset) * 0.02;
      const angle = beam.angle + wobble;

      const px = exitX + Math.cos(angle) * w * 0.6 * t;
      const py = exitY + Math.sin(angle) * w * 0.6 * t;
      const pOpacity = (1 - t) * 0.3 * intensityFactor * (0.5 + 0.5 * Math.sin(time * 2 + i));

      ctx.beginPath();
      ctx.arc(px, py, 1.5 + scroll * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${beam.hue}, 80%, 75%, ${pOpacity})`;
      ctx.fill();
    }

    // Ambient background particles
    for (let i = 0; i < 20; i++) {
      const px = ((Math.sin(time * 0.1 + i * 2.1) + 1) / 2) * w;
      const py = ((Math.cos(time * 0.08 + i * 1.7) + 1) / 2) * h;
      const pOpacity = (0.04 + scroll * 0.04) + 0.03 * Math.sin(time * 0.5 + i * 0.8);

      ctx.beginPath();
      ctx.arc(px, py, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 139, 250, ${pOpacity})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      visibleRef.current = !document.hidden;
      if (visibleRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting && !document.hidden;
        if (visibleRef.current) rafRef.current = requestAnimationFrame(draw);
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) observer.observe(canvasRef.current);

    document.addEventListener('visibilitychange', onVisibility);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  );
}
