import React, { useEffect, useRef } from 'react';
import { Terminal, ArrowRight, Download, Sparkles, Activity, ShieldCheck, Cpu, Code, LineChart } from 'lucide-react';

export default function HeroSection({ onOpenTerminal }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles for Neural Agent Nodes & Options Market Flow
    const particleCount = 45;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#06b6d4' : (Math.random() > 0.5 ? '#8b5cf6' : '#10b981'),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines (Neural / Quant Net)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-inner text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Agents • Options Exposure Analytics • High-Throughput Systems</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
            Engineering <br className="hidden sm:inline" />
            <span className="gradient-text-cyan">Autonomous AI Agents</span> &amp; <br />
            <span className="gradient-text-violet">Real-Time Quant Analytics</span>
          </h1>

          {/* Subtitle Bio */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Hi, I’m <strong className="text-white font-semibold">Deep Shah</strong>. I’m a <span className="text-cyan-400 font-medium">Software Development Engineer II at UPS</span> and an <span className="text-violet-400 font-medium">M.S. Data Science Candidate at UC Berkeley</span> (Summa Cum Laude, Rutgers CS &amp; Math). I architect high-throughput distributed microservices, quantitative options hedging models, and self-healing LLM agent pipelines.
          </p>

          {/* Quick Metrics Cards Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 text-left max-w-4xl mx-auto">
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
              <div className="text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> High Throughput
              </div>
              <div className="text-2xl font-bold text-slate-100">1.5M+</div>
              <div className="text-[11px] text-slate-400">Daily Package Customers at UPS</div>
            </div>

            <div className="glass-panel p-3.5 rounded-xl border border-slate-800/80 hover:border-violet-500/30 transition-all">
              <div className="text-violet-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> AI Agent Loop
              </div>
              <div className="text-2xl font-bold text-slate-100">13 Stages</div>
              <div className="text-[11px] text-slate-400">AutoHarness GitHub Contributor</div>
            </div>

            <div className="glass-panel p-3.5 rounded-xl border border-slate-800/80 hover:border-emerald-500/30 transition-all">
              <div className="text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <LineChart className="w-3.5 h-3.5" /> Quant Engine
              </div>
              <div className="text-2xl font-bold text-slate-100">NetGEX/VEX</div>
              <div className="text-[11px] text-slate-400">Magneto.ai Black-Scholes Model</div>
            </div>

            <div className="glass-panel p-3.5 rounded-xl border border-slate-800/80 hover:border-amber-500/30 transition-all">
              <div className="text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Academics
              </div>
              <div className="text-2xl font-bold text-slate-100">3.86 GPA</div>
              <div className="text-[11px] text-slate-400">Rutgers Summa Cum Laude B.S.</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenTerminal}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-sm transition-all flex items-center gap-2.5 shadow-md hover:border-cyan-500/50"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Launch Terminal CLI</span>
            </button>

            <a
              href="#demos"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm transition-all flex items-center gap-2 hover:border-violet-500/50"
            >
              <LineChart className="w-4 h-4 text-violet-400" />
              <span>Live Quant & Agent Sandboxes</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
