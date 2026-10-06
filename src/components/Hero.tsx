import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Compass, Sparkles, Layers } from 'lucide-react';
import { Stats } from './Stats.tsx';
import { ScrollVisual } from './ScrollVisual.tsx';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const statsWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simple instant opacity reveal if reduced motion preferred
        gsap.set(
          [
            badgeRef.current,
            headlineRef.current,
            paragraphRef.current,
            ctaGroupRef.current,
            '.stat-card',
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Initial Load Master Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Badge reveal
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      );

      // 2. Main Headline "W E L C O M E   I T Z F I Z Z"
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0 },
        '-=0.4'
      );

      // 3. Supporting Description
      tl.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // 4. CTA Buttons reveal
      tl.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      );

      // 5. Statistics stagger animation
      tl.fromTo(
        '.stat-card',
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // 6. Scroll indicator fade in
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-28 sm:pt-36 pb-20 flex flex-col items-center justify-between overflow-hidden"
    >
      {/* Background radial glow spots & subtle tech grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Header Content (Above the fold) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center z-10">
        {/* Subtle Eyebrow Tag */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs uppercase font-mono tracking-widest text-slate-300">
            Creative Web Development & Digital Experiences
          </span>
        </div>

        {/* REQUIRED MAIN HEADLINE: W E L C O M E   I T Z F I Z Z */}
        <h1
          ref={headlineRef}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.32em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-[1.15] mb-6 drop-shadow-sm select-none"
        >
          WELCOME ITZFIZZ
        </h1>

        {/* Supporting Paragraph */}
        <p
          ref={paragraphRef}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 text-balance"
        >
          ITZFIZZ is a digital web development agency crafting next-generation web platforms, 
          fluid scroll-driven visual architectures, and high-impact digital experiences for modern brands.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto mb-14"
        >
          <button
            onClick={() => scrollToSection('work')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-medium text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-medium text-sm tracking-wider uppercase bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Impact Statistics */}
      <div ref={statsWrapperRef} className="w-full z-10 my-4 sm:my-8">
        <Stats />
      </div>

      {/* Main Central Scroll-Driven Visual */}
      <div className="w-full z-10">
        <ScrollVisual />
      </div>

      {/* Scroll indicator at the bottom */}
      <div
        ref={scrollIndicatorRef}
        className="mt-6 flex flex-col items-center gap-2 z-10 cursor-pointer group"
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-cyan-300 transition-colors">
          Scroll To Explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 group-hover:border-cyan-400/50 p-1 flex justify-center transition-colors">
          <div className="w-1.5 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
