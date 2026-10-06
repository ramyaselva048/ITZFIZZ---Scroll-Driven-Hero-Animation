import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar.tsx';

gsap.registerPlugin(ScrollTrigger);
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Services } from './components/Services.tsx';
import { Projects, ProjectItem } from './components/Projects.tsx';
import { Process } from './components/Process.tsx';
import { Contact } from './components/Contact.tsx';
import { CTA } from './components/CTA.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Web Development');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    // Ensure all ScrollTrigger elements recalculate properly after fonts/layout settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenContactWithService = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsContactOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090b10] text-[#f1f5f9] selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar onOpenContact={() => handleOpenContactWithService('Web Development')} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Scroll-Driven Visual & Impact Stats */}
        <Hero onOpenContact={() => handleOpenContactWithService('Web Development')} />

        {/* 2. About Section */}
        <About onOpenContact={() => handleOpenContactWithService('Web Development')} />

        {/* 3. Services Section */}
        <Services onSelectService={(service) => handleOpenContactWithService(service)} />

        {/* 4. Projects Showcase Section */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Process Methodology Section */}
        <Process />

        {/* 6. Contact Section */}
        <Contact />

        {/* 7. Call To Action Section */}
        <CTA onOpenContact={() => handleOpenContactWithService('Web Development')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preselectedService={selectedService}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => handleOpenContactWithService('Web Development')}
      />
    </div>
  );
}
