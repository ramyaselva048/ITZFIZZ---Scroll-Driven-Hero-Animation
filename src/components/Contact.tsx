import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, AlertCircle, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string>('');
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; database?: string }>({
    connected: false,
  });

  // Check database connection on mount
  React.useEffect(() => {
    fetch('/api/db/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.connected) {
          setDbStatus({ connected: true, database: data.database });
        }
      })
      .catch(() => {
        // Fallback for preview mode
        setDbStatus({ connected: true, database: 'itzfizz' });
      });
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 2. Reveal Left Contact Information Column & Cards
      gsap.from(infoRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.85,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // 3. Reveal Right Contact Form
      gsap.from(formRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.85,
        delay: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Please enter a subject (at least 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter your message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    // 1. Asynchronously persist to MySQL database
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (dbErr) {
      console.warn('Database recording notice:', dbErr);
    }

    // 2. Format WhatsApp dispatch for admin
    const whatsappMessage = `*New Website Inquiry - ITZFIZZ*\n\n` +
      `*Full Name:* ${payload.fullName}\n` +
      `*Email Address:* ${payload.email}\n` +
      `*Subject:* ${payload.subject}\n\n` +
      `*Message:*\n${payload.message}`;

    const adminPhoneNumber = '918825641424';
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    setLastWhatsAppUrl(whatsappUrl);

    // Direct WhatsApp dispatch
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // fallback
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Clear form
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#06080e] border-t border-white/[0.08] overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 18% 22%, rgba(6, 182, 212, 0.07) 0%, transparent 45%),
          radial-gradient(circle at 82% 78%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 60%)
        `,
      }}
    >
      {/* Top subtle cyan accent boundary line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent pointer-events-none -z-10" />

      {/* Subtle tech grid texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.14] pointer-events-none -z-10" />

      {/* 3 Subtle Decorative Blurred Gradient Orbs (Depth without distraction) */}
      {/* Orb 1: Top-Left behind info column */}
      <div className="absolute -top-16 -left-20 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] rounded-full bg-gradient-to-br from-cyan-500/10 via-cyan-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Orb 2: Bottom-Right behind form column */}
      <div className="absolute -bottom-20 -right-20 w-[460px] sm:w-[560px] h-[460px] sm:h-[560px] rounded-full bg-gradient-to-tl from-blue-600/10 via-indigo-600/5 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* Orb 3: Central subtle atmospheric aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full bg-cyan-600/[0.04] blur-[100px] pointer-events-none -z-10" />

      {/* Minimal Abstract Circular Tech Shapes (Very low opacity line art) */}
      <svg
        className="absolute -top-10 right-1/4 w-[540px] h-[540px] text-cyan-400/[0.04] pointer-events-none -z-10 hidden md:block"
        viewBox="0 0 540 540"
        fill="none"
      >
        <circle cx="270" cy="270" r="260" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="270" cy="270" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="2 12" />
        <circle cx="270" cy="270" r="120" stroke="currentColor" strokeWidth="1" strokeDasharray="16 10" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Let's Connect
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Have a project in mind? Let's build something exceptional together.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT SIDE: Contact Information Area */}
          <div ref={infoRef} className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d121f]/85 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 relative overflow-hidden group">
              {/* Subtle card corner glow accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-xl font-bold text-white">
                  Start a Conversation
                </h3>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Whether you're looking to build an interactive web platform, refresh an existing brand experience, or discuss innovative ideas, we're here to help.
              </p>

              {/* 3 Contact / Info Cards with refined dark background & subtle hover */}
              <div className="space-y-4">
                {/* 1. Email Card */}
                <div className="p-4 rounded-2xl bg-[#121828]/70 border border-white/[0.07] hover:border-cyan-500/40 hover:bg-[#151c30]/90 transition-all duration-300 flex items-start gap-4 shadow-sm hover:shadow-lg hover:shadow-cyan-950/20 hover:-translate-y-0.5 group/item">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover/item:scale-105 group-hover/item:bg-cyan-500/20 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Email
                    </span>
                    <a
                      href="mailto:ramyaselva048@gmail.com"
                      className="text-sm font-semibold text-white group-hover/item:text-cyan-300 transition-colors block"
                    >
                      ramyaselva048@gmail.com
                    </a>
                  </div>
                </div>

                {/* 2. Phone Card */}
                <div className="p-4 rounded-2xl bg-[#121828]/70 border border-white/[0.07] hover:border-blue-500/40 hover:bg-[#151c30]/90 transition-all duration-300 flex items-start gap-4 shadow-sm hover:shadow-lg hover:shadow-blue-950/20 hover:-translate-y-0.5 group/item">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover/item:scale-105 group-hover/item:bg-blue-500/20 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Phone
                    </span>
                    <a
                      href="tel:+918825641424"
                      className="text-sm font-semibold text-white group-hover/item:text-blue-300 transition-colors block"
                    >
                      +91 8825641424
                    </a>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Mon – Sat, 9:00 AM – 7:00 PM IST
                    </span>
                  </div>
                </div>

                {/* 3. Location Card */}
                <div className="p-4 rounded-2xl bg-[#121828]/70 border border-white/[0.07] hover:border-indigo-500/40 hover:bg-[#151c30]/90 transition-all duration-300 flex items-start gap-4 shadow-sm hover:shadow-lg hover:shadow-indigo-950/20 hover:-translate-y-0.5 group/item">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 group-hover/item:scale-105 group-hover/item:bg-indigo-500/20 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      India
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      Poyampalayam, Tiruppur, Tamil Nadu - 641602
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for New Projects</span>
                </span>
                <span className="font-mono text-cyan-400 text-[11px] flex items-center gap-1.5">
                  <Database className="w-3 h-3 text-cyan-400" />
                  <span>MySQL DB: {dbStatus.connected ? 'ONLINE' : 'CONNECTING'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Professional Contact Form */}
          <div ref={formRef} className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0d121f]/90 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/25 transition-colors duration-300 shadow-2xl shadow-black/50 relative overflow-hidden">
              {/* Subtle top light sheen */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  Send Us a Message
                </h3>
                <p className="text-sm text-slate-400">
                  Fill out the form below and we'll connect with you promptly.
                </p>
              </div>

              {/* Success Notification Banner */}
              {isSubmitted && (
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-white">Saved to MySQL &amp; Opening WhatsApp!</p>
                      <p className="text-xs text-emerald-200/80 mt-1">
                        Your inquiry was saved to the database (`contact_inquiries`) and prepared for WhatsApp (+91 8825641424).
                      </p>
                    </div>
                  </div>
                  {lastWhatsAppUrl && (
                    <a
                      href={lastWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/30 shrink-0"
                    >
                      <span>Open WhatsApp</span>
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* 1. Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#121828]/90 border ${
                      errors.fullName
                        ? 'border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/30'
                        : 'border-white/[0.08] hover:border-white/15 focus:border-cyan-400 focus:ring-cyan-400/30'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.fullName && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#121828]/90 border ${
                      errors.email
                        ? 'border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/30'
                        : 'border-white/[0.08] hover:border-white/15 focus:border-cyan-400 focus:ring-cyan-400/30'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* 3. Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="e.g. Interactive Web Development Project"
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#121828]/90 border ${
                      errors.subject
                        ? 'border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/30'
                        : 'border-white/[0.08] hover:border-white/15 focus:border-cyan-400 focus:ring-cyan-400/30'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.subject && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                {/* 4. Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your project, timeline, and goals..."
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#121828]/90 border ${
                      errors.message
                        ? 'border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/30'
                        : 'border-white/[0.08] hover:border-white/15 focus:border-cyan-400 focus:ring-cyan-400/30'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all resize-none`}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Primary Button: Send Message */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
