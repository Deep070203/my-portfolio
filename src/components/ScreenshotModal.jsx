import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Layers, Eye, ShieldAlert, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function ScreenshotModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  // Screenshots preview metadata with high quality generated SVG visual fallbacks + image loader
  const screenshots = [
    {
      id: 'gex_dashboard',
      title: 'Real-Time NetGEX & Strike Skew Dashboard',
      description: 'High-frequency quantitative engine calculating strike-by-strike Gamma Exposure (GEX) and dealer hedging zones.',
      tech: 'Go (Golang), Gorilla WebSockets, Tradier API, Black-Scholes',
      gradient: 'from-cyan-900/60 via-slate-900 to-blue-950',
      mockType: 'gex'
    },
    {
      id: 'darkpool_flow',
      title: 'Institutional Dark Pool Order Classification',
      description: 'Live order reconstruction pipeline isolating block trades, dark pool liquidity flow, and daily Open Interest reconciliations.',
      tech: 'Go Concurrent Data Pipeline, PostgreSQL, WebSockets',
      gradient: 'from-violet-900/60 via-slate-900 to-purple-950',
      mockType: 'darkpool'
    },
    {
      id: 'vanna_vex_grid',
      title: 'NetVEX (Vanna Exposure) & Volatility Skew Grid',
      description: 'Strike-expiry heat map calculating sensitivity of Delta to IV changes across options chains.',
      tech: 'TypeScript, React, Canvas Financial Grid, TailWind CSS',
      gradient: 'from-emerald-900/60 via-slate-900 to-teal-950',
      mockType: 'vanna'
    }
  ];

  if (!isOpen) return null;

  const current = screenshots[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#090e1a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#0f172a] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Magneto.ai Private Architecture & UI Showcase
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Private Enterprise App
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Source Code &amp; Hosted App Restricted to Internal Access • Screenshots Authorized for Preview
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body & Screenshot View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-grid-pattern">
          
          {/* Main Visual Frame */}
          <div className={`relative rounded-xl border border-slate-800 bg-gradient-to-br ${current.gradient} p-6 overflow-hidden shadow-2xl min-h-[340px] flex flex-col justify-between group`}>
            
            {/* Visual Header Mock */}
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-4 mb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>MAGNETO.AI QUANT TERMINAL // {current.id.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
                ● WEBSOCKET LIVE 100ms
              </div>
            </div>

            {/* Graphic Illustration of Dashboard Mockup */}
            {current.mockType === 'gex' && (
              <div className="space-y-4 my-2">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-mono">SPOT UNDERLIER</div>
                    <div className="text-xl font-bold text-slate-100 font-mono">$584.20 SPY</div>
                    <div className="text-[10px] text-emerald-400 font-mono">+1.24% (+7.15)</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-mono">NET GEX EXPOSURE</div>
                    <div className="text-xl font-bold text-cyan-400 font-mono">+$2.84B / 1%</div>
                    <div className="text-[10px] text-cyan-300 font-mono">Dealer Long Gamma</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-mono">ZERO GEX PIN</div>
                    <div className="text-xl font-bold text-violet-400 font-mono">$580.00 STRIKE</div>
                    <div className="text-[10px] text-violet-300 font-mono">Key Reversal Level</div>
                  </div>
                </div>

                {/* Simulated GEX Bar Graph */}
                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-slate-300 mb-2 flex justify-between">
                    <span>Strike Gamma Exposure Spectrum</span>
                    <span className="text-cyan-400">Black-Scholes Delta-Weighted</span>
                  </div>
                  {[
                    { strike: '$575.00', call: 30, put: -70 },
                    { strike: '$580.00 (Zero GEX)', call: 45, put: -45 },
                    { strike: '$585.00 (Current)', call: 85, put: -20 },
                    { strike: '$590.00 (Call Wall)', call: 95, put: -10 },
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs font-mono">
                      <span className="w-32 text-slate-400 text-right">{s.strike}</span>
                      <div className="flex-1 bg-slate-900 h-4 rounded overflow-hidden flex">
                        <div className="bg-emerald-500/80 h-full" style={{ width: `${s.call}%` }}></div>
                        <div className="bg-red-500/80 h-full" style={{ width: `${Math.abs(s.put)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {current.mockType === 'darkpool' && (
              <div className="space-y-3 my-2 font-mono text-xs">
                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px] mb-2 font-semibold text-cyan-300">
                    INSTITUTIONAL BLOCK TRADE &amp; DARK POOL PRINT STREAM
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between p-2 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                      <span>15:42:19 • SPY 585 C 20-AUG</span>
                      <span>12,500 Contracts ($4.2M Premium)</span>
                      <span className="font-bold">SWEEP / DARK POOL</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800 text-slate-300">
                      <span>15:41:04 • QQQ 480 P 15-JUL</span>
                      <span>8,000 Contracts ($2.1M Premium)</span>
                      <span>BLOCK / Tradier Feed</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-cyan-950/40 border border-cyan-800/40 text-cyan-300">
                      <span>15:39:50 • NVDA 125 C 28-JUL</span>
                      <span>25,000 Contracts ($11.8M Premium)</span>
                      <span className="font-bold">UNUSUAL ACCUMULATION</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {current.mockType === 'vanna' && (
              <div className="space-y-3 my-2 font-mono text-xs">
                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px] mb-2 font-semibold text-violet-300">
                    NET VEX (DELTA/IV SENSITIVITY MATRIX)
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="p-2 bg-slate-900 rounded border border-slate-800 font-bold text-slate-400">STRIKE</div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800 font-bold text-slate-400">CALL VANNA</div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800 font-bold text-slate-400">PUT VANNA</div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800 font-bold text-slate-400">NET VEX</div>

                    <div className="p-2 bg-slate-900/60 rounded text-slate-200">$570.00</div>
                    <div className="p-2 bg-slate-900/60 rounded text-slate-300">+0.012</div>
                    <div className="p-2 bg-slate-900/60 rounded text-purple-400">-0.045</div>
                    <div className="p-2 bg-purple-950/80 rounded text-purple-300 font-bold">-$0.33M</div>

                    <div className="p-2 bg-slate-900/60 rounded text-slate-200">$580.00</div>
                    <div className="p-2 bg-slate-900/60 rounded text-emerald-400">+0.084</div>
                    <div className="p-2 bg-slate-900/60 rounded text-slate-300">-0.021</div>
                    <div className="p-2 bg-emerald-950/80 rounded text-emerald-300 font-bold">+$1.42M</div>

                    <div className="p-2 bg-slate-900/60 rounded text-slate-200">$590.00</div>
                    <div className="p-2 bg-slate-900/60 rounded text-cyan-400">+0.142</div>
                    <div className="p-2 bg-slate-900/60 rounded text-slate-300">-0.008</div>
                    <div className="p-2 bg-cyan-950/80 rounded text-cyan-300 font-bold">+$2.18M</div>
                  </div>
                </div>
              </div>
            )}

            {/* Card Description */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white">{current.title}</h4>
                <p className="text-xs text-slate-300 max-w-2xl mt-0.5">{current.description}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-[11px] text-cyan-300">
                  {current.tech}
                </span>
              </div>
            </div>

          </div>

          {/* Screenshot Selector Tabs */}
          <div className="grid grid-cols-3 gap-3">
            {screenshots.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  activeTab === idx
                    ? 'bg-slate-900 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === idx ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</div>
                  <div className="text-[10px] text-slate-500 font-mono">View Screenshot {idx + 1}/3</div>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#0b1120] px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => setActiveTab((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-all"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-all"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
}
