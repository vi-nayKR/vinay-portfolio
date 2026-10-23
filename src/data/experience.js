export const experienceData = {
  experiences: [
    {
      company: 'Medha Innovations',
      slug: 'medha-innovations',
      stat: 'Go Backend · 21 Domains',
      note: 'Founding Engineer / Co-founder · self-funded venture',
      period: 'Mar 2026 – Sep 2026',
      type: 'Startup',
      highlights: [
        'Co-founded a booking and messaging venture; designed a modular Go backend for profiles, practitioner discovery, availability and bookings.',
        'Designed booking coordination around PostgreSQL transactions and row locking, with PostGIS discovery, RS256 JWT/RBAC and Redis Pub/Sub-backed WebSockets.',
        'Collaborated on integration and deployment planning. October follow-on AI prototypes are separate from this venture period; Kubernetes/Argo CD configuration is not proof of the current runtime.',
      ],
      tags: ['Go', 'PostgreSQL', 'PostGIS', 'Redis', 'WebSockets', 'JWT / RBAC', 'Docker'],
    },
    {
      company: 'Liminal Custody',
      slug: 'liminal-custody',
      stat: 'Policy & Authorization APIs',
      note: 'Software Engineer, Full Stack · First Answer India Services Pvt. Ltd.',
      period: 'Nov 2025 – Mar 2026',
      type: 'Professional',
      highlights: [
        'Built TypeScript transaction-policy APIs for address-risk screening, Travel Rule checks and transfer velocity controls.',
        'Implemented Redis-cached short-circuit rule evaluation and TypeORM transactions to avoid partial database updates.',
        'Worked on tenant RBAC, quorum approvals, Auth0 and step-up two-factor authentication with signature validation.',
      ],
      tags: ['TypeScript', 'Node.js', 'TypeORM', 'Redis', 'RBAC', 'Auth0'],
    },
    {
      company: 'Light & Wonder',
      slug: 'light-and-wonder-employment',
      stat: 'Full-Stack & Debugging',
      note: 'Final title: Senior Associate Software Engineer',
      period: 'Aug 2023 – Jul 2025',
      type: 'Professional',
      highlights: [
        'Built an internal LLM-assisted debugging tool with a React interface to match crash reports and telemetry to historical hardware incidents.',
        'Investigated a memory leak that caused slot machines to hang or restart; corrected component cleanup and resource reuse.',
        'Built SQL Server-backed APIs and screens for casino operations, audit capture and Cypress end-to-end tests. Employer-specific work is résumé-reported, not public-source validation.',
      ],
      tags: ['React', 'Angular', 'SQL Server', 'Cypress', 'Debugging'],
    },
    {
      company: 'Light & Wonder',
      slug: 'light-and-wonder-intern',
      stat: 'Separate Internship',
      note: 'Intern · distinct from subsequent full-time employment',
      period: 'Mar 2023 – Jul 2023',
      type: 'Internship',
      highlights: [
        'Software engineering internship preceding the August 2023 start of full-time employment.',
        'Worked with C#/.NET and Angular foundations; this period is not counted as full-time Senior Associate employment.',
      ],
      tags: ['C#', '.NET', 'Angular', 'Software Engineering'],
    },
  ],
};
