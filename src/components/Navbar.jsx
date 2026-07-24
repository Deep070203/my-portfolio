import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Menu, X, Mail, Cpu, LineChart, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Navbar({ onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', icon: Cpu },
    { name: 'Projects', href: '#projects', icon: Code2 },
    { name: 'Interactive Demos', href: '#demos', icon: LineChart },
    { name: 'Experience', href: '#experience', icon: FileText },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070b14]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#0b1120] rounded-[11px] flex items-center justify-center font-mono font-bold text-cyan-400 text-lg">
              DS
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
              Deep Shah
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                SDE II @ UPS
              </span>
            </span>
            <span className="block text-[11px] text-slate-400 font-mono">
              AI / Agents & Quant Trading
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 rounded-full transition-all flex items-center gap-1.5"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/50 rounded-lg transition-all hover:border-cyan-500/50 group"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>CLI Terminal</span>
          </button>

          <a
            href="https://github.com/Deep070203"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

        </div>

        {/* Mobile Menu Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100 bg-slate-900/80 border border-slate-800 rounded-lg"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b1120]/95 border-b border-slate-800 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded-lg"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal CLI</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
