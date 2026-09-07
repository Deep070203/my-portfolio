import React from 'react';
import { Award, BookOpen, Briefcase, Code, ShieldCheck, Terminal, Cpu, Eye } from 'lucide-react';
import { GoogleCloudLogo } from './TechLogos';

export default function AboutView({ setActiveTab, onOpenCertificate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 border-b border-[var(--border-color)] pb-8">
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)]">
          About Me
        </h1>
        <p className="text-base text-[var(--text-secondary)] font-sans">
          Software Engineer, Quantitative Systems Developer, and AI Researcher.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="prose prose-invert max-w-none space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
        <p className="text-base text-[var(--text-primary)] font-medium leading-relaxed">
          I'm Deep Shah, a Software Development Engineer II at UPS, Master of Information and Data Science (MIDS) candidate at UC Berkeley, and Google Cloud Certified Generative AI Leader.
        </p>
        <p>
          My technical expertise spans <strong className="text-[var(--text-primary)] font-mono">high-throughput microservices architecture</strong>, <strong className="text-[var(--text-primary)] font-mono">quantitative options market analytics</strong>, and <strong className="text-[var(--text-primary)] font-mono">autonomous AI agent SDKs</strong>. At UPS, I engineer enterprise services powering package tracking and operational workflows, ensuring multi-million daily event resilience with Java, Spring Boot, Kafka, and Docker/Kubernetes.
        </p>
        <p>
          Outside of enterprise microservices, I build quantitative trading infrastructure in <strong className="text-[var(--text-primary)] font-mono">Go</strong> and <strong className="text-[var(--text-primary)] font-mono">Rust</strong>. Projects like <strong className="text-[var(--accent-cyan)] font-mono">Magneto.ai</strong> track real-time options NetGEX (Gamma Exposure) and NetVEX (Vanna Exposure) across SPY and NVDA with Black-Scholes solvers, while <strong className="text-[var(--accent-cyan)] font-mono">Kalshi Arbitrage Bot</strong> runs sub-millisecond event contract order book monitoring via WebSockets.
        </p>
      </div>

      {/* Quick Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4">
        
        {/* Experience Box */}
        <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-[var(--text-primary)] text-sm">UPS</h3>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">SDE II (2024 - Present)</p>
              </div>
            </div>
            <ul className="text-xs space-y-1.5 text-[var(--text-secondary)] list-disc pl-4">
              <li>Promoted from SDE I to SDE II in under 12 months for technical leadership.</li>
              <li>Architected event-driven microservices handling 5M+ daily messages.</li>
              <li>Optimized database queries and Redis caching, cutting P99 latency by 38%.</li>
            </ul>
          </div>
        </div>

        {/* Education Box */}
        <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-[var(--text-primary)] text-sm">Berkeley & Rutgers</h3>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">MIDS @ Berkeley | B.S. CS (3.96)</p>
              </div>
            </div>
            <ul className="text-xs space-y-1.5 text-[var(--text-secondary)] list-disc pl-4">
              <li>Graduated Rutgers Summa Cum Laude with 3.96/4.0 GPA.</li>
              <li>Specializing in Applied Machine Learning, Distributed Systems, and NLP.</li>
              <li>Developing autonomous agent harnesses and Rust quant tooling.</li>
            </ul>
          </div>
        </div>

        {/* Certification Box */}
        <div className="p-5 rounded-lg border border-blue-500/30 bg-blue-500/5 space-y-3 flex flex-col justify-between hover:border-blue-400 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <GoogleCloudLogo className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-[var(--text-primary)] text-sm">Google Cloud</h3>
                <p className="text-[11px] text-blue-400 font-mono flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3" /> GenAI Leader Certified
                </p>
              </div>
            </div>
            <ul className="text-xs space-y-1.5 text-[var(--text-secondary)] list-disc pl-4">
              <li>Certified in Enterprise Generative AI strategy and Vertex AI architecture.</li>
              <li>Foundation model selection (Gemini, PaLM), RAG, and AI safety governance.</li>
              <li>Series ID: 78167 • Active through Sep 2029.</li>
            </ul>
          </div>
          <button
            onClick={() => onOpenCertificate && onOpenCertificate()}
            className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Certificate
          </button>
        </div>

      </div>

      {/* Engineering Philosophy Cards */}
      <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
        <h3 className="font-mono font-bold text-[var(--text-primary)] text-sm uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          Engineering Principles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-cyan-400 font-bold">01. Type-Safety</span>
            <p className="text-[var(--text-muted)] text-[11px] font-sans">Strict TypeScript, Rust, and Go static typing to prevent runtime bugs.</p>
          </div>
          <div className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-cyan-400 font-bold">02. Microsecond Latency</span>
            <p className="text-[var(--text-muted)] text-[11px] font-sans">Non-blocking async WebSockets & zero-copy buffer processing.</p>
          </div>
          <div className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-cyan-400 font-bold">03. Deterministic AI</span>
            <p className="text-[var(--text-muted)] text-[11px] font-sans">Rigorous evaluation harnesses & sandboxes for reliable LLM code gen.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
