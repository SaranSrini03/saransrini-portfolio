'use client';

import { useEffect, useRef, useState } from 'react';

const Skills = () => {
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

  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'RESTful APIs', level: 85 },
        { name: 'GraphQL', level: 70 },
      ]
    },
    {
      category: 'Tools & Others',
      items: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Firebase', level: 75 },
        { name: 'Figma', level: 80 },
        { name: 'Agile/Scrum', level: 85 },
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 transition-opacity duration-1000 font-mono ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`space-y-12 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent tracking-tight inline-block">
              My Skills
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              A collection of my technical skills and the tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {skills.map((category, index) => (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
