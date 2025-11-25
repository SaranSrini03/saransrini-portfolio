'use client';

import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/data/projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0f] to-gray-950 text-white font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <span className="text-sm text-gray-500">/projects</span>
        </div>

        <div className="space-y-4">
          <p className="text-orange-400 uppercase tracking-[0.2em] text-xs">Projects</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Shipping products that feel fast and polished.
          </h1>
          <p className="text-gray-400 max-w-3xl">
            A curated list of recent builds—from production SaaS apps to experimental interfaces. Each project pairs thoughtful
            UX with proven engineering approaches.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="relative border border-white/10 bg-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">{project.title}</h2>
                  <p className="text-gray-400">{project.summary}</p>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-white transition-colors"
                >
                  View case study
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={`highlight-${highlightIndex}`}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={`tag-${tagIndex}`}
                      className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300 bg-black/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

