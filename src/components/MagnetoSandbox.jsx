import React, { useState, useMemo } from 'react';
import { LineChart, Calculator, ShieldCheck, Info, Sparkles, Image as ImageIcon, Sliders, ArrowUpRight, TrendingUp } from 'lucide-react';
import ScreenshotModal from './ScreenshotModal';

// Cumulative Standard Normal Distribution N(x)
function normalCDF(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
}

// Standard Normal PDF N'(x)
function normalPDF(x) {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}

export default function MagnetoSandbox() {
  const [spotPrice, setSpotPrice] = useState(580);
  const [strikePrice, setStrikePrice] = useState(580);
  const [iv, setIv] = useState(22); // 22% IV
  const [dte, setDte] = useState(7); // 7 DTE
  const [riskFree, setRiskFree] = useState(4.5); // 4.5% interest
  const [openInterest, setOpenInterest] = useState(25000);
  const [optionType, setOptionType] = useState('call');
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);

  // Black-Scholes Calculations
  const metrics = useMemo(() => {
    const S = parseFloat(spotPrice) || 1;
    const K = parseFloat(strikePrice) || 1;
    const sigma = (parseFloat(iv) || 1) / 100;
    const T = Math.max(parseFloat(dte) || 1, 0.1) / 365;
    const r = (parseFloat(riskFree) || 0) / 100;
    const OI = parseFloat(openInterest) || 1;

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const pdfD1 = normalPDF(d1);
    const cdfD1 = normalCDF(d1);

    const deltaCall = cdfD1;
    const deltaPut = cdfD1 - 1;
    const delta = optionType === 'call' ? deltaCall : deltaPut;

    const gamma = pdfD1 / (S * sigma * Math.sqrt(T));
    
    // NetGEX: $ Exposure per 1% move in Underlier Price
    // GEX = Gamma * S^2 * 0.01 * OpenInterest * 100 (contract multiplier)
    const gexSign = optionType === 'call' ? 1 : -1;
    const netGex = gamma * S * S * 0.01 * OI * 100 * gexSign;

    // Vanna: dDelta / dSigma = -pdfD1 * (d2 / sigma)
    const vanna = -pdfD1 * (d2 / sigma);
    const netVex = vanna * S * 0.01 * OI * 100 * gexSign;

    return {
      d1: d1.toFixed(4),
      d2: d2.toFixed(4),
      delta: delta.toFixed(4),
      gamma: gamma.toFixed(6),
      netGex: (netGex / 1e6).toFixed(2), // In Millions $
      netVex: (netVex / 1e6).toFixed(2), // In Millions $
      isLongGamma: netGex >= 0
    };
  }, [spotPrice, strikePrice, iv, dte, riskFree, openInterest, optionType]);

  // Strike range for visual chart comparison
  const strikeRange = useMemo(() => {
    const base = parseFloat(spotPrice) || 580;
    const step = 5;
    const list = [];
    for (let i = -3; i <= 3; i++) {
      const k = base + i * step;
      const S = base;
      const sigma = (parseFloat(iv) || 22) / 100;
      const T = Math.max(parseFloat(dte) || 7, 0.1) / 365;
      const r = (parseFloat(riskFree) || 4.5) / 100;
      const d1 = (Math.log(S / k) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
      const pdfD1 = normalPDF(d1);
      const g = pdfD1 / (S * sigma * Math.sqrt(T));
      const gexVal = g * S * S * 0.01 * (parseFloat(openInterest) || 25000) * 100 / 1e6;
      list.push({ strike: k, gex: gexVal.toFixed(2) });
    }
    return list;
  }, [spotPrice, iv, dte, riskFree, openInterest]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Quantitative Finance &amp; Options Exposure Engine</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              Magneto.ai Interactive Analytics Sandbox
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Simulate Black-Scholes <strong className="text-slate-200">NetGEX (Gamma Exposure)</strong> and <strong className="text-slate-200">NetVEX (Vanna Exposure)</strong> strike-expiry grids to pinpoint market maker hedging flows.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsScreenshotModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <ImageIcon className="w-4 h-4" />
              <span>View Private UI Screenshots</span>
            </button>
          </div>
        </div>

        {/* Inputs & Outputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/70 p-5 rounded-xl border border-slate-800/80 space-y-4">
            <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sliders className="w-3.5 h-3.5" /> Underlier &amp; Option Chain Parameters
            </h4>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Spot Price ($S)</label>
                <input
                  type="number"
                  value={spotPrice}
                  onChange={(e) => setSpotPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Strike Price ($K)</label>
                <input
                  type="number"
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Implied Vol (IV %)</label>
                <input
                  type="number"
                  value={iv}
                  onChange={(e) => setIv(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Days to Expiry (DTE)</label>
                <input
                  type="number"
                  value={dte}
                  onChange={(e) => setDte(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Open Interest (OI)</label>
                <input
                  type="number"
                  value={openInterest}
                  onChange={(e) => setOpenInterest(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Option Type</label>
                <select
                  value={optionType}
                  onChange={(e) => setOptionType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                >
                  <option value="call">Call Option</option>
                  <option value="put">Put Option</option>
                </select>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 font-mono bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
              ⚡ Engine written in <strong className="text-cyan-300">Go (Golang)</strong> using high-performance concurrent Black-Scholes numerical approximations.
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Key Calculated Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono mb-1">DELTA (Δ)</div>
                <div className="text-xl font-bold font-mono text-cyan-400">{metrics.delta}</div>
                <div className="text-[10px] text-slate-500 font-mono">Hedge Ratio</div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono mb-1">GAMMA (Γ)</div>
                <div className="text-xl font-bold font-mono text-slate-100">{metrics.gamma}</div>
                <div className="text-[10px] text-slate-500 font-mono">Rate of Delta</div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono mb-1">NET GEX / 1%</div>
                <div className={`text-xl font-bold font-mono ${parseFloat(metrics.netGex) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {parseFloat(metrics.netGex) >= 0 ? `+$${metrics.netGex}M` : `-$${Math.abs(metrics.netGex)}M`}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Dollar Gamma</div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono mb-1">NET VEX (VANNA)</div>
                <div className="text-xl font-bold font-mono text-violet-400">
                  {parseFloat(metrics.netVex) >= 0 ? `+$${metrics.netVex}M` : `-$${Math.abs(metrics.netVex)}M`}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">IV Sensitivity</div>
              </div>
            </div>

            {/* Hedging Regime Status Box */}
            <div className={`p-4 rounded-xl border font-mono text-xs ${
              metrics.isLongGamma
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
            }`}>
              <div className="font-bold flex items-center gap-2 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>HEGEMONIC REGIME: {metrics.isLongGamma ? 'DEALER LONG GAMMA (DAMPENING VOLATILITY)' : 'DEALER SHORT GAMMA (VOLATILITY ACCELERATOR)'}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {metrics.isLongGamma
                  ? 'Market makers buy dips and sell rallies to maintain delta-neutral positions, reducing intraday price dispersion.'
                  : 'Market makers sell into falling markets and buy into rising markets, expanding volatility and pulling price toward key magnetic pins.'}
              </p>
            </div>

            {/* Strike Spectrum Visual Graph */}
            <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                <span>Neighboring Strike GEX Distribution ($ Millions)</span>
                <span className="text-cyan-400 font-semibold">Underlier: ${spotPrice}</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                {strikeRange.map((item, idx) => {
                  const isATM = Math.abs(item.strike - spotPrice) < 2.5;
                  const gexVal = parseFloat(item.gex);
                  const barWidth = Math.min(Math.abs(gexVal) * 5, 100);

                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <span className={`w-24 text-right ${isATM ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                        ${item.strike} {isATM ? '(ATM)' : ''}
                      </span>
                      <div className="flex-1 bg-slate-900 h-4 rounded overflow-hidden relative">
                        <div
                          className={`h-full transition-all duration-300 ${gexVal >= 0 ? 'bg-cyan-500' : 'bg-rose-500'}`}
                          style={{ width: `${barWidth}%` }}
                        ></div>
                      </div>
                      <span className="w-20 font-bold text-slate-200">
                        {gexVal >= 0 ? `+$${gexVal}M` : `-$${Math.abs(gexVal)}M`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Screenshot Lightbox Modal */}
      <ScreenshotModal
        isOpen={isScreenshotModalOpen}
        onClose={() => setIsScreenshotModalOpen(false)}
      />
    </div>
  );
}
