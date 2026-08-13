import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Deep Shah CLI v2.4.0 [Type "help" for commands]' },
    { type: 'output', text: 'SDE II @ UPS | MIDS Candidate @ UC Berkeley | Summa Cum Laude @ Rutgers' }
  ]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'command', text: cmd }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:\n  help        - Show available commands\n  about       - Detailed biography & focus areas\n  skills      - Technical skills matrix\n  projects    - Overview of featured projects\n  magneto     - Deep dive into Magneto.ai (Go Options Engine)\n  autoharness - Deep dive into AutoHarness (13-Stage Agent)\n  experience  - Career timeline & metrics\n  contact     - Reach out / social links\n  sudo hire   - Unlock instant recruiter pass\n  clear       - Clear screen`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `DEEP SHAH — Parsippany, NJ\nSoftware Development Engineer II @ UPS & UC Berkeley MIDS Student\nSumma Cum Laude Graduate from Rutgers University (B.S. CS & Math, 3.86 GPA)\nSpecializing in Autonomous LLM Agents, Quantitative Financial Modeling, and High-Throughput Microservices.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Languages:       Go, Python, TypeScript, Java, Rust, C#, SQL, C++\nAI & Agents:     Vercel AI SDK, Prompt Engineering, LLM Fine-Tuning, Octokit, RAG\nQuant & Data:    Black-Scholes Models, GEX/VEX Analytics, Kafka, Databricks, Spark, Postgres\nBackend & Cloud: Spring Boot, Azure DevOps, AWS, Docker, Microservices (60+ services)`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. AutoHarness (April 2026): 13-stage autonomous PR pipeline using Vercel AI SDK & Docker tool-calling loop.\n2. Magneto.ai (June 2026): Concurrent real-time options GEX/VEX exposure quantitative engine in Go with WebSockets.\n3. RWJMS AI Platform: Conversational AI simulation for clinical implicit bias reflection.\n4. Kalshi BTC Arbitrage: Automated Rust event contract trading runner.`
        });
        break;

      case 'magneto':
        newHistory.push({
          type: 'output',
          text: `[Magneto.ai]\nEngineered quantitative analytics engine in Go to calculate real-time NetGEX & NetVEX strike-expiry grids using Black-Scholes models.\nIntegrated Gorilla WebSockets & Tradier API for dark pool trade classification & implied volatility skew tracking.`
        });
        break;

      case 'autoharness':
        newHistory.push({
          type: 'output',
          text: `[AutoHarness]\nDesigned a 13-stage autonomous GitHub contributor pipeline using TypeScript, Vercel AI SDK, and Docker.\nExecutes surgical code edits, verifies test suites, and tracks state via CLI Human-in-the-Loop approval gates.`
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          text: `• UPS (SDE II, May 2026-Present): Workflow automation & sales hierarchy databases for 150+ reps.\n• UPS (SDE I, July 2025-April 2026): Distributed microservices for 1.5M+ daily package tracking customers.\n• RWJMS (AI ML Intern, June 2025-April 2026): Web-based AI roleplay simulation platform.`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email:    deshah979@gmail.com\nPhone:    973-979-4182\nLinkedIn: linkedin.com\nGitHub:   github.com/Deep070203`
        });
        break;

      case 'sudo hire':
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        newHistory.push({
          type: 'output',
          text: `🎉 ACCESS GRANTED! You unlocked the top candidate pass. Let's build something extraordinary together.\nContact: deshah979@gmail.com`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'output',
          text: `zsh: command not found: ${cmd}. Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const copyTerminalHistory = () => {
    const text = history.map(h => h.type === 'command' ? `deep@antigravity:~$ ${h.text}` : h.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Terminal Header */}
        <div className="bg-[#0f172a] px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block cursor-pointer hover:opacity-80" onClick={onClose}></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#FF0099] inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#00FF85] inline-block"></span>
          <span className="ml-2 font-mono text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#00FF85]" />
            deepshah@antigravity: ~/portfolio (zsh)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTerminalHistory}
            className="p-1.5 text-zinc-400 hover:text-[#00FF85] hover:bg-white/5 rounded transition-all"
            title="Copy Output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00FF85]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-[#FF0099] hover:bg-[#FF0099]/10 rounded transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Body Output Area */}
      <div
        className="flex-1 p-4 font-mono text-xs text-zinc-200 overflow-y-auto space-y-2 bg-[#09090b]/95"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="leading-relaxed">
            {item.type === 'command' ? (
              <div className="flex items-center gap-2 text-[#00FF85] font-semibold flex-wrap">
                <span className="text-[#00FF85]">deep@antigravity</span>
                <span className="text-zinc-500">:</span>
                <span className="text-[#1E90FF]">~/portfolio</span>
                <span className="text-zinc-400">$</span>
                <span className="text-white">{item.text}</span>
              </div>
            ) : (
              <pre className="text-zinc-300 whitespace-pre-wrap font-mono font-normal pl-2 border-l-2 border-[#00FF85]/30 my-1">
                {item.text}
              </pre>
            )}
          </div>
        ))}

        {/* Active Command Prompt */}
        <div className="flex items-center gap-2 pt-1 text-[#00FF85] font-semibold flex-wrap">
          <span className="text-[#00FF85]">deep@antigravity</span>
          <span className="text-zinc-500">:</span>
          <span className="text-[#1E90FF]">~/portfolio</span>
          <span className="text-zinc-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-white font-mono text-xs border-none p-0 focus:ring-0"
            placeholder="type 'help'..."
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Terminal Footer Quick Buttons */}
      <div className="bg-[#0D0D0D] px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-zinc-500 shrink-0">Quick commands:</span>
          {['help', 'about', 'magneto', 'autoharness', 'sudo hire'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-[#18181c] hover:bg-[#FF0099]/10 hover:text-[#FF0099] hover:border-[#FF0099]/40 text-zinc-300 border border-white/10 transition-all shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

    </div>
  </div>
);
}
