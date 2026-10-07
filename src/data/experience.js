export const experienceData = {
  experiences: [
    {
      company: 'Medha Innovations',
      slug: 'medha-innovations',
      stat: 'AI Services + Go Platform',
      note: 'Founding Engineer · two-founder startup',
      period: 'Mar 2026 – Sep 2026',
      type: 'Startup',
      highlights: [
        'Built Sahayak, an event-driven booking assistant: safety guard, rule-based router, LLM intent extraction and a grounding gate behind human-approved cards.',
        'Deployed an offline documentation QA service (BM25 + ONNX embeddings, RRF, cited answers); held-out recall@5 86.4% hybrid vs 90.9% BM25.',
        'Designed the Go modular monolith (21 domains) with booking locks, PostGIS discovery and Redis Pub/Sub WebSockets on k3s and Argo CD.',
      ],
      tags: ['Python', 'FastAPI', 'Pydantic', 'Redis Pub/Sub', 'SQLite FTS5', 'ONNX', 'Go', 'PostGIS', 'k3s'],
    },
    {
      company: 'Liminal Custody',
      slug: 'liminal-custody',
      stat: '4 EVM Networks',
      note: 'Software Engineer – Full Stack · First Answer India Services Pvt Ltd',
      period: 'Nov 2025 – Mar 2026',
      type: 'Production',
      highlights: [
        'Built Node.js/TypeScript APIs and Angular screens for TRM Labs address-risk screening, FATF Travel Rule checks and transfer velocity limits.',
        'Implemented Redis-cached policy evaluation with short-circuit rules and TypeORM transactions, plus tenant-scoped bridge quote caching across four EVM networks.',
        'Implemented tenant RBAC, quorum approvals, Auth0 and step-up 2FA with signature validation for high-risk actions.',
      ],
      tags: ['Node.js', 'TypeScript', 'Angular', 'TypeORM', 'Redis', 'PostgreSQL', 'RBAC', 'Auth0'],
    },
    {
      company: 'Light & Wonder',
      slug: 'light-and-wonder-senior',
      stat: 'LLM Crash Triage',
      note: 'Associate: Aug 2023–Mar 2025 · Senior Associate: Apr–Jul 2025',
      period: 'Aug 2023 – Jul 2025',
      type: 'Production',
      highlights: [
        'Built an internal LLM-assisted debugging tool (React UI) that matched crash reports and telemetry to similar historical hardware incidents and their fixes.',
        'Fixed an embedded-Chromium memory leak that hung slot machines after about an hour, through component cleanup and media caching.',
        'Built 50+ Angular screens on ASP.NET Core and Node.js APIs with SQL Server; maintained 750+ Cypress tests and automated audit capture.',
      ],
      tags: ['LLM', 'React', 'Angular', 'C# / ASP.NET Core', 'Node.js', 'SQL Server', 'Cypress'],
    },
    {
      company: 'Light & Wonder',
      slug: 'light-and-wonder-intern',
      stat: '16-Week Internship',
      note: 'LNW India Solutions Pvt Ltd',
      period: 'Mar 2023 – Jul 2023',
      type: 'Internship',
      highlights: [
        'Completed a 16-week C#/.NET Core and Angular internship, covering API design, database integration, and debugging.',
        'Delivered a game-recommendation application integrating user feedback, ratings, REST APIs, and SQL Server.',
      ],
      tags: ['Angular', 'C#', '.NET Core', 'SQL Server', 'REST APIs'],
    },
  ],
};
