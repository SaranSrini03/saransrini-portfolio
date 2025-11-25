"use client";

import dynamic from 'next/dynamic';

// Import components with SSR disabled for better performance
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/HeroSection/HeroSection'), { ssr: false });
const About = dynamic(() => import('@/components/About/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills/Skills'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact/Contact'), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-black"></div> 
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0f] to-gray-950 relative overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 -z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0b0b0f]/90 to-gray-950/95">
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
            style={{
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <section id="home">
            <HeroSection />
          </section>
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  );
}
