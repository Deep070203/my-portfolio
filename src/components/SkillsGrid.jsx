import React, { useState } from 'react';
import { Cpu, Code, Database, Cloud, LineChart, CheckCircle2, Search } from 'lucide-react';

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'AI & Agents', 'Quant & Math', 'Languages', 'Data & Databases', 'Cloud & DevOps'];

  const skillItems = [
    // AI & Agents
    { name: 'Vercel AI SDK', category: 'AI & Agents', level: 'Expert', icon: '🤖' },
    { name: 'LLM Tool-Calling Loops', category: 'AI & Agents', level: 'Expert', icon: '🔄' },
    { name: 'Prompt Engineering', category: 'AI & Agents', level: 'Expert', icon: '⚡' },
    { name: 'LLM Fine-Tuning', category: 'AI & Agents', level: 'Advanced', icon: '🧠' },
    { name: 'Bias Detection Models', category: 'AI & Agents', level: 'Advanced', icon: '🔬' },
    { name: 'GitHub Copilot', category: 'AI & Agents', level: 'Expert', icon: '💻' },

    // Quant & Math
    { name: 'Black-Scholes Models', category: 'Quant & Math', level: 'Expert', icon: '📈' },
    { name: 'Gamma Exposure (GEX)', category: 'Quant & Math', level: 'Expert', icon: '🎯' },
    { name: 'Vanna Exposure (VEX)', category: 'Quant & Math', level: 'Expert', icon: '📐' },
    { name: 'Dark Pool Classification', category: 'Quant & Math', level: 'Advanced', icon: '📊' },
    { name: 'Kalshi Arbitrage Engine', category: 'Quant & Math', level: 'Advanced', icon: '⚡' },
    { name: 'Probability & Statistics', category: 'Quant & Math', level: 'Expert', icon: '🎓' },

    // Languages
    { name: 'Go (Golang)', category: 'Languages', level: 'Expert', icon: '🐹' },
    { name: 'TypeScript', category: 'Languages', level: 'Expert', icon: '🟦' },
    { name: 'Python', category: 'Languages', level: 'Expert', icon: '🐍' },
    { name: 'Java', category: 'Languages', level: 'Expert', icon: '☕' },
    { name: 'Rust', category: 'Languages', level: 'Intermediate', icon: '🦀' },
    { name: 'C# / .NET', category: 'Languages', level: 'Advanced', icon: '💜' },
    { name: 'JavaScript', category: 'Languages', level: 'Expert', icon: '🟨' },
    { name: 'SQL / PL-SQL', category: 'Languages', level: 'Expert', icon: '🗄️' },

    // Data & Databases
    { name: 'Apache Kafka', category: 'Data & Databases', level: 'Advanced', icon: '⚙️' },
    { name: 'PostgreSQL', category: 'Data & Databases', level: 'Expert', icon: '🐘' },
    { name: 'Couchbase', category: 'Data & Databases', level: 'Advanced', icon: '🔴' },
    { name: 'Databricks & Spark', category: 'Data & Databases', level: 'Advanced', icon: '🔥' },
    { name: 'MongoDB', category: 'Data & Databases', level: 'Advanced', icon: '🍃' },
    { name: 'Prisma ORM', category: 'Data & Databases', level: 'Advanced', icon: '◬' },

    // Cloud & DevOps
    { name: 'Docker', category: 'Cloud & DevOps', level: 'Expert', icon: '🐳' },
    { name: 'Azure DevOps Cloud', category: 'Cloud & DevOps', level: 'Advanced', icon: '☁️' },
    { name: 'AWS & GCP', category: 'Cloud & DevOps', level: 'Advanced', icon: '🌐' },
    { name: 'Terraform', category: 'Cloud & DevOps', level: 'Intermediate', icon: '🏗️' },
    { name: 'Microservices (60+)', category: 'Cloud & DevOps', level: 'Expert', icon: '🧱' },
    { name: 'IBM MQ & AMQ', category: 'Cloud & DevOps', level: 'Advanced', icon: '📨' }
  ];

  const filteredSkills = skillItems.filter(skill => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Skills &amp; Technology Stack
          </h2>
          <p className="text-base text-slate-400">
            Comprehensive skill set spanning high-performance languages, AI agent tool-calling frameworks, quantitative Black-Scholes analytics, and cloud databases.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{skill.icon}</span>
                <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-950">
                  {skill.level}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {skill.category}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
