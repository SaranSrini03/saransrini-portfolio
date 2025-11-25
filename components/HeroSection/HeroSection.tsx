'use client';

import { useState, useEffect, useMemo } from 'react';
import PixelBlast from "@/components/PixelBlast/PixelBlast";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import BackgroundGrid from "./components/BackgroundGrid";
import dynamic from 'next/dynamic';
import SpaceBackground from '@/components/ui/SpaceBackground';
import { Button } from '@/components/ui/Button';
import TypingEffect from '@/components/ui/TypingEffect';
import SpotlightCard from '@/components/ui/SpotlightCard';

const FloatingParticles = dynamic(
  () => import('@/components/ui/FloatingParticles'),
  { ssr: false }
);
import CursorGlow from "./components/CursorGlow";
import ScrollIndicator from "./components/ScrollIndicator";
import DecorativeElements from "./components/DecorativeElements";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titles = useMemo(() => ["Student", "Developer", "Designer", "Creator"], []);

  // Fade-in + cursor tracking
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-mono bg-black transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <SpaceBackground />
      <BackgroundGrid />

      <div className="absolute inset-0 z-0">
        <PixelBlast
          className="w-full h-full opacity-10 md:opacity-20"
          variant="circle"
          pixelSize={isMobile ? 12 : 9}
          color="orange"
          patternScale={isMobile ? 8 : 10}
          patternDensity={isMobile ? 3 : 5}
          enableRipples
        />
      </div>

      {mounted && <FloatingParticles count={isMobile ? 10 : 20} />}
      <CursorGlow x={mousePosition.x} y={mousePosition.y} />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 h-auto min-h-screen flex items-center py-16 sm:py-20 md:py-24">
        <SpotlightCard
          className="flex flex-col-reverse lg:flex-row w-full items-center gap-6 lg:gap-8 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl mx-auto max-w-7xl"
          spotlightColor="rgba(255, 165, 0, 0.15)"
        >
          {/* Left side */}
          <div className={`w-full text-center lg:text-left lg:mb-0 flex-1 transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 lg:-translate-x-20 opacity-0"}`}>
            <div className="mb-4 sm:mb-6">
              <span className="text-orange-400 text-sm sm:text-base md:text-lg font-medium tracking-wider uppercase">
                Hello, I&apos;m
              </span>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-orange-500 to-orange-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
              Saran Srini V
            </h1>

            <div className="h-10 sm:h-12 mb-6 sm:mb-8 flex justify-center lg:justify-start items-center">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mr-2">I am a</span>
              <TypingEffect
                words={titles}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-400 font-semibold"
              />
            </div>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Passionate about creating digital experiences that blend creativity with technology. Always learning, always building.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                asChild
                variant="primary"
                className="group relative overflow-hidden px-8 py-6 text-lg"
              >
                <a href="/projects">
                  <span className="relative z-10">Explore My Work</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="group px-8 py-6 text-lg border-orange-500/30 hover:bg-orange-500/10 text-orange-400"
              >
                <a href="/contact">
                  Get In Touch
                  <span className="inline-block ml-1.5 sm:ml-2 transition-transform group-hover:translate-x-0.5 text-sm sm:text-base">
                    →
                  </span>
                </a>
              </Button>
            </div>

            <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center lg:justify-start mt-8 sm:mt-10">
              {["GitHub", "LinkedIn", "Twitter"].map((social, index) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className={`text-gray-500 hover:text-orange-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 text-sm sm:text-base font-medium ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className={`w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/2 flex justify-center transform transition-all duration-1000 mb-8 lg:mb-0 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 lg:translate-x-20 opacity-0"}`} style={{ transitionDelay: "300ms" }}>
            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm group">
              <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-600/30 via-purple-600/30 to-pink-600/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <ProfileCard
                name="Saran Srini V"
                title={titles[0]}
                handle="s4r4nsr1n1"
                status="Online"
                contactText="Contact"
                avatarUrl="/saran.png"
                showUserInfo
                enableTilt
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
                className="text-xs sm:text-sm relative z-10 transform hover:scale-[1.02] transition-transform duration-300 w-full"
              />
            </div>
          </div>
        </SpotlightCard>
      </div>

      <ScrollIndicator />
      <DecorativeElements />
    </div>
  );
};

export default HeroSection;

