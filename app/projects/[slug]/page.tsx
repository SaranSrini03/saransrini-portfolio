import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = () =>
  projects.map((project) => ({
    slug: project.slug,
  }));

export const dynamicParams = false;

export function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  return {
    title: project ? `${project.title} · Case Study` : 'Project · Case Study',
    description: project?.summary ?? 'Project case study detail',
  };
}

const ProjectDetailPage = ({ params }: ProjectPageProps) => {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0f] to-gray-950 text-white font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
          <span className="text-sm text-gray-500">{`/projects/${project.slug}`}</span>
        </div>

        <header className="space-y-4">
          <p className="text-orange-400 uppercase tracking-[0.2em] text-xs">
            Case Study
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-gray-300 text-lg">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300 bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Highlights</h3>
            <ul className="space-y-3 text-gray-300 list-disc list-inside">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to list
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-orange-400 hover:text-white hover:bg-orange-500/20 transition-all"
          >
            Discuss this project
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

