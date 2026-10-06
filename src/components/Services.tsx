import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, ShoppingBag, Layers, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const servicesData = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description:
      'High-performance React & Vite applications, interactive GSAP scroll choreography, semantic HTML5, and resilient component architecture engineered for lightning speed.',
    icon: Code,
    gradient: 'from-cyan-500 to-blue-500',
    tags: ['React', 'TypeScript', 'GSAP Motion', 'Tailwind CSS'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description:
      'Systematic design languages, conversion-tested user flows, ergonomic layouts, and micro-interactions that elevate brand perception from the very first frame.',
    icon: Palette,
    gradient: 'from-purple-500 to-indigo-500',
    tags: ['Design Systems', 'Interactive Prototypes', 'Wireframing', 'Accessibility'],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description:
      'Modern headless e-commerce architectures, frictionless checkout workflows, sub-second product catalog transitions, and custom cart integrations.',
    icon: ShoppingBag,
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['Headless Stores', 'Stripe Systems', 'Speed Optimization', 'Analytics'],
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    description:
      'End-to-end API orchestration, cloud deployment pipelines, headless CMS integrations, and telemetry monitoring for robust, scalable digital platforms.',
    icon: Layers,
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['Cloud Scaling', 'Rest & GraphQL', 'Headless CMS', 'SEO Audits'],
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
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
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#090b10] border-t border-white/5 overflow-hidden"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span>Core Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Specialized Services for Modern Demands
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            We deliver end-to-end digital solutions from foundational concept and interactive design systems to production-grade deployment.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService && onSelectService(service.title)}
                className="service-card group relative p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between cursor-pointer"
              >
                {/* Hover gradient glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-500/30 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 transition-all duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-3 flex items-center justify-between">
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-400" />
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
