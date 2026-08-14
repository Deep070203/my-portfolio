import React from 'react';
import { ArrowUpRight, Zap, Bot, TrendingUp, ShieldCheck, Mail, User, Layers } from 'lucide-react';

export default function HomeView({ setActiveTab, onOpenProjectModal }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      
      {/* Hero Intro Header (caweidmann style) */}
      <section className="space-y-6">

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
          Hi, I'm Deep <span className="text-[var(--accent-cyan)] font-sans">👋</span>
        </h1>

        {/* Headline */}
        <h2 className="text-xl sm:text-2xl text-[var(--text-secondary)] font-sans font-normal leading-relaxed max-w-3xl">
          Software Engineer specializing in <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--accent-cyan)] decoration-2 underline-offset-4">High-Throughput Microservices</span>, <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--accent-cyan)] decoration-2 underline-offset-4">Autonomous AI Agents</span>, and <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--accent-cyan)] decoration-2 underline-offset-4">Options Exposure Analytics</span>.
        </h2>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm font-semibold bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--accent-cyan)] hover:text-slate-950 transition-colors shadow-md"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm font-medium border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:bg-[var(--bg-surface)] transition-all"
          >
            <User className="w-4 h-4 text-cyan-400" />
            About me
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors group"
          >
            View Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* PS Highlight Note (caweidmann.dev style) */}
        <div className="pt-4 text-sm font-mono text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-color)]">
          <span className="font-bold text-[var(--accent-cyan)]">PS:</span> I built{' '}
          <button
            onClick={() => onOpenProjectModal('magneto')}
            className="text-[var(--text-primary)] font-semibold hover:text-[var(--accent-cyan)] hover:underline decoration-cyan-400 inline-flex items-center gap-1"
          >
            Magneto.ai
            <ArrowUpRight className="w-3 h-3 text-cyan-400" />
          </button>{' '}
          (Real-time Go GEX/VEX engine),{' '}
          <button
            onClick={() => onOpenProjectModal('kalshi')}
            className="text-[var(--text-primary)] font-semibold hover:text-[var(--accent-cyan)] hover:underline decoration-cyan-400 inline-flex items-center gap-1"
          >
            Kalshi Bot
            <ArrowUpRight className="w-3 h-3 text-cyan-400" />
          </button>{' '}
          (Rust HFT arbitrage runner), and{' '}
          <button
            onClick={() => onOpenProjectModal('autoharness')}
            className="text-[var(--text-primary)] font-semibold hover:text-[var(--accent-cyan)] hover:underline decoration-cyan-400 inline-flex items-center gap-1"
          >
            AutoHarness.ai
            <ArrowUpRight className="w-3 h-3 text-cyan-400" />
          </button>{' '}
          (Autonomous LLM test runner).
        </div>
      </section>

      {/* Core Expertise Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Core Focus Areas
          </h3>
          <button
            onClick={() => setActiveTab('skills')}
            className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            Explore Technical Matrix →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1 */}
          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)]/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-mono font-semibold text-[var(--text-primary)] text-base">
              High-Scale Microservices
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Designed enterprise Java & Go microservices at UPS handling multi-million event flows with Spring Boot, Kafka, and Kubernetes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)]/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-mono font-semibold text-[var(--text-primary)] text-base">
              Quant & Financial Systems
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Engineered low-latency options exposure models (NetGEX/NetVEX), Black-Scholes solvers, and automated Rust WebSockets arbitrage bots.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)]/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-mono font-semibold text-[var(--text-primary)] text-base">
              Autonomous AI Systems
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Developing LLM evaluation harnesses, multi-agent orchestrators, and automated self-healing software testing agents.
            </p>
          </div>

        </div>
      </section>

      {/* Snapshot Career Summary */}
      <section className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Current Role & Education</span>
          <h4 className="text-base font-mono font-semibold text-[var(--text-primary)]">
            Software Development Engineer II @ UPS • MIDS Candidate @ UC Berkeley
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            B.S. Computer Science from Rutgers University (Summa Cum Laude, GPA 3.96/4.0)
          </p>
        </div>
        <button
          onClick={() => setActiveTab('resume')}
          className="shrink-0 px-4 py-2 text-xs font-mono font-medium rounded-md border border-[var(--border-color)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-colors"
        >
          View Resume →
        </button>
      </section>

    </div>
  );
}
