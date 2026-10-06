import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Dribbble, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Dribbble', icon: Dribbble, href: 'https://dribbble.com' },
  ];

  return (
    <footer className="relative bg-[#06080d] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#090b10] rounded-[11px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-sm">
                    F
                  </span>
                </div>
              </div>
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                ITZFIZZ
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6 font-normal">
              High-performance digital web experiences, interactive scroll choreography, and next-generation design engineering.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ITZFIZZ on ${social.name}`}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/30 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-display text-xs font-mono uppercase tracking-widest text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-display text-xs font-mono uppercase tracking-widest text-slate-200 mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>E-Commerce Solutions</li>
              <li>GSAP Motion &amp; Scrub</li>
              <li>Design Systems</li>
            </ul>
          </div>

          {/* Contact Information Placeholder */}
          <div>
            <h4 className="font-display text-xs font-mono uppercase tracking-widest text-slate-200 mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Poyampalayam, Tiruppur, Tamil Nadu - 641602</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:ramyaselva048@gmail.com"
                  className="hover:text-cyan-300 transition-colors"
                >
                  ramyaselva048@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Accepting Q3/Q4 Projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 ITZFIZZ Digital Experiences. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Web Development Internship Project
            </span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
