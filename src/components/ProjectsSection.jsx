import React from 'react';
import { ExternalLink, ShieldAlert, Cpu, LineChart, Code2, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsSection({ onOpenMagnetoModal }) {
  const projects = [
    {
      id: 'autoharness',
      title: 'AutoHarness – Autonomous GitHub Contributor',
      date: 'April 2026',
      badge: 'Autonomous AI Agent',
      badgeColor: 'bg-violet-950/80 text-violet-300 border-violet-800/80',
      description:
        'Designed a 13-stage autonomous pipeline to source bug candidates, run viability LLM filters, and auto-submit PRs. Implemented a tool-calling agent loop in TypeScript using Vercel AI SDK and Docker containers to clone repositories, execute surgical code edits, and run test suites to verify fixes.',
      bulletPoints: [
        'Built CLI Human-in-the-Loop (HITL) approval gate and state tracking using GitHub Issue markdown checkboxes',
        'Automated GitHub API workflows (Octokit, simple-git) for PR style-matching, fork management, and PR creation',
        'Executed surgical code edits verified against test suites inside isolated Docker sandboxes'
      ],
      techStack: ['TypeScript', 'Vercel AI SDK', 'Octokit', 'Git', 'Docker', 'CLI'],
      github: 'https://github.com/Deep070203',
      demoAnchor: '#demos',
      isPrivate: false
    },
    {
      id: 'magneto',
      title: 'Magneto.ai – Real-Time Quantitative Options Exposure Engine',
      date: 'June 2026',
      badge: 'Quant Financial Engine',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80',
      description:
        'Engineered a high-performance quantitative analytics engine in Go to calculate real-time Net NetGEX (Gamma Exposure) and NetVEX (Vanna Exposure) strike-expiry grids using Black-Scholes models, identifying dealer hedging flows and market magnetic price zones.',
      bulletPoints: [
        'Architected a concurrent real-time data & trade reconstruction pipeline utilizing Gorilla WebSockets and Tradier API feeds',
        'Streams options data, tracks implied volatility skew, classifies institutional dark pool trades, and reconciles daily Open Interest changes',
        'Private enterprise architecture with authorized screenshot gallery preview & live math sandbox'
      ],
      techStack: ['Go (Golang)', 'TypeScript', 'SQL', 'HTML/CSS', 'Gorilla WebSockets', 'Tradier API', 'Black-Scholes'],
      github: null,
      demoAnchor: '#demos',
      isPrivate: true,
      onScreenshotClick: onOpenMagnetoModal
    },
    {
      id: 'rwjms',
      title: 'AI & Healthcare Bias Simulation Platform (RWJMS Research)',
      date: 'June 2025 – April 2026',
      badge: 'AI / Healthcare LLM',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
      description:
        'Collaborated with medical researchers and developers to build a web-based AI roleplay simulation platform designed to help medical students reflect on and identify implicit biases in clinical decision-making.',
      bulletPoints: [
        'Conducted research on LLM fine-tuning, transfer-learning, prompt engineering, and bias detection',
        'Supported realistic and ethically guided roleplay interactions between students and AI-simulated patients',
        'Assisted in developing custom conversational agents that respond dynamically to user decisions with reflective guidance'
      ],
      techStack: ['Python', 'LLM Fine-Tuning', 'Prompt Engineering', 'React', 'Node.js', 'Bias Detection'],
      github: 'https://github.com/Deep070203',
      demoAnchor: null,
      isPrivate: false
    },
    {
      id: 'kalshi',
      title: 'Kalshi BTC Event Contract Arbitrage Bot',
      date: 'July 2026',
      badge: 'Rust HFT Trading',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800/80',
      description:
        'High-frequency automated event contract arbitrage runner in Rust for Kalshi Bitcoin hourly markets. Listens to real-time order books, computes cross-market spreads, and executes trades with microsecond precision.',
      bulletPoints: [
        'Built async concurrency runtime using Tokio and WebSocket order book streaming feeds',
        'Calculates real-time arbitrage spreads and logs trade execution with zero-drift state tracking',
        'Designed for 24/7 continuous cloud deployment'
      ],
      techStack: ['Rust', 'Tokio', 'WebSockets', 'Kalshi API', 'Financial Analytics', 'Serde'],
      github: 'https://github.com/Deep070203',
      demoAnchor: null,
      isPrivate: false
    }
  ];

  return (
    <section id="projects" className="py-20 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Code2 className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            AI Agents, Quant Engines &amp; Systems
          </h2>
          <p className="text-base text-slate-400">
            Selected projects demonstrating autonomous agent tool-calling loops, quantitative Black-Scholes options exposure analytics, and high-throughput microservices.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                
                {/* Top Badge & Date Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${project.badgeColor}`}>
                    {project.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{project.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  {project.bulletPoints.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Tech Stack & Links */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
                
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between pt-2">
                  {project.isPrivate ? (
                    <button
                      onClick={project.onScreenshotClick}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono hover:bg-cyan-900/80 transition-all"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      <span>Private Repo • View Screenshots</span>
                    </button>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View GitHub Source</span>
                    </a>

                  )}

                  {project.demoAnchor && (
                    <a
                      href={project.demoAnchor}
                      className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Try Interactive Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
