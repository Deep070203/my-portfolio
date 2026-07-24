import React, { useState } from 'react';
import { Lock, Eye, ZoomIn, ChevronLeft, ChevronRight, Download, Image as ImageIcon } from 'lucide-react';
import screenshot1 from '../assets/Screenshot 2026-07-20 at 8.21.14 PM.png';
import screenshot2 from '../assets/Screenshot 2026-07-20 at 8.22.00 PM.png';
import screenshot3 from '../assets/Screenshot 2026-07-20 at 8.22.33 PM.png';

export default function MagnetoNote() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const screenshotList = [
    {
      src: screenshot2,
      title: 'SPY NetVEX Matrix & Dark Pool Prints',
      ticker: 'SPY NetVEX',
      description: 'SPY NetVEX heatmap matrix across strikes and expiration dates with Call Wall ($755), Put Wall ($740), Gamma Flip ($748.61), Max Pain ($749), and Dark Pool order prints ($743.25 size 1,647,536).'
    },
    {
      src: screenshot3,
      title: 'NVDA NetGEX Strike Exposure Grid',
      ticker: 'NVDA NetGEX',
      description: 'NVDA NetGEX strike distribution grid highlighting Call Wall ($210), Put Wall ($200), Gamma Flip ($198.41), and Max Pain ($200).'
    },
    {
      src: screenshot1,
      title: 'SPY NetGEX Short Gamma Regime Flip',
      ticker: 'SPY NetGEX Flip',
      description: 'SPY NetGEX strike grid under -$1.99B Short Gamma regime flip highlighting dealer hedging volatility acceleration zones.'
    }
  ];

  const current = screenshotList[activeIdx];

  return (
    <div className="space-y-6">

      {/* Intro Quote */}
      <blockquote>
        <strong className="text-zinc-200">Magneto.ai</strong> — High-Performance Quantitative Analytics Engine engineered in <strong>Go (Golang)</strong> calculating real-time NetGEX (Gamma Exposure) and NetVEX (Vanna Exposure) strike-expiry grids using Black-Scholes models. Uses Gorilla WebSockets &amp; Tradier API for dark pool trade classification.
      </blockquote>

      {/* Security & Access Callout */}
      <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs font-mono flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>Private Enterprise Application • Hosted URL Restricted • UI Screenshots Provided Below</span>
        </span>
        <span className="text-[10px] bg-amber-900/60 px-2 py-0.5 rounded border border-amber-700/60 font-mono">
          Internal Access
        </span>
      </div>

      {/* Screenshot Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
        {screenshotList.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${activeIdx === idx
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 font-bold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{s.ticker} ({idx + 1}/3)</span>
          </button>
        ))}
      </div>

      {/* Main Image Display Box */}
      <div className="space-y-3">
        <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden group">

          {/* Main Screenshot Image */}
          <img
            src={current.src}
            alt={current.title}
            onClick={() => setIsFullscreen(true)}
            className="w-full h-auto object-contain cursor-zoom-in hover:opacity-95 transition-opacity"
          />

          {/* Hover Overlay Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <ZoomIn className="w-3.5 h-3.5 text-sky-400" />
              <span>Full Screen</span>
            </button>
          </div>

        </div>

        {/* Screenshot Caption */}
        <div className="p-4 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
          <div className="text-xs font-bold text-zinc-100 flex items-center justify-between">
            <span>{current.title}</span>
            <span className="text-[10px] font-mono text-zinc-400">Actual Dashboard Capture</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {current.description}
          </p>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-3 gap-3">
        {screenshotList.map((s, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`cursor-pointer rounded-lg border overflow-hidden transition-all ${activeIdx === idx
                ? 'border-sky-500 ring-2 ring-sky-500/20 opacity-100'
                : 'border-zinc-800 opacity-60 hover:opacity-100'
              }`}
          >
            <img src={s.src} alt={s.title} className="w-full h-20 object-cover" />
            <div className="p-1.5 bg-zinc-900 text-[10px] font-mono text-zinc-400 truncate text-center">
              {s.ticker}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex flex-col items-center justify-center animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="max-w-6xl w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-zinc-300 font-mono text-xs px-2">
              <span className="font-bold text-white">{current.title}</span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold"
              >
                Close (ESC)
              </button>
            </div>
            <img
              src={current.src}
              alt={current.title}
              className="w-full max-h-[85vh] object-contain rounded-lg border border-zinc-800 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
}
