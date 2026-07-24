import React from 'react';
import { FileText, Search, ShieldCheck, Mail, Code2, Cpu, LineChart, Sparkles, Terminal, FileCode, Bot } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';


export default function Sidebar({ notes, activeNoteId, onSelectNote, searchTerm, setSearchTerm, onOpenTerminal }) {
  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <aside className="w-80 note-sidebar flex flex-col h-screen select-none border-r border-zinc-800">
      
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sky-400 font-mono font-bold text-xs">
              DS
            </div>
            <div>
              <h1 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
                Deep Shah
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </h1>
              <p className="text-[11px] text-zinc-400 font-mono">
                SDE II @ UPS • MIDS @ UCB
              </p>
            </div>
          </div>

          <button
            onClick={onOpenTerminal}
            className="p-1.5 rounded-md text-zinc-400 hover:text-sky-400 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono transition-all"
            title="Launch Terminal CLI"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="px-2 py-1 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
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
                <span className="text-xs font-bold flex items-center gap-2 text-zinc-200">
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
                    className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400"
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
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Deep070203"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/deep-j-shah/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:deshah979@gmail.com"
            className="hover:text-sky-400 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <span className="text-[10px] font-mono text-zinc-500">
          v2.5 Notes Edition
        </span>
      </div>

    </aside>
  );
}
