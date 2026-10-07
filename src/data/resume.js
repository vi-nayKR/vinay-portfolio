// Mirrors Vinay_K_R_AI_Engineer_Resume_final.docx. Every value here must also appear in that resume.
export const resumeData = {
  title: 'Vinay K R — AI Engineer Resume',
  url: '/resumes/Vinay_K_R_AI_Engineer_Resume.pdf',
  download: 'Vinay_K_R_AI_Engineer_Resume.pdf',
  docxUrl: '/resumes/Vinay_K_R_AI_Engineer_Resume.docx',
  updated: 'Oct 2026',
  pages: 2,
  // Rendered from the PDF by scratch/export_resume.ps1 (Letter size, 1530x1980)
  pageImages: ['/resumes/pages/page-1.webp', '/resumes/pages/page-2.webp'],
  pageAspect: '612 / 792',
  headline:
    'AI Engineer · 3+ years of production Python · RAG, AI agents (LangGraph, MCP) and LLM evaluation, with a focus on accuracy, latency and cost.',
  highlights: [
    {
      value: '76.0%',
      label: 'held-out F1',
      detail: 'ReconcileAI: Gemini vision vs 66.0% Qwen VLM and 56.9% OCR + text LLM',
    },
    {
      value: '1,420 → 264 MiB',
      label: 'memory cut',
      detail: 'Medha docs QA: int8 + ONNX arena off to fit a 512 MiB container',
    },
    {
      value: '60 turns',
      label: '3-language eval',
      detail: 'Medha Sahayak: English, Kannada and Hindi; rules baseline vs gpt-oss-20b',
    },
    {
      value: '2 LLM tools',
      label: 'at L&W',
      detail: 'Gemini debugging tool on Azure; OpenAI in-game assistant approved for lab testing',
    },
  ],
  professionalCore:
    '3+ years across Medha Innovations, Liminal Custody and Light & Wonder. At Light & Wonder, built an LLM-assisted debugging tool (Gemini API, on Azure) used by internal teams and an in-game LLM chat assistant (OpenAI API) approved for lab testing. At Medha, built an event-driven LLM booking assistant with guardrails and human approval, and deployed a hybrid-search documentation QA service.',
  projectEvidence:
    'ReconcileAI compares three extraction backends on held-out CORD receipts. TraceWard is a LangGraph incident-triage agent with MCP tools, human approval and prompt-injection tests. EvidenceRAG runs SQuAD v1.1 retrieval ablations scored by Recall@k, MRR, nDCG and an LLM judge.',
  skillGroups: [
    { label: 'LLM, RAG & Evaluation', items: 'Python, FastAPI, Pydantic, LangGraph, MCP, hybrid search, BM25, reranking, Docling, VLMs, LLM-as-a-judge, Recall@k / MRR / nDCG' },
    { label: 'Backend & Frontend', items: 'Go, Node.js, TypeScript, REST APIs, SSE, WebSockets, Redis Pub/Sub, React, Angular' },
    { label: 'Data & Delivery', items: 'PostgreSQL, PostGIS, Redis, MySQL, Docker, Kubernetes (k3s), Argo CD, GitHub Actions, GitLab CI/CD, OpenTelemetry' },
  ],
};
