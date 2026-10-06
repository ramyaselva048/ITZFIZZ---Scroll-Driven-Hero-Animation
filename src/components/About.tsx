import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ShieldCheck, Flame, Compass, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onOpenContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(visualRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.9,
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      title: 'Performance-First Engineering',
      desc: 'Sub-second paint times, 60fps transform animations, and zero layout shifts guaranteed.',
    },
    {
      title: 'Human-Centered Interaction',
      desc: 'Micro-interactions designed to guide, delight, and retain high-value users effortlessly.',
    },
    {
      title: 'Future-Proof Architecture',
      desc: 'Modular React ecosystems, strict TypeScript types, and headless scalability for modern scale.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#090b10] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div ref={contentRef} className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-6">
              <Compass className="w-3.5 h-3.5" />
              <span>Who We Are</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Pioneering the Future of <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Interactive Web Experiences
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-normal">
              ITZFIZZ was founded on a singular conviction: the modern web should feel alive. 
              We merge architectural software development with creative motion choreography to engineer web platforms 
              that leave unforgettable impressions while driving measurable business results.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Whether architecting a scroll-driven flagship landing page, building real-time interactive dashboards, 
              or scaling enterprise web systems, our team handles every pixel and byte with obsession for detail.
            </p>

            {/* Core Pillars */}
            <div className="space-y-4 mb-10">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors group cursor-pointer"
            >
              <span>Learn how we can partner with your team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Visual Architecture Blueprint Card */}
          <div ref={visualRef} className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
              {/* Background blueprint grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">Agency Dossier</div>
                  <div className="text-sm font-bold text-white mt-0.5">ITZFIZZ Technical Core</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </div>
              </div>

              {/* Code Snippet Blueprint */}
              <div className="space-y-4 font-mono text-xs relative">
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 text-slate-300">
                  <span className="text-slate-500">// Stack Manifesto</span>
                  <div className="text-cyan-300 mt-1">const ITZFIZZ_STANDARDS = &#123;</div>
                  <div className="pl-4 text-slate-300">frameRate: <span className="text-amber-300">60</span>,</div>
                  <div className="pl-4 text-slate-300">scrollTrigger: <span className="text-emerald-300">'scrub-synchronized'</span>,</div>
                  <div className="pl-4 text-slate-300">responsiveness: <span className="text-indigo-300">['mobile', 'tablet', 'desktop']</span>,</div>
                  <div className="pl-4 text-slate-300">accessibility: <span className="text-emerald-300">'WCAG-AA-compliant'</span>,</div>
                  <div className="text-cyan-300">&#125;;</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Response Time</div>
                    <div className="text-lg font-bold font-display text-white mt-0.5">&lt; 240ms</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Motion Precision</div>
                    <div className="text-lg font-bold font-display text-cyan-400 mt-0.5">Pixel-Exact</div>
                  </div>
                </div>
              </div>

              {/* Subtle badge */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>ITZFIZZ Studio v2.4</span>
                <span className="font-mono text-cyan-400 text-[11px]">VERIFIED CREATIVE AGENCY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
