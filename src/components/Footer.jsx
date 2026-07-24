import React from 'react';
import { Mail, Heart, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer({ onOpenTerminal }) {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800/80 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-slate-200 font-bold text-sm flex items-center justify-center md:justify-start gap-2">
            Deep Shah
            <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              SDE II @ UPS
            </span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Engineering Autonomous AI Agents, Options Quant Engines &amp; High-Throughput Microservices.
          </p>
        </div>

        {/* Center System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>SYSTEM OPERATIONAL • REACT 18 + VITE</span>
        </div>

        {/* Right Actions & Socials */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenTerminal}
            className="hover:text-cyan-400 transition-colors"
          >
            [CLI Terminal]
          </button>
          <a
            href="https://github.com/Deep070203"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600">
        © {new Date().getFullYear()} Deep Shah. Summa Cum Laude Graduate • UC Berkeley MIDS Candidate.
      </div>
    </footer>
  );
}
