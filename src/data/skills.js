export const skillsData = {
  categories: [
    {
      name: 'LLM & Agent Architectures',
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/></svg>`,
      skills: ['LangGraph Multi-Agent', 'Tool Calling & MCP', 'Structured Outputs', 'Human-in-the-Loop', 'Prompt Engineering', 'SSE Streaming'],
    },
    {
      name: 'Retrieval & Vector Search',
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
      skills: ['Hybrid RAG', 'BM25 + Dense', 'Chunking', 'Reciprocal Rank Fusion', 'ONNX Embeddings', 'Cross-Encoder Rerank'],
    },
    {
      name: 'AI Evaluation & Guardrails',
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
      skills: ['Golden Datasets', 'LLM-as-a-Judge', 'Recall@k / MRR / nDCG', 'Faithfulness', 'Injection Tests', 'Precision / Recall / F1'],
    },
    {
      name: 'AI Backend & Document AI',
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
      skills: ['Python / FastAPI', 'Docling + VLMs', 'Pydantic / Instructor', 'ARQ Workers', 'Go / chi', 'PostgreSQL & Redis'],
    },
    {
      name: 'Observability & AI Telemetry',
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
      skills: ['OpenTelemetry & Jaeger', 'Token & Cost Tracking', 'Latency p50 / p95', 'Rate Limits & Retries', 'Semantic Caching', 'Prometheus & Grafana'],
    },
    {
      name: 'Full-Stack Product Engineering',
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 12H15.25M12 8.75V15.25"/></svg>`,
      skills: ['Angular / RxJS', 'React / TypeScript', 'Node.js / Express', 'C# / ASP.NET Core', 'HTML5 / CSS3', 'Cypress / REST APIs'],
    },
  ],
  extraTags: ['Gemini', 'Groq', 'Qwen VLM', 'PyTorch LSTM', 'Docker', 'Kubernetes', 'Argo CD', 'GitLab CI/CD', 'Pytest', 'Strict Mypy', 'PostGIS', 'JWT & RBAC'],
};
