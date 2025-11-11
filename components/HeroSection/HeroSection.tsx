'use client';

import { useState, useEffect } from 'react';
import PixelBlast from "@/components/PixelBlast/PixelBlast";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import BackgroundGrid from "./components/BackgroundGrid";
import dynamic from 'next/dynamic';

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
  const titles = ["Student", "Developer", "Designer", "Creator"];
  const [currentTitle, setCurrentTitle] = useState(0);

  // Fade-in + cursor tracking
  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Cycle through titles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-mono bg-gradient-to-br from-slate-900 to-slate-900 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <BackgroundGrid />
      
      <div className="absolute inset-0 z-0">
        <PixelBlast
          className="w-full h-full opacity-40 md:opacity-60"
          variant="circle"
          pixelSize={window.innerWidth < 768 ? 12 : 9}
          color="orange"
          patternScale={window.innerWidth < 768 ? 8 : 10}
          patternDensity={window.innerWidth < 768 ? 3 : 5}
          enableRipples
        />
      </div>

      <FloatingParticles count={window.innerWidth < 768 ? 10 : 20} />
      <CursorGlow x={mousePosition.x} y={mousePosition.y} />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 h-auto min-h-screen flex items-center py-16 sm:py-20 md:py-24">
        <div className="flex flex-col-reverse lg:flex-row w-full items-center gap-6 lg:gap-8 backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl mx-auto max-w-7xl">
          {/* Left side */}
          <div className={`w-full text-center lg:text-left lg:mb-0 flex-1 transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 lg:-translate-x-20 opacity-0"}`}>
            <div className="mb-4 sm:mb-6">
              <span className="text-orange-400 text-sm sm:text-base md:text-lg font-light tracking-wider">
                Hello, I&apos;m
              </span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-300 via-orange-600 to-orange-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
              Saran Srini V
            </h1>

            <div className="h-10 sm:h-12 mb-6 sm:mb-8">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-300 font-light">
                <span className="inline-block transition-all duration-500 transform">
                  {titles[currentTitle]}
                </span>
              </p>
            </div>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Passionate about creating digital experiences that blend creativity with technology. Always learning, always building.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="/project"
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-600 to-orange-600 rounded-full hover:from-orange-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 font-medium sm:font-semibold text-sm sm:text-base"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>

              <a
                href="/contact"
                className="group px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-white/30 rounded-full hover:border-orange-400 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 font-medium sm:font-semibold text-sm sm:text-base flex items-center justify-center"
              >
                Get In Touch
                <span className="inline-block ml-1.5 sm:ml-2 transition-transform group-hover:translate-x-0.5 text-sm sm:text-base">
                  →
                </span>
              </a>
            </div>

            <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center lg:justify-start mt-6 sm:mt-8">
              {["GitHub", "LinkedIn", "Twitter"].map((social, index) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className={`text-gray-400 hover:text-orange-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 text-xs sm:text-sm md:text-base ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className={`w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/2 flex justify-center transform transition-all duration-1000 mb-8 lg:mb-0 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 lg:translate-x-20 opacity-0"}`} style={{ transitionDelay: "300ms" }}>
            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
              <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-600/20 via-orange-600/20 to-pink-600/20 blur-xl animate-pulse"></div>
              <ProfileCard
                name="Saran Srini V"
                title={titles[currentTitle]}
                handle="s4r4nsr1n1"
                status="Online"
                contactText="Contact"
                avatarUrl="/saran.png"
                showUserInfo
                enableTilt
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
                className="text-xs sm:text-sm relative z-10 transform hover:scale-100 transition-transform duration-300 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
      <DecorativeElements />
    </div>
  );
};

export default HeroSection;
