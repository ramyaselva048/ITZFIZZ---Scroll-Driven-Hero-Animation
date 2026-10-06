import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Zap, Activity, Code2, ShieldCheck, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ScrollVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<SVGSVGElement>(null);
  const innerRingRef = useRef<SVGSVGElement>(null);
  const centerCoreRef = useRef<HTMLDivElement>(null);
  const satelliteTopRightRef = useRef<HTMLDivElement>(null);
  const satelliteBottomLeftRef = useRef<HTMLDivElement>(null);
  const satelliteTopLeftRef = useRef<HTMLDivElement>(null);
  const satelliteBottomRightRef = useRef<HTMLDivElement>(null);
  const floatingLinesRef = useRef<SVGSVGElement>(null);
  const telemetryBadgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Minimal subtle scroll movement for accessibility
        gsap.to(visualWrapperRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        return;
      }

      // Master scroll-driven timeline linked to container scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1.2, // Smooth interpolation
          invalidateOnRefresh: true,
        },
      });

      // 1. Main visual container 3D transform & vertical travel
      tl.to(
        visualWrapperRef.current,
        {
          y: -120,
          scale: 1.08,
          rotationZ: 8,
          rotationX: 12,
          rotationY: -10,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
        0
      );

      // 2. Ambient background glow reacts to scroll
      tl.to(
        bgGlowRef.current,
        {
          scale: 1.35,
          opacity: 0.85,
          filter: 'hue-rotate(35deg)',
          ease: 'none',
        },
        0
      );

      // 3. Concentric outer and inner rings rotate in opposite directions
      tl.to(
        outerRingRef.current,
        {
          rotation: 160,
          scale: 1.1,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
        0
      );

      tl.to(
        innerRingRef.current,
        {
          rotation: -140,
          scale: 0.95,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
        0
      );

      // 4. Central 3D Core Card translates and rotates slightly independently
      tl.to(
        centerCoreRef.current,
        {
          y: -60,
          rotationZ: -6,
          rotationX: 20,
          rotationY: 15,
          boxShadow: '0 30px 60px -12px rgba(6, 182, 212, 0.45)',
          ease: 'none',
        },
        0
      );

      // 5. Satellite Elements move at different speeds (Parallax Depth)
      // Top-Right Telemetry Card: moves up and right
      tl.to(
        satelliteTopRightRef.current,
        {
          x: 70,
          y: -140,
          rotation: 14,
          scale: 1.05,
          ease: 'none',
        },
        0
      );

      // Bottom-Left Code Architecture Card: moves down and left
      tl.to(
        satelliteBottomLeftRef.current,
        {
          x: -70,
          y: 90,
          rotation: -12,
          opacity: 0.9,
          ease: 'none',
        },
        0
      );

      // Top-Left Geometric Prism: drifts outwards with spin
      tl.to(
        satelliteTopLeftRef.current,
        {
          x: -85,
          y: -80,
          rotation: 75,
          scale: 1.15,
          ease: 'none',
        },
        0
      );

      // Bottom-Right Metric Compass: translates and counter-rotates
      tl.to(
        satelliteBottomRightRef.current,
        {
          x: 80,
          y: 80,
          rotation: -35,
          ease: 'none',
        },
        0
      );

      // Floating lines SVG stretch & parallax
      tl.to(
        floatingLinesRef.current,
        {
          rotation: 45,
          scale: 1.25,
          opacity: 0.65,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
        0
      );

      // Telemetry badge subtle fade/translate
      tl.to(
        telemetryBadgeRef.current,
        {
          y: -30,
          opacity: 0.7,
          ease: 'none',
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 my-6 sm:my-10 flex items-center justify-center overflow-visible select-none"
      style={{ perspective: '1200px' }}
      aria-label="Interactive scroll-driven futuristic visual"
    >
      {/* Background ambient lighting */}
      <div
        ref={bgGlowRef}
        className="absolute w-[340px] sm:w-[540px] lg:w-[680px] h-[340px] sm:h-[540px] lg:h-[680px] rounded-full bg-gradient-to-tr from-cyan-600/25 via-blue-600/20 to-purple-600/25 blur-3xl pointer-events-none -z-10 transition-all duration-700 gpu-accelerated"
      />

      {/* Main 3D Stage Wrapper */}
      <div
        ref={visualWrapperRef}
        className="relative w-full max-w-[620px] h-[440px] sm:h-[520px] lg:h-[560px] flex items-center justify-center mx-auto gpu-accelerated"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(8deg) rotateY(-6deg) rotateZ(-2deg)',
        }}
      >
        {/* Layer 1: Concentric HUD Rings (SVG) */}
        <svg
          ref={outerRingRef}
          className="absolute w-[360px] sm:w-[480px] lg:w-[540px] h-[360px] sm:h-[480px] lg:h-[540px] pointer-events-none text-cyan-500/25 gpu-accelerated"
          viewBox="0 0 500 500"
          fill="none"
        >
          {/* Dashed Outer Orbit */}
          <circle
            cx="250"
            cy="250"
            r="230"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          {/* Outer Segment Marks */}
          <circle
            cx="250"
            cy="250"
            r="215"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="1 18"
          />
          {/* Degree Ticks */}
          <path d="M250 10 L250 25 M250 490 L250 475 M10 250 L25 250 M490 250 L475 250" stroke="#38bdf8" strokeWidth="2" />
          <text x="255" y="35" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="2">00° NORTH</text>
          <text x="255" y="470" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="2">180° SOUTH</text>
          <text x="35" y="255" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="2">270°</text>
          <text x="435" y="255" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="2">090°</text>
        </svg>

        {/* Inner Counter-Rotating Hexagon Ring */}
        <svg
          ref={innerRingRef}
          className="absolute w-[280px] sm:w-[380px] lg:w-[420px] h-[280px] sm:h-[380px] lg:h-[420px] pointer-events-none text-blue-500/20 gpu-accelerated"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="170"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="16 12"
          />
          <polygon
            points="200,40 338,120 338,280 200,360 62,280 62,120"
            stroke="#818cf8"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            fill="none"
            opacity="0.3"
          />
          <circle cx="200" cy="40" r="3" fill="#06b6d4" />
          <circle cx="338" cy="120" r="3" fill="#06b6d4" />
          <circle cx="338" cy="280" r="3" fill="#06b6d4" />
          <circle cx="200" cy="360" r="3" fill="#06b6d4" />
          <circle cx="62" cy="280" r="3" fill="#06b6d4" />
          <circle cx="62" cy="120" r="3" fill="#06b6d4" />
        </svg>

        {/* Floating Circuit Lines SVG */}
        <svg
          ref={floatingLinesRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 gpu-accelerated"
          viewBox="0 0 600 500"
          fill="none"
        >
          <path
            d="M120 180 L220 180 L280 240 L380 240"
            stroke="url(#lineGradient1)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M480 320 L400 320 L350 270 L250 270"
            stroke="url(#lineGradient2)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <defs>
            <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layer 2: Main Central 3D Frosted Core Slab */}
        <div
          ref={centerCoreRef}
          className="relative z-20 w-[240px] sm:w-[310px] lg:w-[340px] p-5 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 gpu-accelerated overflow-hidden group cursor-default"
          style={{
            transform: 'translateZ(40px)',
          }}
        >
          {/* Subtle gradient light sweep across card */}
          <div className="absolute -inset-x-20 -top-20 h-40 bg-gradient-to-b from-cyan-400/15 via-transparent to-transparent rotate-12 pointer-events-none" />

          {/* Core Header Readout */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300">
                ITZFIZZ // CORE v4.8
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              60 FPS
            </span>
          </div>

          {/* Central Hologram Monogram */}
          <div className="my-5 py-4 flex flex-col items-center justify-center relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/30 flex items-center justify-center relative">
              <div className="w-full h-full bg-[#0a0e17] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="mt-1 text-[9px] font-mono uppercase tracking-widest text-slate-400">
                  Engine
                </span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <h4 className="font-display font-bold text-white text-base sm:text-lg tracking-wide">
                Interactive Nexus
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Scroll-Synchronized Matrix
              </p>
            </div>
          </div>

          {/* Core Footer Telemetry Bar */}
          <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono">SYS: ACTIVE</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-mono">100% HEALTH</span>
            </div>
          </div>
        </div>

        {/* Layer 3: Satellite Cards (Moving Independently at Different Speeds) */}

        {/* Satellite 1: Top-Right (Speed & Telemetry) */}
        <div
          ref={satelliteTopRightRef}
          className="absolute -top-6 -right-2 sm:-right-8 lg:-right-12 z-30 p-3 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-cyan-900/20 gpu-accelerated max-w-[170px] sm:max-w-[200px]"
          style={{ transform: 'translateZ(70px)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono font-semibold text-slate-300 uppercase">
                Latency
              </span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              0.24s
            </span>
          </div>
          <div className="text-xs font-semibold text-white">Ultra-Responsive</div>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-[10px] text-slate-400">Lighthouse:</span>
            <span className="text-[10px] font-bold text-cyan-300 font-mono">100/100</span>
          </div>
        </div>

        {/* Satellite 2: Bottom-Left (Code Architecture & GSAP) */}
        <div
          ref={satelliteBottomLeftRef}
          className="absolute -bottom-8 -left-2 sm:-left-8 lg:-left-12 z-30 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-blue-900/20 gpu-accelerated max-w-[190px] sm:max-w-[230px]"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono text-slate-300 font-semibold uppercase">
              Motion Engine
            </span>
          </div>
          <div className="p-2 rounded-lg bg-black/60 font-mono text-[10px] text-cyan-300 border border-white/5 overflow-hidden">
            <div className="text-slate-500">// GSAP ScrollTrigger</div>
            <div>&lt;ITZFIZZ.Scrub</div>
            <div className="pl-2 text-indigo-300">scrub=&#123;1.2&#125;</div>
            <div>/&gt;</div>
          </div>
        </div>

        {/* Satellite 3: Top-Left (Faceted Abstract 3D Geometric Prism) */}
        <div
          ref={satelliteTopLeftRef}
          className="absolute top-2 -left-4 sm:left-4 z-20 w-14 h-14 sm:w-18 sm:h-18 gpu-accelerated pointer-events-none"
          style={{ transform: 'translateZ(50px)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(6,182,212,0.4)]">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="url(#prismGrad1)" opacity="0.9" />
            <polygon points="50,10 90,30 50,50 10,30" fill="url(#prismGrad2)" opacity="0.9" />
            <polygon points="10,30 50,50 50,90 10,70" fill="url(#prismGrad3)" opacity="0.9" />
            <polygon points="90,30 50,50 50,90 90,70" fill="url(#prismGrad1)" opacity="0.7" />
            <defs>
              <linearGradient id="prismGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="prismGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
              <linearGradient id="prismGrad3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Satellite 4: Bottom-Right (Compass / Client Metric Satellite) */}
        <div
          ref={satelliteBottomRightRef}
          className="absolute bottom-2 right-0 sm:right-6 z-20 p-2.5 sm:p-3 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-lg gpu-accelerated flex items-center gap-2.5"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Reliability
            </div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <span>99.98%</span>
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Coordinate HUD Telemetry Watermark */}
        <div
          ref={telemetryBadgeRef}
          className="absolute -bottom-14 inset-x-0 mx-auto w-fit px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/5 flex items-center gap-3 text-[10px] font-mono text-slate-400 pointer-events-none"
        >
          <span className="flex items-center gap-1 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            SCROLL ENGINE
          </span>
          <span>·</span>
          <span>SCRUB LINKED</span>
          <span>·</span>
          <span className="text-slate-300">TRANSFORM 3D</span>
        </div>
      </div>
    </div>
  );
};
