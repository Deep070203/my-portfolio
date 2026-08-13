import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import NotesViewer from './components/NotesViewer';
import InteractiveTerminal from './components/InteractiveTerminal';

export default function App() {
  const [activeNoteId, setActiveNoteId] = useState('readme');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const notes = [
    {
      id: 'readme',
      filename: 'README.md',
      title: 'README.md — Deep Shah Bio',
      category: 'Overview',
      icon: '📌',
      date: '',
      tags: ['oss-dev', 'sde-ups', 'berkeley-mids', 'rutgers-summa-cum-laude'],
      snippet: 'Software Engineer specializing in Autonomous AI Agents, Options Quant Engines & Microservices.'
    },
    {
      id: 'kalshi',
      filename: 'Kalshi_Arbitrage.md',
      title: 'Kalshi BTC Hourly Arbitrage Bot',
      category: 'Quant & Finance',
      icon: '🦀',
      date: '',
      tags: ['rust', 'tokio', 'websockets', 'kalshi', 'hft-bot'],
      snippet: 'High-frequency automated event contract arbitrage runner in Rust for Kalshi BTC hourly markets.'
    },
    {
      id: 'magneto',
      filename: 'Magneto.ai.note',
      title: 'Magneto.ai — Options Exposure Engine',
      category: 'Quant & Finance',
      icon: '📈',
      date: '',
      tags: ['go', 'gex-vex', 'black-scholes', 'dark-pool', 'options'],
      snippet: 'Real-time NetGEX & NetVEX quantitative analytics engine in Go with dark pool prints & SPY/NVDA screenshots.'
    },
    {
      id: 'experience',
      filename: 'Experience.md',
      title: 'Experience.md — Career & Education',
      category: 'Career',
      icon: '💼',
      date: '',
      tags: ['ups-sde-ii', 'ups-sde-i', 'uc-berkeley', 'rutgers'],
      snippet: 'Software Development Engineer II @ UPS, UC Berkeley MIDS, and Rutgers Summa Cum Laude B.S.'
    },
    {
      id: 'skills',
      filename: 'Skills.md',
      title: 'Skills.md — Technical Matrix',
      category: 'Skills',
      icon: '⚡',
      date: '',
      tags: ['golang', 'typescript', 'python', 'java', 'docker', 'kafka'],
      snippet: 'Technical capabilities across high-performance languages, AI agent SDKs, and databases.'
    },
    {
      id: 'contact',
      filename: 'Contact.md',
      title: 'Contact.md — Direct Message',
      category: 'Contact',
      icon: '✉️',
      date: '',
      tags: ['email', 'linkedin', 'github', 'parsippany-nj'],
      snippet: 'Reach out for roles in Autonomous AI Agents, Quantitative Trading, and High-Throughput Engineering.'
    }
  ];

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0D0D0D] text-white selection:bg-[#FF0099] selection:text-white font-sans relative">
      
      {/* Sidebar Navigation */}
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={(id) => {
          setActiveNoteId(id);
          setIsMobileSidebarOpen(false);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Notes Viewer */}
      <NotesViewer
        note={activeNote}
        onCopyNote={() => {}}
        onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

    </div>
  );
}
