'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { projects as projectData } from '@/data/projects';

const Projects = () => {
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

  const projects = projectData.slice(0, 3);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={`w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black transition-opacity duration-1000 font-mono ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`space-y-12 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent tracking-tight inline-block">
              My Projects
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Here are some of the projects I&apos;ve worked on. Each project was built to solve specific problems and improve user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-orange-500/10 text-orange-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/projects/${project.slug}`} 
                  className="text-orange-400 hover:text-orange-300 text-sm font-medium inline-flex items-center group"
                >
                  View Project
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-orange-400 hover:text-white hover:bg-orange-500/20 transition-all duration-300 group"
          >
            Show More Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
