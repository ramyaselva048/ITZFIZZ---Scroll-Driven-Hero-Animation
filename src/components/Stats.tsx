import React from 'react';
import { Award, Zap, Users, CheckCircle2 } from 'lucide-react';

export interface StatItem {
  id: string;
  value: string;
  label: string;
  subtext: string;
  icon: React.ElementType;
  accent: string;
}

export const statsData: StatItem[] = [
  {
    id: 'stat-satisfaction',
    value: '95%',
    label: 'Client Satisfaction',
    subtext: 'Net promoter rating across enterprise partners',
    icon: Award,
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'stat-projects',
    value: '80+',
    label: 'Projects Delivered',
    subtext: 'Bespoke web platforms & interactive systems',
    icon: CheckCircle2,
    accent: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'stat-performance',
    value: '90%',
    label: 'Performance',
    subtext: 'Average speed index boost after launch',
    icon: Zap,
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'stat-clients',
    value: '70+',
    label: 'Happy Clients',
    subtext: 'Global tech startups & scaling companies',
    icon: Users,
    accent: 'from-purple-400 to-pink-500',
  },
];

export const Stats: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="stat-card group relative p-4 sm:p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                  {stat.id.replace('stat-', '')}
                </span>
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Number and Label */}
              <div>
                <div className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br ${stat.accent} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 hidden sm:block">
                  {stat.subtext}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                <span className="text-[11px] text-slate-500 font-medium">Verified Metric</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
