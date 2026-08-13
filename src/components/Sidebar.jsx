import React from 'react';
import { FileText, Search, ShieldCheck, Mail, Code2, Cpu, LineChart, Sparkles, Terminal, FileCode, Bot, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Sidebar({ notes, activeNoteId, onSelectNote, searchTerm, setSearchTerm, onOpenTerminal, isOpen, onClose }) {
  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar / Mobile Drawer Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-80 max-w-[85vw] note-sidebar flex flex-col h-screen select-none border-r border-white/10
        bg-[#111113] transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 shadow-2xl shadow-emerald-500/10' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#18181c] border border-[#00FF85]/40 flex items-center justify-center text-[#00FF85] font-mono font-bold text-xs shadow-[0_0_10px_rgba(0,255,133,0.15)]">
                DS
              </div>
              <div>
                <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Deep Shah
                  <span className="w-2 h-2 rounded-full bg-[#00FF85] shadow-[0_0_8px_#00FF85]"></span>
                </h1>
                <p className="text-[11px] text-zinc-400 font-mono">
                  SDE II @ UPS • MIDS @ UCB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onOpenTerminal}
                className="p-1.5 rounded-md text-zinc-400 hover:text-[#FF0099] hover:bg-[#FF0099]/10 border border-white/10 text-xs font-mono transition-all"
                title="Launch Terminal CLI"
              >
                <Terminal className="w-4 h-4" />
              </button>

              {/* Close Button on Mobile */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 md:hidden transition-all"
                title="Close Sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#18181c] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/50 transition-all"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono font-semibold text-[#00FF85] uppercase tracking-wider">
            All Notes ({filteredNotes.length})
          </div>

          {filteredNotes.map((note) => {
            const isActive = note.id === activeNoteId;
            return (
              <div
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`p-3 rounded-lg cursor-pointer note-item ${
                  isActive ? 'note-item-active text-white' : 'text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold flex items-center gap-2 text-white">
                    <span>{note.icon}</span>
                    <span className="truncate">{note.title}</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{note.date}</span>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-1 font-sans">
                  {note.snippet}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-[#18181c] border border-white/10 text-[9px] font-mono text-zinc-400 hover:text-[#00FF85] hover:border-[#00FF85]/40 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Social & Status */}
        <div className="p-3 border-t border-white/10 bg-[#0D0D0D] flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Deep070203"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF0099] transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/deep-j-shah/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1E90FF] transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:deshah979@gmail.com"
              className="hover:text-[#00FF85] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <span className="text-[10px] font-mono text-zinc-500">
            v2.5 Neon Edition
          </span>
        </div>

      </aside>
    </>
  );
}
