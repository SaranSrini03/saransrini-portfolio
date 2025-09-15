"use client";

import { useState, useEffect } from "react";
import PixelBlast from "@/components/PixelBlast/PixelBlast";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

export default function HeroSection() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div
      className={`relative min-h-screen overflow-hidden font-mono bg-gradient-to-br from-slate-900 to-slate-900 
        transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          className="w-full h-full opacity-60"
          variant="circle"
          pixelSize={9}
          color="orange"
          patternScale={10}
          patternDensity={5}
          enableRipples
          speed={1}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-purple-900/20"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Cursor glow */}
      <div
        className="absolute pointer-events-none z-5 w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="flex flex-col lg:flex-row w-full items-center gap-0
          backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 
          border border-white/20 rounded-3xl p-10 shadow-2xl">

          {/* Left side */}
          <div
            className={`text-white text-center lg:text-left mb-10 lg:mb-0 flex-1 transform transition-all duration-1000
            ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            <div className="mb-6">
              <span className="text-orange-400 text-lg font-light tracking-wider">
                Hello, I&apos;m
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-6xl font-bold bg-gradient-to-r from-orange-300 via-orange-600 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
              Saran Srini V
            </h1>

            <div className="h-12 mb-8">
              <p className="text-xl md:text-2xl lg:text-3xl text-orange-300 font-light">
                <span className="inline-block transition-all duration-500 transform">
                  {titles[currentTitle]}
                </span>
              </p>
            </div>

            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg">
              Passionate about creating digital experiences that blend creativity
              with technology. Always learning, always building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/explore"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full hover:from-orange-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 font-semibold"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>

              <a
                href="/contact"
                className="group px-8 py-4 border-2 border-white/30 rounded-full hover:border-orange-400 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Get In Touch
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <div className="flex gap-6 justify-center lg:justify-start mt-8">
              {["GitHub", "LinkedIn", "Twitter"].map((social, index) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className={`text-gray-400 hover:text-orange-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div
            className={`lg:w-1/2 flex justify-center lg:justify-end transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-600/20 via-orange-600/20 to-pink-600/20 blur-xl animate-pulse"></div>
              <ProfileCard
                name="Saran Srini V"
                title={titles[currentTitle]}
                handle="s4r4nsr1n1"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/saran.png"
                showUserInfo
                enableTilt
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
                className="text-sm relative z-10 transform hover:scale-100 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2 font-light tracking-wider">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-600/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
    </div>
  );
}
