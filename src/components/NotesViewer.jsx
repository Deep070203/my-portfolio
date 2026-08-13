import React, { useState } from 'react';
import { Copy, Share2, Calendar, Tag, FileText, Check, ExternalLink, Terminal, Menu } from 'lucide-react';
import MagnetoNote from './MagnetoNote';
import AutoHarnessNote from './AutoHarnessNote';
import ContactSection from './ContactSection';
import KalshiBotModal from './KalshiBotModal';
import { KALSHI_BOTS } from '../data/kalshiBotsData';

export default function NotesViewer({ note, onCopyNote, onToggleSidebar }) {
  const [copied, setCopied] = useState(false);
  const [isKalshiModalOpen, setIsKalshiModalOpen] = useState(false);
  const [selectedKalshiBotId, setSelectedKalshiBotId] = useState('trade_btc_15m_cross_arb');

  if (!note) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${note.title}\n\n${note.snippet}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#0D0D0D] p-4 sm:p-8 md:p-10 select-text font-sans w-full">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Note Breadcrumb & Toolbar Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-1.5 rounded-lg bg-[#18181c] border border-white/10 text-zinc-200 hover:text-[#00FF85] hover:border-[#00FF85]/50 transition-all flex items-center gap-1.5 mr-1"
              title="Toggle Notes Sidebar"
            >
              <Menu className="w-4 h-4 text-[#00FF85]" />
              <span className="font-bold">Notes</span>
            </button>

            <span className="hidden md:inline">Notes</span>
            <span className="hidden md:inline">/</span>
            <span className="text-white font-semibold">{note.category}</span>
            <span>/</span>
            <span className="text-[#00FF85] font-bold">{note.filename}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 px-3 rounded-lg bg-[#18181c] hover:bg-[#FF0099]/10 border border-white/10 hover:border-[#FF0099]/50 text-zinc-300 hover:text-[#FF0099] text-xs font-mono transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00FF85]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Note Title & Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{note.icon}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
              {note.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              Created {note.date}
            </span>

            <div className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-zinc-500" />
              {note.tags.map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Note Content Render */}
        <div className="markdown-body pt-2 space-y-6">
          
          {/* Note 1: README.md */}
          {note.id === 'readme' && (
            <div className="space-y-4">
              <blockquote>
                Software Engineer interested in <strong>Autonomous AI Agents</strong>, <strong>Quantitative Options Analytics</strong>, and <strong>High-Throughput Microservices</strong>.
              </blockquote>

              <h2>Executive Bio</h2>
              <p>
                Hi, I’m <strong>Deep Shah</strong>. I am currently a <strong>Software Development Engineer II at UPS</strong> in Parsippany, NJ, and pursuing an <strong>M.S. in Information and Data Science at the University of California, Berkeley</strong>. I graduated <strong>Summa Cum Laude</strong> from <strong>Rutgers University - New Brunswick</strong> with a B.S. in Computer Science and Mathematics (3.86 GPA).
              </p>

              <h2>Key Technical Metrics</h2>
              <ul>
                <li><strong>1.5M+ Daily Users</strong>: Maintained distributed microservices ecosystem (60+ services) at UPS for real-time package tracking visibility.</li>
                <li><strong>13-Stage Agent Loop</strong>: Engineered AutoHarness, an autonomous GitHub PR contributor using Vercel AI SDK and Docker tool-calling loops.</li>
                <li><strong>GEX/VEX Options Analytics</strong>: Built Magneto.ai in Go to calculate Black-Scholes strike-expiry grids and classify dark pool trades.</li>
                <li><strong>Summa Cum Laude</strong>: 3.86/4.00 GPA at Rutgers University in Computer Science &amp; Mathematics.</li>
              </ul>

              <h2>Opensource Contribution and Interests</h2>
              <p>
                I am an active contributor to several open-source projects, focusing on areas such as <strong>Autonomous Agents</strong>, and <strong>AI Security</strong>. Here are some of my PRs:
              </p>
              <ul>
                <li>
                  <a href="https://github.com/OpenHands/software-agent-sdk" target="_blank" rel="noopener noreferrer">
                    <strong>OpenHands - Software Agent Sdk</strong>
                  </a>
                  - register Pi as buil-in ACP Provider
                  <a href="https://github.com/OpenHands/software-agent-sdk/pull/4419" target="_blank" rel="noopener noreferrer"><u>(4419)</u></a>
                </li>
                <li>
                  <a href="https://github.com/prowler-cloud/prowler" target="_blank" rel="noopener noreferrer">
                    <strong>Prowler Cloud</strong>
                  </a>
                  - Add AWS Amplify App secrets 
                  <a href="https://github.com/prowler-cloud/prowler/pull/11825" target="_blank" rel="noopener noreferrer"><u>(11825)</u></a>
                </li>
                <li>
                  <a href="https://github.com/OpenHands/OpenHands" target="_blank" rel="noopener noreferrer">
                    <strong>OpenHands</strong>
                  </a>
                  - Add support for Pi as ACP agent 
                  <a href="https://github.com/OpenHands/OpenHands/pull/16229" target="_blank" rel="noopener noreferrer"><u>(16229)</u></a>
                </li>
                <li>
                  <a href="https://github.com/future-agi/future-agi" target="_blank" rel="noopener noreferrer">
                    <strong>Future AGI</strong>
                  </a>
                  - Add multi-select and bulk-delete to scenarios table 
                  <a href="https://github.com/future-agi/future-agi/pull/1640" target="_blank" rel="noopener noreferrer"><u>(1640)</u></a>
                </li>
              </ul>

              <h2>Quick Links &amp; Navigation</h2>
              <p>
                Select notes from the sidebar to inspect detailed project architecture, live screenshots, and interactive test generators:
              </p>
              <ul>
                <li><code>Kalshi_Arbitrage.md</code> — High-Frequency Rust Event Contract Arbitrage Runner &amp; Live Stream Showcase</li>
                <li><code>Magneto.ai</code> — Quantitative Options Exposure Engine screenshots &amp; metric cards</li>
                <li><code>AutoHarness.md</code> — Autonomous Agent &amp; Live Issue-to-PR Generator</li>
                <li><code>Experience.md</code> — Career timeline at UPS &amp; RWJMS AI Research</li>
                <li><code>Contact.md</code> — Send a direct message or download resume</li>
              </ul>
            </div>
          )}

          {/* Note 2: Magneto.ai */}
          {note.id === 'magneto' && <MagnetoNote />}

          {/* Note 3: AutoHarness.md */}
          {note.id === 'autoharness' && <AutoHarnessNote />}

          {/* Note 4: RWJMS_Research.md */}
          {note.id === 'rwjms' && (
            <div className="space-y-4">
              <blockquote>
                <strong>AI &amp; Healthcare Bias RWJMS Research</strong> (June 2025 – April 2026) — Web-based AI roleplay simulation platform designed to help medical students reflect on and identify implicit biases in clinical decision-making.
              </blockquote>

              <h2>Research &amp; Engineering Highlights</h2>
              <ul>
                <li><strong>LLM Fine-Tuning &amp; Transfer Learning</strong>: Fine-tuned open-source models for realistic patient simulation and ethical decision-making guidance.</li>
                <li><strong>Prompt Engineering &amp; Bias Detection</strong>: Built custom prompt filters to identify implicit bias markers in student clinical notes and conversational choices.</li>
                <li><strong>Conversational Agents</strong>: Developed conversational agents that respond dynamically to student input with reflective guidance rather than judgment.</li>
              </ul>
            </div>
          )}

          {/* Note 5: Kalshi_Arbitrage.md */}
          {note.id === 'kalshi' && (
            <div className="space-y-6">
              <blockquote>
                <strong>Kalshi BTC Event Contract Arbitrage Bot Engine</strong> — High-frequency automated event contract arbitrage runner written in <strong>Rust</strong>. Listens to real-time order books, computes cross-market spreads, and executes trades with microsecond precision.
              </blockquote>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/30">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <span>⚡ Live Interactive Strategy Showcase</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-800">5 Rust Binaries</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Inspect source code &amp; watch live public WebSocket market feeds running dry-run executions for all 5 trading bots.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedKalshiBotId('trade_btc_15m_cross_arb');
                    setIsKalshiModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Run Bot Showcase</span>
                </button>
              </div>

              <h2>Algorithms &amp; System Binaries</h2>
              <div className="grid grid-cols-1 gap-4">
                {KALSHI_BOTS.map((bot) => (
                  <div
                    key={bot.id}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedKalshiBotId(bot.id);
                      setIsKalshiModalOpen(true);
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-amber-400 font-bold group-hover:text-amber-300">
                          {bot.fileName}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${bot.badgeColor}`}>
                          {bot.badge}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1">
                        Inspect &amp; Stream →
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                      {bot.summary}
                    </p>

                    <ul className="text-[11px] font-mono text-zinc-400 space-y-1 pl-3 list-disc border-t border-zinc-800/80 pt-2">
                      {bot.keyHighlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h2>System Architecture &amp; Security</h2>
              <ul>
                <li><strong>Rust &amp; Tokio Runtime</strong>: Built on async Tokio runtime listening to real-time WebSocket order books with sub-millisecond execution.</li>
                <li><strong>Cross-Market Arbitrage</strong>: Calculates real-time spread imbalances between Kalshi and Polymarket BTC event contracts.</li>
                <li><strong>Safe Public API Integration</strong>: Demonstrates live market data feeds over public read-only WebSocket channels without key exposure.</li>
              </ul>
            </div>
          )}

          {/* Note 6: Experience.md */}
          {note.id === 'experience' && (
            <div className="space-y-6">
              <h2>Work Experience</h2>

              <div className="p-4 rounded-xl bg-[#141416] border border-white/10 space-y-2 hover:border-[#00FF85]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
                  <span className="text-[#00FF85] font-bold text-sm">Software Development Engineer II</span>
                  <span>May 2026 – Present</span>
                </div>
                <div className="text-xs font-semibold text-white">United Parcel Service (UPS) • Parsippany, NJ</div>
                <ul className="text-xs text-zinc-300 space-y-1 pt-1 pl-4 list-disc">
                  <li>Design, develop, and maintain 15+ sales hierarchy, customer, and alignment databases supporting enterprise sales planning operations.</li>
                  <li>Support ESP and ESTAT applications used by 150+ Sales Representatives and Customers.</li>
                  <li>Automate monthly ESTAT-to-ESP data transfer process on Linux servers using workflow automation.</li>
                  <li>Prototype and deliver AI-driven solutions using GitHub Copilot to optimize sales operations.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#141416] border border-white/10 space-y-2 hover:border-[#1E90FF]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
                  <span className="text-[#1E90FF] font-bold text-sm">Software Development Engineer I</span>
                  <span>July 2025 – April 2026</span>
                </div>
                <div className="text-xs font-semibold text-white">United Parcel Service (UPS) • Parsippany, NJ</div>
                <ul className="text-xs text-zinc-300 space-y-1 pt-1 pl-4 list-disc">
                  <li>Maintained distributed microservices ecosystem (60+ services) enabling real-time package visibility for 1.5M+ daily customers.</li>
                  <li>Architected high-throughput backend systems using Java, AMQ, IBM MQ, and Couchbase processing billions of requests.</li>
                  <li>Led service migration from on-prem/Jenkins to Azure DevOps Cloud, mentoring 3 engineers.</li>
                </ul>
              </div>

              <h2>Education</h2>

              <div className="p-4 rounded-xl bg-[#141416] border border-white/10 space-y-2 hover:border-[#FF0099]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
                  <span className="text-[#FF0099] font-bold text-sm">Master of Information and Data Science (MIDS)</span>
                  <span>May 2026 – Dec 2027</span>
                </div>
                <div className="text-xs font-semibold text-white">University of California, Berkeley • Berkeley, CA</div>
              </div>

              <div className="p-4 rounded-xl bg-[#141416] border border-white/10 space-y-2 hover:border-[#00FF85]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
                  <span className="text-[#00FF85] font-bold text-sm">B.S. Computer Science &amp; Mathematics (Summa Cum Laude)</span>
                  <span>Sep 2021 – May 2025</span>
                </div>
                <div className="text-xs font-semibold text-white">Rutgers University - New Brunswick • 3.86 / 4.00 GPA</div>
              </div>
            </div>
          )}

          {/* Note 7: Skills.md */}
          {note.id === 'skills' && (
            <div className="space-y-4">
              <h2>Technical Skills Checklist</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#141416] border border-white/10 space-y-2">
                  <h3 className="text-xs font-mono font-bold text-[#00FF85] uppercase">Languages &amp; Core</h3>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li><span className="text-[#00FF85]">✓</span> Go (Golang) — Concurrent quantitative engines</li>
                    <li><span className="text-[#00FF85]">✓</span> TypeScript / JavaScript — React, Node.js, Vercel AI</li>
                    <li><span className="text-[#00FF85]">✓</span> Python — AI/ML, fine-tuning, data science</li>
                    <li><span className="text-[#00FF85]">✓</span> Java &amp; C# / .NET — Distributed enterprise services</li>
                    <li><span className="text-[#00FF85]">✓</span> Rust — High-frequency trading runners</li>
                    <li><span className="text-[#00FF85]">✓</span> SQL / PL-SQL — Enterprise database queries</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#141416] border border-white/10 space-y-2">
                  <h3 className="text-xs font-mono font-bold text-[#1E90FF] uppercase">AI, Data &amp; Cloud</h3>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li><span className="text-[#1E90FF]">✓</span> Vercel AI SDK &amp; Tool-Calling Loops</li>
                    <li><span className="text-[#1E90FF]">✓</span> Black-Scholes GEX/VEX Quantitative Analytics</li>
                    <li><span className="text-[#1E90FF]">✓</span> Kafka, Spark, Databricks, Postgres, Couchbase</li>
                    <li><span className="text-[#1E90FF]">✓</span> Docker, Azure DevOps, AWS, GCP</li>
                    <li><span className="text-[#1E90FF]">✓</span> IBM MQ, AMQ, Gorilla WebSockets</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Note 8: Contact.md */}
          {note.id === 'contact' && <ContactSection />}

        </div>

      </div>

      {/* Kalshi Algorithmic Trading Showcase Modal */}
      <KalshiBotModal
        isOpen={isKalshiModalOpen}
        onClose={() => setIsKalshiModalOpen(false)}
        initialBotId={selectedKalshiBotId}
      />
    </main>
  );
}
