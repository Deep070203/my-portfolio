import { useState } from 'react';
import { X, ExternalLink, Play, Layers, Code, Zap, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import KalshiBotModal from './KalshiBotModal';
import MagnetoSandbox from './MagnetoSandbox';
import AutoHarnessSandbox from './AutoHarnessSandbox';

export default function ProjectDetailModal({ projectId, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!projectId) return null;

  const projectMap = {
    kalshi: {
      title: 'Kalshi BTC Hourly Arbitrage Bot',
      subtitle: 'High-Frequency Async WebSockets Arbitrage Engine in Rust',
      category: 'Quant & Finance',
      status: 'Live Active',
      statusColor: 'emerald',
      github: 'https://github.com/Deep070203/kalshi-btc-bot',
      description: 'An automated high-frequency arbitrage trading system built in Rust that targets Kalshi hourly and 15-minute Bitcoin event contract prediction markets. Leverages Tokio async runtime and WebSockets for sub-millisecond orderbook parsing and cross-exchange price hedging.',
      architecture: [
        'Sub-millisecond orderbook processing with Tokio async & WebSockets',
        'Cross-exchange hedging against Binance & Coinbase BTC spot/futures orderbooks',
        'Deterministic risk control algorithms with automated stop-loss boundaries',
        'Strict Kalshi API ticker formatting (YYMMMddHHmm-Tstrike)'
      ],
      tags: ['Rust', 'Tokio', 'WebSockets', 'Kalshi API', 'Binance API', 'HFT Arbitrage'],
      hasSandbox: true,
      sandboxType: 'kalshi'
    },
    magneto: {
      title: 'Magneto.ai — Options Exposure Engine',
      subtitle: 'Real-Time NetGEX & NetVEX Analytics Engine in Go',
      category: 'Quant & Finance',
      status: 'Production',
      statusColor: 'cyan',
      github: 'https://github.com/Deep070203/magneto-gex-engine',
      description: 'A quantitative market analytics platform that computes real-time Gamma Exposure (NetGEX) and Vanna Exposure (NetVEX) profiles across US equity options chains (SPY, NVDA, QQQ). Helps spot key market maker hedging inflection levels and dark pool liquidity prints.',
      architecture: [
        'Concurrent Go routines solving Black-Scholes partial differential equations in real-time',
        'NetGEX & NetVEX calculations across strike prices to identify zero-gamma flip points',
        'Dark pool trade print ingestion & volume profile visualization',
        'REST & WebSocket streaming endpoints for algorithmic trading consumers'
      ],
      tags: ['Go', 'Black-Scholes', 'Gamma Exposure (GEX)', 'Vanna Exposure (VEX)', 'Dark Pools'],
      hasSandbox: true,
      sandboxType: 'magneto'
    },
    autoharness: {
      title: 'AutoHarness.ai — Autonomous Code Harness',
      subtitle: 'Self-Healing LLM Test Execution Framework in TypeScript',
      category: 'AI & Automation',
      status: 'Open Source',
      statusColor: 'purple',
      github: 'https://github.com/Deep070203/autoharness-ai',
      description: 'An autonomous software development agent harness that isolates repositories in containerized Docker environments, runs test suites, parses AST call graphs, catches failures, and executes iterative LLM tool loops until full test passing is verified.',
      architecture: [
        'Isolated Docker container execution for safe untrusted LLM code evaluation',
        'AST syntax tree parsing (TypeScript & Babel) for surgical code edits',
        'Multi-stage tool calling loop (Read, Search, Edit, Test, Verify)',
        'Human-in-the-loop CLI approval gate with deterministic rollback'
      ],
      tags: ['TypeScript', 'Node.js', 'LLM Agents', 'Docker', 'AST Parsing', 'FastMCP'],
      hasSandbox: true,
      sandboxType: 'autoharness'
    },
    'ups-tracking': {
      title: 'UPS Enterprise Package Tracking Service',
      subtitle: 'Distributed Event-Driven Microservice Architecture',
      category: 'Systems & Microservices',
      status: 'Enterprise Prod',
      statusColor: 'blue',
      github: 'https://github.com/Deep070203',
      description: 'High-throughput enterprise microservices powering UPS global package status ingestion and auditing workflows handling over 5 million daily scan events with P99 latency SLA under 20ms.',
      architecture: [
        'Asynchronous Kafka event pipelines for multi-region event streaming',
        'Spring Boot microservice architecture with multi-tier Redis caching',
        'Kubernetes Helm chart deployments with automated horizontal pod autoscaling',
        'Active-active failover database replication with Zero-Downtime deployment'
      ],
      tags: ['Java', 'Spring Boot', 'Apache Kafka', 'Redis', 'Kubernetes', 'Docker'],
      hasSandbox: false
    },
    'options-quant-backtester': {
      title: 'Rust Options Strategy Backtester',
      subtitle: 'Multi-Leg Tick-Level Options Simulation Engine',
      category: 'Quant & Finance',
      status: 'Open Source',
      statusColor: 'emerald',
      github: 'https://github.com/Deep070203',
      description: 'Ultra-fast event-driven backtesting engine written in Rust that simulates 10 years of tick-by-tick multi-leg options data (Iron Condors, Vertical Spreads) in under 3 seconds using parallel data processing.',
      architecture: [
        'Rayon multi-threaded parallel execution across historical option chains',
        'Black-Scholes implied volatility interpolation & Greeks calculation',
        'Monte Carlo risk metric generation (Sharpe, Sortino, Max Drawdown)',
        'Zero-copy memory mapped file (mmap) historical tick data ingestion'
      ],
      tags: ['Rust', 'Rayon', 'Monte Carlo', 'Backtesting', 'Options Pricing'],
      hasSandbox: false
    },
    'openhands-pi-acp': {
      title: 'Open-Source Contributor @ OpenHands',
      subtitle: 'Adding Pi Coding Agent ACP Support in OpenHands',
      category: 'AI & Automation',
      status: 'OSS Contribution',
      statusColor: 'purple',
      github: 'https://github.com/OpenHands/software-agent-sdk/pull/4419',
      description: 'Working on adding Pi Coding Agent ACP support in OpenHands using Python and ACP protocol.',
      architecture: [
        'Opened pull request #4419 to add Pi ACP support in OpenHands/software-agent-sdk repo',
        'Integration of Pi coding agent with OpenHands/OpenHands core repository',
        'Python protocol adapters for Agent Control Protocol (ACP)',
        'Comprehensive agent capabilities and tools testing'
      ],
      tags: ['Python', 'Pi', 'Pi-ACP', 'OpenHands', 'ACP Protocol'],
      hasSandbox: false
    },
    'assess-pr-review': {
      title: 'Assess — AI-Native PR Review Engine',
      subtitle: 'Automated Pull Request Code Review & Security Analysis Platform',
      category: 'AI & Automation',
      status: 'Open Source',
      statusColor: 'purple',
      github: 'https://github.com/Deep070203/Assess',
      description: 'An AI-native code review platform built with Next.js App Router, Gemini API, and Prisma. Dynamically fetches raw GitHub PR diffs, evaluates code quality, pinpoints security vulnerabilities, and generates structured file-level code review feedback.',
      architecture: [
        'Dynamic GitHub PR diff fetcher and diff parser for modified code blocks',
        'Gemini LLM prompt pipelines for high-signal architectural & security reviews',
        'PostgreSQL & Prisma Caching layer (`assessmentCache`) for fast repeat diff retrieval',
        'Next.js Server Actions & Tailwind CSS dashboard user interface'
      ],
      tags: ['Next.js', 'TypeScript', 'Gemini AI', 'Prisma', 'PostgreSQL', 'GitHub API'],
      hasSandbox: false
    }
  };

  const project = projectMap[projectId] || projectMap['kalshi'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl space-y-6 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[var(--accent-cyan)] font-semibold">
              {project.category}
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {project.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-primary)]">
            {project.title}
          </h2>
          <p className="text-sm font-mono text-[var(--text-secondary)]">
            {project.subtitle}
          </p>
        </div>

        {/* View Selection Tabs (if sandbox available) */}
        {project.hasSandbox && (
          <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 text-xs font-mono rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[var(--accent-cyan)] text-slate-950 font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              System Specs
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-1.5 text-xs font-mono rounded-md transition-colors inline-flex items-center gap-1.5 ${
                activeTab === 'sandbox'
                  ? 'bg-[var(--accent-cyan)] text-slate-950 font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              Live Interactive Sandbox
            </button>
          </div>
        )}

        {/* Content View */}
        {activeTab === 'overview' || !project.hasSandbox ? (
          <div className="space-y-6">
            
            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">
                Overview & Purpose
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-3">
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Technical Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((item, idx) => (
                  <div key={idx} className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-xs text-[var(--text-secondary)] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Badges */}
            <div className="space-y-2">
              <h3 className="font-mono font-bold text-xs text-[var(--text-muted)] uppercase tracking-wider">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded bg-[var(--bg-page)] text-[var(--text-primary)] border border-[var(--border-color)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)]">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                View Code on GitHub
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>

              {project.hasSandbox && (
                <button
                  onClick={() => setActiveTab('sandbox')}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold rounded bg-[var(--accent-cyan)] text-slate-950 hover:bg-cyan-300 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Launch Live Sandbox Demo
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Interactive Sandbox View */
          <div className="space-y-4 pt-2">
            {project.sandboxType === 'kalshi' && (
              <KalshiBotModal isOpen={true} onClose={onClose} initialBotId="trade_btc_15m_cross_arb" />
            )}
            {project.sandboxType === 'magneto' && (
              <MagnetoSandbox />
            )}
            {project.sandboxType === 'autoharness' && (
              <AutoHarnessSandbox />
            )}
          </div>
        )}

      </div>
    </div>
  );
}
