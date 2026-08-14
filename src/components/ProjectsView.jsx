import { useState } from 'react';
import { ExternalLink, Terminal, Zap, ArrowUpRight, Play, Eye, Filter, Code } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsView({ onOpenProjectModal }) {
  const [filterCategory, setFilterCategory] = useState('all');

  const projects = [
    {
      id: 'kalshi',
      title: 'Kalshi BTC Hourly Arbitrage Bot',
      category: 'quant',
      categoryLabel: 'Quant & Finance',
      status: 'Live Active',
      statusColor: 'emerald',
      description: 'High-frequency automated event contract arbitrage runner in Rust for Kalshi BTC hourly prediction markets.',
      details: 'Built with Tokio async runtime and WebSockets for sub-millisecond market data processing. Features automated order placement, cross-market hedging against Binance BTC futures, dynamic risk management, and live orderbook visualization.',
      tags: ['Rust', 'Tokio', 'WebSockets', 'Kalshi API', 'Arbitrage', 'HFT'],
      github: 'https://github.com/Deep070203/kalshi-btc-bot',
      hasInteractiveDemo: true,
      demoLabel: 'Launch Live Bot Runner'
    },
    {
      id: 'magneto',
      title: 'Magneto.ai — Options Exposure Engine',
      category: 'quant',
      categoryLabel: 'Quant & Finance',
      status: 'Production',
      statusColor: 'cyan',
      description: 'Real-time NetGEX & NetVEX quantitative analytics engine in Go with dark pool prints & SPY/NVDA live options calculations.',
      details: 'Computes real-time Gamma Exposure (GEX) and Vanna Exposure (VEX) profiles using Black-Scholes solvers. Monitors market maker positioning to detect key support/resistance inflection levels across US equity options.',
      tags: ['Go', 'Black-Scholes', 'GEX / VEX', 'Dark Pools', 'Financial Engineering'],
      github: 'https://github.com/Deep070203/magneto-gex-engine',
      hasInteractiveDemo: true,
      demoLabel: 'Open GEX Analytics Sandbox'
    },
    {
      id: 'autoharness',
      title: 'AutoHarness.ai — Autonomous Code Harness',
      category: 'ai',
      categoryLabel: 'AI & Automation',
      status: 'Open Source',
      statusColor: 'purple',
      description: 'Autonomous LLM code generation and self-healing test execution harness in TypeScript and Docker.',
      details: 'Runs AI coding workflows in isolated containers, automatically parsing AST syntax trees, running unit test suites, catching stack traces, and prompting LLM self-correction loops until all tests pass.',
      tags: ['TypeScript', 'Node.js', 'LLM Agents', 'Docker', 'AST Parsing'],
      github: 'https://github.com/Deep070203/autoharness-ai',
      hasInteractiveDemo: true,
      demoLabel: 'Launch Test Harness Sandbox'
    },
    {
      id: 'openhands-pi-acp',
      title: 'Open-Source Contributor @ OpenHands',
      category: 'ai',
      categoryLabel: 'AI & Automation',
      status: 'OSS Contribution',
      statusColor: 'purple',
      description: 'Working on adding Pi Coding Agent ACP support in OpenHands using Python and ACP protocol.',
      details: 'Opened pull requests to add Pi ACP support in OpenHands/OpenHands repo and OpenHands/software-agent-sdk repo.',
      tags: ['Python', 'Pi', 'Pi-ACP', 'OpenHands', 'ACP Protocol'],
      github: 'https://github.com/OpenHands/software-agent-sdk/pull/4419',
      hasInteractiveDemo: false
    },
    {
      id: 'ups-tracking',
      title: 'UPS Enterprise Package Tracking Service',
      category: 'systems',
      categoryLabel: 'Systems & Microservices',
      status: 'Enterprise Prod',
      statusColor: 'blue',
      description: 'High-throughput microservice handling 5M+ daily scan events for UPS enterprise parcel operations.',
      details: 'Architected with Java, Spring Boot, Kafka, and Redis caching. Deployed on Kubernetes clusters with zero-downtime rolling updates, sub-20ms P99 latency SLA, and active-active multi-region failover.',
      tags: ['Java', 'Spring Boot', 'Apache Kafka', 'Redis', 'Kubernetes', 'Docker'],
      github: 'https://github.com/Deep070203',
      hasInteractiveDemo: false
    },
    {
      id: 'assess-pr-review',
      title: 'Assess — AI-Native PR Review Engine',
      category: 'ai',
      categoryLabel: 'AI & Automation',
      status: 'Open Source',
      statusColor: 'purple',
      description: 'AI-native pull request code review platform analyzing GitHub PR diffs with Gemini LLM, Prisma caching, and Next.js.',
      details: 'Fetches raw GitHub PR diffs, parses changed file snippets, evaluates code quality, security vulnerabilities, and unhandled exception paths using Gemini API with PostgreSQL assessment caching.',
      tags: ['Next.js', 'TypeScript', 'Gemini AI', 'Prisma', 'PostgreSQL', 'GitHub API'],
      github: 'https://github.com/Deep070203/Assess',
      hasInteractiveDemo: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'quant', label: 'Quant & Finance' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'systems', label: 'Systems & Microservices' },
  ];

  const filteredProjects = filterCategory === 'all'
    ? projects
    : projects.filter(p => p.category === filterCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-[var(--border-color)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)]">
            Projects
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-sans mt-1">
            Production microservices, quantitative engines, and autonomous AI frameworks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1 bg-[var(--bg-surface)] p-1 rounded-lg border border-[var(--border-color)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                filterCategory === cat.id
                  ? 'bg-[var(--accent-cyan)] text-slate-950 font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)] transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-lg hover:shadow-cyan-500/5"
          >
            {/* Header / Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-cyan)]">
                  {project.categoryLabel}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${
                  project.statusColor === 'emerald'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : project.statusColor === 'cyan'
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    : project.statusColor === 'purple'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3
                onClick={() => onOpenProjectModal(project.id)}
                className="text-lg font-mono font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] cursor-pointer transition-colors flex items-center justify-between"
              >
                <span>{project.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 shrink-0" />
              </h3>

              {/* Description */}
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tags & Action Buttons */}
            <div className="space-y-4 pt-2 border-t border-[var(--border-color)]">
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-color)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                {project.hasInteractiveDemo ? (
                  <button
                    onClick={() => onOpenProjectModal(project.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded bg-[var(--accent-cyan)] text-slate-950 hover:bg-cyan-300 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    {project.demoLabel}
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenProjectModal(project.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] rounded hover:bg-[var(--bg-page)] transition-colors"
                  >
                    <Eye className="w-3 h-3 text-cyan-400" />
                    Inspect Details
                  </button>
                )}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)] transition-colors"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
