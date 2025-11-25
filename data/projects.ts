export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  tags: string[];
  caseStudyUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    summary: 'Full-stack storefront with secure checkout, admin analytics, and inventory automations.',
    description:
      'I led the development of a full-featured commerce experience that handles thousands of orders per day. The project focused on stable checkout flows, insightful admin dashboards, and automation across order fulfillment.',
    highlights: [
      'Server-rendered product detail pages with caching and ISR',
      'Stripe-powered checkout, refunds, and webhook-based fulfillment',
      'Admin dashboard streaming sales metrics and alerting stockouts',
    ],
    tags: ['React', 'Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    summary: 'Collaborative planning tool with Kanban boards, notifications, and offline sync.',
    description:
      'Built a collaborative organizer for teams who need real-time visibility. I focused on quick feedback loops, push notifications, and offline resilience so tasks stay in sync even on flaky networks.',
    highlights: [
      'Shared Kanban boards with optimistic updates and drag interactions',
      'Push notifications for mentions and due reminders via Firebase Cloud Messaging',
      'PWA offline support powered by background sync and IndexedDB',
    ],
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
  },
  {
    slug: 'portfolio-experience',
    title: 'Portfolio Website',
    summary: 'Micro-interactions showcase with custom shader animations and CMS-powered content.',
    description:
      'A personal playground to experiment with motion design. The build mixes shader-driven hero scenes, scroll-driven reveals, and a content pipeline wired to Notion so updates ship without redeploys.',
    highlights: [
      'Hero canvas powered by custom fragment shaders and mouse tracking',
      'Markdown-driven pages pulled from Notion with incremental revalidation',
      'Lighthouse scores above 95 for performance, accessibility, and SEO',
    ],
    tags: ['React', 'Framer Motion', 'Three.js'],
  },
  {
    slug: 'developer-toolkit',
    title: 'Developer Toolkit',
    summary: 'CLI + dashboard that scaffolds projects, monitors builds, and tracks deployments.',
    description:
      'A productivity suite that gives teams a consistent starting point. I combined a command-line generator with a telemetry dashboard so engineers can start faster and keep tabs on build health.',
    highlights: [
      'One-command project scaffolds with language-specific presets',
      'Web dashboard surfacing build timings, release notes, and logs',
      'GitHub Actions integration for deployment tracking and rollbacks',
    ],
    tags: ['Node.js', 'Express', 'Redis', 'Docker'],
  },
];

