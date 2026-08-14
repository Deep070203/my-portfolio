import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Terminal, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function HeaderNavbar({ activeTab, setActiveTab, onOpenTerminal }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-page)]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            DS
          </div>
          <div>
            <span className="font-mono text-sm font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
              Deep Shah
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 text-sm font-mono transition-all duration-150 rounded-md ${
                  isActive
                    ? 'text-[var(--accent-cyan)] font-semibold bg-[var(--bg-surface)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]/50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--accent-cyan)] rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Tools */}
        <div className="flex items-center gap-2">
          
          {/* Quick Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            title="Open Interactive CLI (Cmd+K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-md border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)] bg-[var(--bg-surface)] transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">CLI</span>
            <kbd className="hidden sm:inline-block px-1 text-[10px] bg-[var(--bg-page)] rounded border border-[var(--border-color)]">
              ⌘K
            </kbd>
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-md border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2 rounded-md border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-mono rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
