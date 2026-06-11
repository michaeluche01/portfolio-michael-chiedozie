export const projects = [
  {
    id: 'mehticpay',
    title: 'MehticPay',
    tagline: 'Fintech e-wallet · 10,000+ active users',
    description:
      'Full-cycle delivery of a production fintech platform for iOS and Android. Real-time monetary transfers, cryptocurrency management, bill payment, and airtime services. Engineered biometric auth, encrypted storage, and real-time Firebase balance streams. Managed the complete App Store and Play Store submission lifecycle.',
    role: 'Flutter Mobile Engineer',
    company: 'Mehtic Technology',
    period: 'Aug 2023 – Oct 2024',
    highlights: [
      '10,000+ active users on iOS and Android',
      '30% reduction in app load time via widget-tree profiling',
      'Biometric login + end-to-end encrypted financial data',
      'Full App Store + Play Store release lifecycle ownership',
    ],
    tech: ['Flutter', 'Dart', 'Firebase', 'MySQL', 'Riverpod', 'REST APIs', 'CI/CD'],
    links: {
      live: 'https://play.google.com/store',
      github: null,
    },
    featured: true,
    type: 'production',
  },
  {
    id: 'throve',
    title: 'Throve',
    tagline: 'AI-powered inventory SaaS · Solo full-stack build',
    description:
      'Multi-tenant SaaS inventory management platform built end-to-end as a solo project. Python/FastAPI backend with strict per-tenant data isolation, JWT auth with token rotation, 4-tier RBAC, and a real-time fraud detection engine scoring every stock adjustment 0–100. Flutter mobile client and C# admin dashboard in parallel development.',
    role: 'Solo Architect & Engineer',
    company: 'Personal Project',
    period: 'Ongoing',
    highlights: [
      'Multi-tenancy with ORM-layer data isolation across unlimited businesses',
      'Real-time fraud detection engine with automated approval workflow',
      '7-template transactional email system via FastAPI BackgroundTasks',
      'JWT auth with SHA-256 token blacklisting + 4-tier RBAC',
    ],
    tech: ['Flutter', 'Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'React', 'Docker', 'JWT'],
    links: {
      live: null,
      github: 'https://github.com/michaeluche01',
    },
    featured: true,
    type: 'personal',
  },
  {
    id: 'yulii',
    title: 'Yulii',
    tagline: 'Task & rewards platform · Live on both stores',
    description:
      'Cross-platform social productivity app with dynamic task delegation, customisable reward systems, and real-time collaboration. Shipped to both Google Play and the App Store. Built on Flutter with PostgreSQL-backed REST APIs and real-time data synchronisation across platforms.',
    role: 'Flutter Mobile Engineer',
    company: 'Adaptive Computer Solutions',
    period: '2023 – 2024',
    highlights: [
      'Live on Google Play Store and Apple App Store',
      'Real-time task collaboration and reward tracking',
      'Custom gamified UI with smooth animations',
      'PostgreSQL-backed API with efficient cross-platform data sync',
    ],
    tech: ['Flutter', 'Dart', 'PostgreSQL', 'REST APIs', 'Provider'],
    links: {
      live: 'https://play.google.com/store',
      github: null,
    },
    featured: true,
    type: 'production',
  },
  {
    id: 'specspay',
    title: 'SpecsPay',
    tagline: 'React Native fintech payments app',
    description:
      'Contracted as part of a team to build a React Native/Expo fintech payments app. Wallet management, transaction tracking, budget tools, card management, and PIN-secured payment flows across iOS and Android.',
    role: 'React Native Engineer (Contract)',
    company: 'SpecsPay',
    period: 'Late 2024',
    highlights: [
      'TypeScript + Expo Router file-based navigation',
      'Redux state for wallet, transaction, and auth state',
      'Responsive scaling across iOS and Android device sizes',
    ],
    tech: ['React Native', 'TypeScript', 'Expo', 'Redux', 'styled-components'],
    links: {
      live: null,
      github: null,
    },
    featured: false,
    type: 'contract',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
