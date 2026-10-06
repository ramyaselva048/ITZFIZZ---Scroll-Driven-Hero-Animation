import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Terminal, Rocket, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const stepsData = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Strategy & Architecture',
    description:
      'We deconstruct your business objectives, map target user flows, conduct technical audits, and architect a precision delivery roadmap.',
    icon: Search,
    color: 'from-cyan-400 to-blue-500',
    deliverables: ['Technical Architecture', 'User Journey Mapping', 'Performance Baseline'],
  },
  {
    number: '02',
    title: 'Design',
    tagline: 'Interactive Choreography',
    description:
      'We craft tailored design systems, high-fidelity prototypes, fluid motion curves, and bespoke typographic scales aligned with your brand identity.',
    icon: PenTool,
    color: 'from-blue-400 to-indigo-500',
    deliverables: ['Design System Tokens', 'Motion Prototypes', 'Responsive Layouts'],
  },
  {
    number: '03',
    title: 'Develop',
    tagline: 'Clean Code & GSAP Motion',
    description:
      'We build clean, modular React components, orchestrate GSAP scroll timelines, optimize assets, and enforce strict accessibility standards.',
    icon: Terminal,
    color: 'from-indigo-400 to-purple-500',
    deliverables: ['React & TypeScript Code', 'GSAP ScrollTrigger', 'WCAG AA Accessibility'],
  },
  {
    number: '04',
    title: 'Launch',
    tagline: 'Optimization & Global Scale',
    description:
      'We execute comprehensive Lighthouse audits, edge-server distribution, performance testing, and seamless deployment with zero downtime.',
    icon: Rocket,
    color: 'from-cyan-400 to-emerald-400',
    deliverables: ['Lighthouse 100 Tuning', 'Edge CDN Deployment', 'Live Telemetry'],
  },
];

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-step-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#090b10] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span>Methodology</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Our 4-Step Engineering Process
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A battle-tested methodology that transforms high-concept ideas into resilient, production-ready web experiences.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div
          ref={stepsWrapperRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {stepsData.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="process-step-card group relative p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${step.color}`}
                    >
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
                    {step.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Core Output:
                  </div>
                  {step.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
