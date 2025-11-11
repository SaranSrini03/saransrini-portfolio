// app/components/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import PixelBlast from "@/components/PixelBlast/PixelBlast";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const titles = ["Student", "Developer", "Designer", "Creator"];
  const [titleIndex, setTitleIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  /* ---------- mount & title rotator ---------- */
  useEffect(() => {
    setIsLoaded(true);
    const id = setInterval(() => setTitleIndex((i) => (i + 1) % titles.length), 3000);
    return () => clearInterval(id);
  }, []);

  /* ---------- mouse & card 3-D tilt ---------- */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / innerWidth) * 100;
      const y = (e.clientY / innerHeight) * 100;
      setMouse({ x, y });

      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-cy / rect.height) * 15; // max 15deg
      const rotateY = (cx / rect.width) * 15;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };
    addEventListener("mousemove", onMove);
    return () => removeEventListener("mousemove", onMove);
  }, []);

  /* ---------- social links ---------- */
  const socials = [
    { label: "GitHub", url: "https://github.com/s4r4nsr1n1" },
    { label: "LinkedIn", url: "https://linkedin.com/in/s4r4nsr1n1" },
    { label: "Twitter", url: "https://twitter.com/s4r4nsr1n1" },
  ];

  return (
    <section
      className={`relative min-h-screen overflow-hidden font-mono bg-gradient-to-br from-slate-900 to-black
        transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={
        {
          "--grid": "rgba(255,255,255,0.03)",
          "--size": "40px",
        } as React.CSSProperties
      }
    >
      {/* animated grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)`,
          backgroundSize: "var(--size) var(--size)",
          maskImage: "radial-gradient(ellipse at center, #000 0%, transparent 80%)",
        }}
      />

      {/* background art */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-purple-900/20" />
      </div>

      {/* particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(25)].map((_, i) => (
          <span
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

      /* cursor glow */
      <div
        className="pointer-events-none absolute z-10 w-[32rem] h-[32rem] rounded-full opacity-30 blur-3xl
          transition-all duration-300"
        style={{
          background: `radial-gradient(circle, rgba(249,115,22,.4) 0%, transparent 70%)`,
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          transform: "translate(-50%,-50%)",
        }}
      />

      /* decorative blobs */
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-600/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full blur-3xl" />

      {/* ---------- content ---------- */}
      <div className="relative z-20 container mx-auto px-6 h-screen flex items-center">
        <div
          className="grid lg:grid-cols-5 gap-8 lg:gap-16 w-full
            backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
        >
          {/* left */}
          <div className="lg:col-span-3 text-white flex flex-col justify-center">
            <p className="mb-4 text-orange-400 font-light tracking-wider">Hello, I&apos;m</p>
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 bg-clip-text text-transparent mb-4">
              Saran Srini V
            </h1>

            <div className="h-10 mb-6 overflow-hidden">
              <span className="inline-block text-2xl md:text-3xl text-orange-300 font-light animate-slide">
                {titles[titleIndex]}
              </span>
            </div>

            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
              Crafting digital experiences where creativity meets code. Always
              learning, always building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/projects"
                className="group relative px-7 py-3 rounded-full font-semibold
                  bg-gradient-to-r from-orange-600 to-orange-500 hover:shadow-lg hover:shadow-orange-500/30
                  transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">Explore my work</span>
              </a>
              <a
                href="/contact"
                className="group px-7 py-3 rounded-full font-semibold border border-white/30
                  hover:border-orange-400 hover:bg-white/5 transition-all duration-300 transform hover:scale-105"
              >
                Get in touch <span className="ml-2">→</span>
              </a>
            </div>

            <div className="flex gap-6 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-gray-400 hover:text-orange-400 transition
                    transform hover:scale-110 hover:-translate-y-1"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* right */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div
              ref={cardRef}
              className="relative transition-transform duration-200 ease-out"
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-40 blur-xl animate-breath" />
              <ProfileCard
                name="Saran Srini V"
                title={titles[titleIndex]}
                handle="s4r4nsr1n1"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/saran.png"
                showUserInfo
                enableTilt={false} // we handle tilt ourselves
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact")}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-light tracking-wider">Scroll to explore</span>
          <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-orange-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          20%,
          80% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
        .animate-slide {
          animation: slide 3s infinite ease-in-out;
        }
        @keyframes breath {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }
        .animate-breath {
          animation: breath 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-breath,
          .animate-slide,
          .animate-pulse,
          .animate-bounce {
            animation: none !important;
          }
        }
        @media (prefers-color-scheme: light) {
          :root {
            --grid: rgba(0, 0, 0, 0.04);
          }
        }
      `}</style>
    </section>
  );
}