import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, MessageSquare, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  onOpenContact: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#090b10] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="relative rounded-3xl p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-slate-900/90 via-[#0a0f1d] to-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 text-center flex flex-col items-center overflow-hidden"
        >
          {/* Background ambient lighting & grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-6 z-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready To Elevate Your Presence?</span>
          </div>

          {/* REQUIRED EXACT HEADLINE */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-3xl leading-[1.15] z-10">
            Let's Build Something Exceptional
          </h2>

          {/* Supporting text */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-300 mb-10 leading-relaxed z-10 font-normal">
            Whether you need a flagship scroll-driven landing page, a modern high-performance web platform, 
            or bespoke interactive digital experiences, our engineering team is ready to bring your vision to life.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-10">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="mailto:ramyaselva048@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>ramyaselva048@gmail.com</span>
            </a>
          </div>

          {/* Guarantee / trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-mono z-10">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Response within 24 hours
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Complimentary Architecture Review
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Flexible Engagement Models
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
