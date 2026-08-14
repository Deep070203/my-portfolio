import React from 'react';
import { Award, BookOpen, Briefcase, Code, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export default function AboutView({ setActiveTab }) {
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
          I'm Deep Shah, a Software Development Engineer II at UPS and Master of Information and Data Science (MIDS) candidate at UC Berkeley.
        </p>
        <p>
          My technical expertise spans <strong className="text-[var(--text-primary)] font-mono">high-throughput microservices architecture</strong>, <strong className="text-[var(--text-primary)] font-mono">quantitative options market analytics</strong>, and <strong className="text-[var(--text-primary)] font-mono">autonomous AI agent SDKs</strong>. At UPS, I engineer enterprise services powering package tracking and operational workflows, ensuring multi-million daily event resilience with Java, Spring Boot, Kafka, and Docker/Kubernetes.
        </p>
        <p>
          Outside of enterprise microservices, I build quantitative trading infrastructure in <strong className="text-[var(--text-primary)] font-mono">Go</strong> and <strong className="text-[var(--text-primary)] font-mono">Rust</strong>. Projects like <strong className="text-[var(--accent-cyan)] font-mono">Magneto.ai</strong> track real-time options NetGEX (Gamma Exposure) and NetVEX (Vanna Exposure) across SPY and NVDA with Black-Scholes solvers, while <strong className="text-[var(--accent-cyan)] font-mono">Kalshi Arbitrage Bot</strong> runs sub-millisecond event contract order book monitoring via WebSockets.
        </p>
      </div>

      {/* Quick Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Experience Box */}
        <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-[var(--text-primary)] text-base">UPS</h3>
              <p className="text-xs text-[var(--text-muted)] font-mono">Software Development Engineer II (2024 - Present)</p>
            </div>
          </div>
          <ul className="text-xs space-y-2 text-[var(--text-secondary)] list-disc pl-4">
            <li>Promoted from SDE I to SDE II in under 12 months for technical leadership.</li>
            <li>Architected event-driven microservices handling 5M+ daily messages with zero data loss.</li>
            <li>Optimized database queries and Redis caching layers, cutting P99 latency by 38%.</li>
          </ul>
        </div>

        {/* Education Box */}
        <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-[var(--text-primary)] text-base">UC Berkeley & Rutgers</h3>
              <p className="text-xs text-[var(--text-muted)] font-mono">MIDS @ UC Berkeley | B.S. CS @ Rutgers (3.96 GPA)</p>
            </div>
          </div>
          <ul className="text-xs space-y-2 text-[var(--text-secondary)] list-disc pl-4">
            <li>Graduated Rutgers Summa Cum Laude with 3.96/4.0 GPA.</li>
            <li>Specializing in Applied Machine Learning, Distributed Systems, and Natural Language Processing.</li>
            <li>Active open-source developer in AI agent harnesses and Rust quantitative tools.</li>
          </ul>
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
