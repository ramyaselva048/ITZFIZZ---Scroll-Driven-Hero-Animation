import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers, ArrowUpRight, CheckCircle2, TrendingUp, Monitor, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: string;
  role: string;
  overview: string;
  achievements: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 'digital-commerce',
    title: 'Digital Commerce',
    category: 'High-Performance E-Commerce',
    description:
      'A next-generation digital storefront engineered with headless architecture, sub-second product filtering, and fluid checkout animations.',
    tags: ['React', 'Tailwind CSS', 'Stripe', 'Headless CMS'],
    metrics: '+44% Conversion Boost',
    role: 'Full-Stack Web Engineering & UI/UX',
    overview:
      'Engineered an ultra-fast modern headless commerce storefront featuring instant client-side transitions, predictive search, and smooth checkout animations that elevated conversion by 44%.',
    achievements: [
      'Sub-second page load times with optimistic UI updates',
      'Zero layout shift (CLS: 0.00) during heavy media lazy-loading',
      'Seamless multi-currency cart system with local caching',
    ],
  },
  {
    id: 'smart-dashboard',
    title: 'Smart Dashboard',
    category: 'Enterprise Telemetry & Analytics',
    description:
      'A mission-critical data visualization platform processing thousands of live events with real-time responsive SVG telemetry graphs and dark mode elegance.',
    tags: ['TypeScript', 'SVG Analytics', 'Data Viz', 'Tailwind'],
    metrics: '0.2s Real-Time Sync',
    role: 'Front-End Architecture & Interactive Visualizations',
    overview:
      'Built a high-density, real-time analytics dashboard with custom interactive SVG charts, customizable telemetry widgets, and sub-200ms websocket state synchronization.',
    achievements: [
      'Custom GPU-accelerated SVG sparklines & line charts',
      'Accessible keyboard navigation with ARIA live regions',
      'Modular widget system with local storage persistence',
    ],
  },
  {
    id: 'creative-web-experience',
    title: 'Creative Web Experience',
    category: 'Scroll-Driven Brand Platform',
    description:
      'An immersive 3D-inspired creative portfolio leveraging GSAP ScrollTrigger, spatial layering, and buttery smooth scrub animations at 60fps.',
    tags: ['GSAP 3', 'ScrollTrigger', 'CSS 3D', 'Micro-Interactions'],
    metrics: '60 FPS Smooth Scrub',
    role: 'Creative Development & Motion Choreography',
    overview:
      'Designed and coded an experiential brand portal where narrative storytelling unfolds as the visitor scrolls, driven by synchronized GSAP ScrollTrigger timelines and custom geometric SVG assets.',
    achievements: [
      'Buttery 60fps scroll scrub with zero frame drops',
      'Pure CSS shapes & SVG geometric assets—zero heavy video or paid image bloat',
      'Universal responsiveness across mobile, tablet, and widescreen displays',
    ],
  },
];

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
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
      id="work"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#090b10] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
              <span>Featured Showcase</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Selected Work & Experiences
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            A curation of high-velocity web engineering, interactive interfaces, and scroll-driven experiences delivered with precision.
          </p>
        </div>

        {/* 3 Project Showcase Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="project-card group rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-950/40 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Modern Visual Placeholder (CSS + SVG) */}
              <div className="relative h-64 sm:h-72 w-full bg-[#0a0e18] p-6 flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-grid-pattern opacity-30 group-hover:opacity-40 transition-opacity" />

                {/* Card 1 Placeholder: Digital Commerce */}
                {index === 0 && (
                  <div className="relative w-full max-w-[280px] h-48 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-cyan-500/30 p-4 shadow-xl flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-[10px] font-mono text-cyan-300 uppercase">STOREFRONT v2</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        FAST CHECKOUT
                      </span>
                    </div>

                    {/* Product visual simulation */}
                    <div className="flex items-center gap-4 my-2">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-cyan-300" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Quantum Minimalist</div>
                        <div className="text-[11px] font-mono text-cyan-400 font-bold mt-0.5">$480.00 USD</div>
                        <div className="text-[9px] text-slate-400 mt-1">Instant 0.2s Dispatch</div>
                      </div>
                    </div>

                    {/* Checkout simulation bar */}
                    <div className="w-full h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-between px-3 text-[10px] font-mono text-cyan-200">
                      <span>1-CLICK PURCHASE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                {/* Card 2 Placeholder: Smart Dashboard */}
                {index === 1 && (
                  <div className="relative w-full max-w-[280px] h-48 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-blue-500/30 p-4 shadow-xl flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                        <span className="text-[10px] font-mono text-blue-300 uppercase">TELEMETRY LIVE</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400">99.98% UP</span>
                    </div>

                    {/* SVG Analytics Area Chart */}
                    <div className="relative h-20 w-full flex items-end">
                      <svg viewBox="0 0 240 70" className="w-full h-full text-blue-400" fill="none">
                        <path
                          d="M0 60 Q 40 20, 80 45 T 160 15 T 240 30 L 240 70 L 0 70 Z"
                          fill="url(#chartGrad)"
                        />
                        <path
                          d="M0 60 Q 40 20, 80 45 T 160 15 T 240 30"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Metric row */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] font-mono text-slate-300">
                      <span className="text-slate-400">Throughput:</span>
                      <span className="text-cyan-300 font-bold">14.2k req/s</span>
                    </div>
                  </div>
                )}

                {/* Card 3 Placeholder: Creative Web Experience */}
                {index === 2 && (
                  <div className="relative w-full max-w-[280px] h-48 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-purple-500/30 p-4 shadow-xl flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        <span className="text-[10px] font-mono text-purple-300 uppercase">GSAP SPATIAL 3D</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                        60 FPS SCRUB
                      </span>
                    </div>

                    {/* Spatial geometric wireframe */}
                    <div className="relative w-full h-24 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-24 h-24">
                        <polygon
                          points="50,15 85,35 85,75 50,95 15,75 15,35"
                          stroke="#a855f7"
                          strokeWidth="1.5"
                          fill="rgba(168, 85, 247, 0.15)"
                          strokeDasharray="4 2"
                        />
                        <circle cx="50" cy="55" r="16" stroke="#c084fc" strokeWidth="2" fill="none" />
                        <line x1="50" y1="15" x2="50" y2="55" stroke="#a855f7" strokeWidth="1" />
                        <line x1="85" y1="35" x2="50" y2="55" stroke="#a855f7" strokeWidth="1" />
                        <line x1="15" y1="35" x2="50" y2="55" stroke="#a855f7" strokeWidth="1" />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 border-t border-white/5 pt-2">
                      <span className="text-slate-400">Interaction:</span>
                      <span className="text-purple-300 font-bold">ScrollTrigger.create()</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-cyan-400 font-mono tracking-wider uppercase text-[11px]">
                      {project.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] bg-white/5 px-2 py-0.5 rounded">
                      {project.metrics}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-cyan-400 font-medium group-hover:underline">
                    <span>View Case Study Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
