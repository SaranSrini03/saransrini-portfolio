'use client';

import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 transition-opacity duration-1000 font-mono ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent tracking-tight">
              About Me
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I&apos;m a passionate developer with a strong foundation in web technologies and a keen eye for design. 
                My journey in technology started at a young age, and I&apos;ve been building digital experiences ever since.
              </p>
              <p>
                I specialize in creating responsive, accessible, and performant web applications using modern technologies 
                like React, Next.js, and TypeScript. I&apos;m always eager to learn new technologies and methodologies 
                to improve my craft.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge with the developer community.
              </p>
            </div>
            
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-white mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-2 font-mono">
                {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 
                  'GraphQL', 'Git', 'AWS', 'Docker'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-orange-300 font-mono tracking-tight"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div 
            className={`relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-4 border-orange-500/30">
                  <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent flex items-center justify-center">
                    <span className="text-4xl text-orange-400">👨‍💻</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">Saran Srini V</h3>
                <p className="text-orange-300">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
