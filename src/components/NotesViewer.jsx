import React from 'react';
import { Copy, Share2, Calendar, Tag, FileText, Check, ExternalLink } from 'lucide-react';
import MagnetoNote from './MagnetoNote';
import AutoHarnessNote from './AutoHarnessNote';
import ContactSection from './ContactSection';

export default function NotesViewer({ note, onCopyNote }) {
  const [copied, setCopied] = React.useState(false);

  if (!note) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${note.title}\n\n${note.snippet}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#121214] p-6 sm:p-10 select-text font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Note Breadcrumb & Toolbar Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>Notes</span>
            <span>/</span>
            <span className="text-zinc-300 font-semibold">{note.category}</span>
            <span>/</span>
            <span className="text-sky-400">{note.filename}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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
            <div className="space-y-4">
              <blockquote>
                <strong>Kalshi BTC Event Contract Arbitrage Bot</strong> (July 2026) — High-frequency automated event contract arbitrage runner written in <strong>Rust</strong> for Kalshi Bitcoin hourly markets.
              </blockquote>

              <h2>System Highlights</h2>
              <ul>
                <li><strong>Rust &amp; Tokio Runtime</strong>: Built on async Tokio runtime listening to real-time WebSocket order books with sub-millisecond execution.</li>
                <li><strong>Cross-Market Arbitrage</strong>: Calculates real-time spread imbalances between hourly BTC event contracts and spot feeds.</li>
                <li><strong>Zero-Drift State Tracking</strong>: Automated trade logging and position tracking for 24/7 continuous cloud execution.</li>
              </ul>
            </div>
          )}

          {/* Note 6: Experience.md */}
          {note.id === 'experience' && (
            <div className="space-y-6">
              <h2>Work Experience</h2>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-sky-400 font-bold text-sm">Software Development Engineer II</span>
                  <span>May 2026 – Present</span>
                </div>
                <div className="text-xs font-semibold text-zinc-200">United Parcel Service (UPS) • Parsippany, NJ</div>
                <ul className="text-xs text-zinc-400 space-y-1 pt-1 pl-4 list-disc">
                  <li>Design, develop, and maintain 15+ sales hierarchy, customer, and alignment databases supporting enterprise sales planning operations.</li>
                  <li>Support ESP and ESTAT applications used by 150+ Sales Representatives and Customers.</li>
                  <li>Automate monthly ESTAT-to-ESP data transfer process on Linux servers using workflow automation.</li>
                  <li>Prototype and deliver AI-driven solutions using GitHub Copilot to optimize sales operations.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-sky-400 font-bold text-sm">Software Development Engineer I</span>
                  <span>July 2025 – April 2026</span>
                </div>
                <div className="text-xs font-semibold text-zinc-200">United Parcel Service (UPS) • Parsippany, NJ</div>
                <ul className="text-xs text-zinc-400 space-y-1 pt-1 pl-4 list-disc">
                  <li>Maintained distributed microservices ecosystem (60+ services) enabling real-time package visibility for 1.5M+ daily customers.</li>
                  <li>Architected high-throughput backend systems using Java, AMQ, IBM MQ, and Couchbase processing billions of requests.</li>
                  <li>Led service migration from on-prem/Jenkins to Azure DevOps Cloud, mentoring 3 engineers.</li>
                </ul>
              </div>

              <h2>Education</h2>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-violet-400 font-bold text-sm">Master of Information and Data Science (MIDS)</span>
                  <span>May 2026 – Dec 2027</span>
                </div>
                <div className="text-xs font-semibold text-zinc-200">University of California, Berkeley • Berkeley, CA</div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-amber-400 font-bold text-sm">B.S. Computer Science &amp; Mathematics (Summa Cum Laude)</span>
                  <span>Sep 2021 – May 2025</span>
                </div>
                <div className="text-xs font-semibold text-zinc-200">Rutgers University - New Brunswick • 3.86 / 4.00 GPA</div>
              </div>
            </div>
          )}

          {/* Note 7: Skills.md */}
          {note.id === 'skills' && (
            <div className="space-y-4">
              <h2>Technical Skills Checklist</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <h3 className="text-xs font-mono font-bold text-sky-400 uppercase">Languages &amp; Core</h3>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li>✓ Go (Golang) — Concurrent quantitative engines</li>
                    <li>✓ TypeScript / JavaScript — React, Node.js, Vercel AI</li>
                    <li>✓ Python — AI/ML, fine-tuning, data science</li>
                    <li>✓ Java &amp; C# / .NET — Distributed enterprise services</li>
                    <li>✓ Rust — High-frequency trading runners</li>
                    <li>✓ SQL / PL-SQL — Enterprise database queries</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                  <h3 className="text-xs font-mono font-bold text-violet-400 uppercase">AI, Data &amp; Cloud</h3>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li>✓ Vercel AI SDK &amp; Tool-Calling Loops</li>
                    <li>✓ Black-Scholes GEX/VEX Quantitative Analytics</li>
                    <li>✓ Kafka, Spark, Databricks, Postgres, Couchbase</li>
                    <li>✓ Docker, Azure DevOps, AWS, GCP</li>
                    <li>✓ IBM MQ, AMQ, Gorilla WebSockets</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Note 8: Contact.md */}
          {note.id === 'contact' && <ContactSection />}

        </div>

      </div>
    </main>
  );
}
