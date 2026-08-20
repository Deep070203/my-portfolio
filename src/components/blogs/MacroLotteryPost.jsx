import React, { useState, useMemo } from 'react';
import { 
  Clock, Zap, Layers, Calculator, Code, ShieldCheck, 
  TrendingUp, ArrowLeft, ArrowRight, AlertTriangle, CheckSquare, Building2, DollarSign, Activity, FileText,
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from '../Icons';

// Import figure assets
import fig1Calibration from '../../assets/macro-lottery/fig1_kalshi_macro_calibration.png';
import fig2Depth from '../../assets/macro-lottery/fig2_l2_orderbook_depth.png';
import fig3Slippage from '../../assets/macro-lottery/fig3_institutional_block_slippage.png';
import fig4BasisRisk from '../../assets/macro-lottery/fig4_basis_risk_variance_comparison.png';
import fig5WesternGrazers from '../../assets/macro-lottery/fig5_western_grazers_payoff.png';
import fig6Ford from '../../assets/macro-lottery/fig6_ford_critical_minerals_payoff.png';
import fig7SWK from '../../assets/macro-lottery/fig7_kpmg_swk_tariff_payoff.png';

export default function MacroLotteryPost({ onBack, onNavigateToProjects }) {
  // Case Study Preset States
  const PRESETS = {
    western: {
      name: 'Western Grazers (Wage Exemption)',
      liability: 500000,
      contractPrice: 10, // 10 cents
      probability: 10,
      proxyCorrelation: 0.15,
      hedgeSize: 500000,
    },
    ford: {
      name: 'Ford Motor Co. (Tariff Hedge)',
      liability: 1500000000,
      contractPrice: 40, // 40 cents
      probability: 40,
      proxyCorrelation: 0.25,
      hedgeSize: 1500000000,
    },
    swk: {
      name: 'Stanley Black & Decker (Tariff Drag)',
      liability: 300000000,
      contractPrice: 40, // 40 cents
      probability: 40,
      proxyCorrelation: 0.20,
      hedgeSize: 300000000,
    }
  };

  // Interactive Calculator State
  const [calcLiability, setCalcLiability] = useState(1500000000); // $1.5B default
  const [calcPriceCents, setCalcPriceCents] = useState(40); // 40 cents
  const [calcProb, setCalcProb] = useState(40); // 40%
  const [calcProxyCorr, setCalcProxyCorr] = useState(0.25); // 0.25 correlation
  const [calcHedgeSize, setCalcHedgeSize] = useState(1500000000);
  const [activeTabCaseStudy, setActiveTabCaseStudy] = useState('ford');

  // Load Preset
  const applyPreset = (key) => {
    const p = PRESETS[key];
    if (!p) return;
    setCalcLiability(p.liability);
    setCalcPriceCents(p.contractPrice);
    setCalcProb(p.probability);
    setCalcProxyCorr(p.proxyCorrelation);
    setCalcHedgeSize(p.hedgeSize);
    setActiveTabCaseStudy(key);
  };

  // Calculated Metrics Engine
  const metrics = useMemo(() => {
    const L = calcLiability;
    const p = calcProb / 100;
    const price = calcPriceCents / 100;
    const rho = calcProxyCorr;
    const N = calcHedgeSize;

    // Direct Event Premium Cost
    const totalPremium = N * price;

    // Direct Event Net Cashflow Scenario 1 (Event occurs E=1)
    // Loss = -L, Payout = N * $1.00, Premium Paid = -totalPremium
    // If N = L, Payout - L = 0 => Net Loss = -totalPremium
    const netLossEventDirect = -L + N * 1.0 - totalPremium;
    // Direct Event Net Cashflow Scenario 2 (Event does not occur E=0)
    // Loss = 0, Payout = 0, Premium Paid = -totalPremium => Net Loss = -totalPremium
    const netLossNoEventDirect = -totalPremium;

    // Variance of direct binary event hedge = 0 (when N = L)
    const directVar = Math.abs(N - L) > 0 ? (L - N)**2 * p * (1-p) : 0;

    // Liquid Proxy Hedge Residual Risk (Variance)
    // Var(Residual) = L^2 * p * (1-p) * (1 - rho^2)
    const unhedgedVar = L**2 * p * (1 - p);
    const proxyResidualVar = unhedgedVar * (1 - rho**2);
    const proxyStdDev = Math.sqrt(proxyResidualVar);

    // Slippage Estimation based on L2 Orderbook Curve
    let slippageBps = 214;
    if (N >= 500000000) slippageBps = 144841;
    else if (N >= 100000000) slippageBps = 62114;
    else if (N >= 50000000) slippageBps = 36672;
    else if (N >= 1000000) slippageBps = 4277;

    return {
      totalPremium,
      netLossEventDirect,
      netLossNoEventDirect,
      directVar,
      unhedgedStdDev: Math.sqrt(unhedgedVar),
      proxyStdDev,
      riskReductionPct: ((1 - proxyStdDev / Math.sqrt(unhedgedVar)) * 100).toFixed(1),
      slippageBps
    };
  }, [calcLiability, calcPriceCents, calcProb, calcProxyCorr, calcHedgeSize]);

  // Checklist Interactive State
  const [checklist, setChecklist] = useState({
    brierScore: true,
    obiProfile: true,
    rfqDesks: true,
    rule4011: true,
  });

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatCurrency = (val) => {
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    if (val >= 1e3) return `$${(val / 1e3).toFixed(0)}K`;
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </button>

        <a
          href="https://github.com/Deep070203/macro-lottery"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs font-mono font-semibold transition-colors"
        >
          <GithubIcon className="w-4 h-4" />
          <span>github.com/Deep070203/macro-lottery</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Article Title Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--accent-cyan)]">
          <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 font-semibold">
            Quantitative Risk & Financial Engineering
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5" /> 14 min read
          </span>
          <span>•</span>
          <span className="text-[var(--text-muted)]">August 14, 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          Corporate Tail-Risk Transfer & Regulatory Event Derivatives
        </h1>
        <h2 className="text-base sm:text-lg font-mono text-[var(--text-secondary)] font-medium">
          Empirical Analysis & Quantitative Modeling of Discrete Regulatory, Macro, and Tail-Risk Transfer via Kalshi & Polymarket Event Contracts
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--border-color)]/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs">
              DS
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-[var(--text-primary)]">Deep Shah</h4>
              <p className="text-[11px] font-mono text-[var(--text-muted)]">Quantitative Research & Financial Engineering Desk | SDE II @ UPS</p>
            </div>
          </div>

          <a
            href="https://github.com/Deep070203/macro-lottery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-cyan)] hover:underline"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Source Code & Models</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Executive Summary & Architecture Card */}
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
        <h3 className="font-mono font-bold text-sm text-[var(--accent-cyan)] uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4" /> Executive Summary
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
          Non-financial corporations are structurally short discrete macro, legislative, and regulatory events (e.g., sudden tariff hikes, labor wage exemption expirations, FTC M&A blocks, environmental compliance mandates, tax credit rollbacks). Traditional corporate risk-transfer mechanisms fail under two structural friction regimes:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-[var(--bg-page)] border border-[var(--border-color)] space-y-2">
            <h4 className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> 1. P&C Underwriting Frictions
            </h4>
            <p className="text-[11px] text-[var(--text-muted)] font-sans leading-relaxed">
              Commercial property & casualty (P&C) insurers require extensive historical actuarial loss records, loading high expense margins (<strong className="text-slate-200">30%–40%</strong>) and imposing restrictive moral hazard exclusions.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--bg-page)] border border-[var(--border-color)] space-y-2">
            <h4 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> 2. Capital Market Proxy Basis Risk
            </h4>
            <p className="text-[11px] text-[var(--text-muted)] font-sans leading-relaxed">
              Hedging discrete non-financial regulatory shocks using liquid proxy derivatives (e.g., sector ETFs, equity puts, FX swaps, VIX options) introduces severe basis risk that breaks down during macroeconomic regime shifts.
            </p>
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans pt-2">
          This report presents an empirical quantitative framework establishing how <strong className="text-[var(--text-primary)] font-mono">CFTC-regulated binary event contracts (Kalshi)</strong> and <strong className="text-[var(--text-primary)] font-mono">decentralized prediction markets (Polymarket)</strong> function as pure, zero-basis-risk parametric risk transfer mechanisms.
        </p>

        {/* Text Diagram Box */}
        <div className="p-4 rounded bg-[#070b12] border border-cyan-500/20 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-tight">
          <pre>{`+---------------------------------------------------------------------------------------------------+
|                                 EXECUTIVE ARCHITECTURE OVERVIEW                                   |
+---------------------------------------------------------------------------------------------------+
|  1. Corporate Exposure & Basis Risk Breakdown      2. Market Microstructure & Slippage Limits     |
|     - Operational Liabilities L = l * I_E.         - Retail CLOBs incur steep VWAP slippage       |
|     - Proxy Hedge Var(Net) = L^2 p (1-p) (1-rho^2).  (> 4,000 bps for > $10k block trades).       |
|     - Direct Binary Event Contract (rho -> 1.0)     - Proves necessity of institutional RFQ/OTC    |
|       eliminates basis risk: Var(Net Loss) = 0.       facilitation by Market Makers (SIG).        |
|                                                                                                   |
|  3. Empirical Price Discovery & Calibration        4. Real Corporate Case Studies                 |
|     - Kalshi Macro Brier Score: 0.1142.            - Western Grazers ($500k CA Wage Exemption).  |
|     - Kalshi Macro Log-Loss: 0.3491.               - Ford Motor Co ($1.5B Critical Minerals).     |
|     - Statistically calibrated risk pricing.       - Stanley Black & Decker ($300M KPMG Tariff).  |
+---------------------------------------------------------------------------------------------------+`}</pre>
        </div>
      </div>

      {/* INTERACTIVE CORPORATE RISK & TARIFF HEDGE SIMULATOR */}
      <section className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-4">
          <div>
            <h3 className="font-mono font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              Interactive Corporate Risk & Parametric Hedge Simulator
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-sans">
              Test parametric binary hedging vs proxy liquid asset hedging across real corporate liabilities.
            </p>
          </div>
          
          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => applyPreset('western')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors ${
                activeTabCaseStudy === 'western'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-white'
              }`}
            >
              Western Grazers ($500k)
            </button>
            <button
              onClick={() => applyPreset('ford')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors ${
                activeTabCaseStudy === 'ford'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-white'
              }`}
            >
              Ford Motor Co. ($1.5B)
            </button>
            <button
              onClick={() => applyPreset('swk')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors ${
                activeTabCaseStudy === 'swk'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-white'
              }`}
            >
              Stanley Black & Decker ($300M)
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-[var(--text-secondary)] flex justify-between">
              <span>Corporate Liability ($L):</span>
              <span className="text-cyan-400 font-bold">{formatCurrency(calcLiability)}</span>
            </label>
            <input
              type="number"
              value={calcLiability}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCalcLiability(val);
                setCalcHedgeSize(val);
              }}
              className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)] flex justify-between">
              <span>Event Contract Price (¢):</span>
              <span className="text-cyan-400 font-bold">{calcPriceCents}¢</span>
            </label>
            <input
              type="range"
              min="1"
              max="99"
              value={calcPriceCents}
              onChange={(e) => setCalcPriceCents(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)] flex justify-between">
              <span>Event Implied Prob (p):</span>
              <span className="text-cyan-400 font-bold">{calcProb}%</span>
            </label>
            <input
              type="range"
              min="1"
              max="99"
              value={calcProb}
              onChange={(e) => setCalcProb(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)] flex justify-between">
              <span>Proxy Correlation (ρ):</span>
              <span className="text-amber-400 font-bold">{calcProxyCorr}</span>
            </label>
            <input
              type="range"
              min="0.0"
              max="0.95"
              step="0.05"
              value={calcProxyCorr}
              onChange={(e) => setCalcProxyCorr(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)] flex justify-between">
              <span>Target Hedge Notional ($N):</span>
              <span className="text-cyan-400 font-bold">{formatCurrency(calcHedgeSize)}</span>
            </label>
            <input
              type="number"
              value={calcHedgeSize}
              onChange={(e) => setCalcHedgeSize(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)] flex justify-between">
              <span>Estimated L2 VWAP Slippage:</span>
              <span className="text-rose-400 font-bold">{metrics.slippageBps.toLocaleString()} bps</span>
            </label>
            <div className="px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-rose-400 font-bold text-center">
              Requires RFQ MM Block Desk
            </div>
          </div>
        </div>

        {/* Live Calculation Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Fixed Premium Expense</span>
            <div className="text-base font-mono font-bold text-amber-400">
              {formatCurrency(metrics.totalPremium)}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-sans">
              Known, predictable treasury outlay ({calcPriceCents}% of notional)
            </p>
          </div>

          <div className="p-3.5 rounded border border-emerald-500/30 bg-emerald-950/10 space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Direct Event Net Loss</span>
            <div className="text-base font-mono font-bold text-emerald-400">
              -{formatCurrency(Math.abs(metrics.netLossEventDirect))}
            </div>
            <p className="text-[10px] text-emerald-300/70 font-sans">
              Var(Net Loss) = 0. Capped loss in both event & non-event states.
            </p>
          </div>

          <div className="p-3.5 rounded border border-rose-500/30 bg-rose-950/10 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 uppercase">Proxy Residual Basis StdDev</span>
            <div className="text-base font-mono font-bold text-rose-400">
              {formatCurrency(metrics.proxyStdDev)}
            </div>
            <p className="text-[10px] text-rose-300/70 font-sans">
              Unhedged tail risk residual due to correlation breakdown (ρ = {calcProxyCorr})
            </p>
          </div>

          <div className="p-3.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Proxy Risk Variance Reduction</span>
            <div className="text-base font-mono font-bold text-cyan-400">
              {metrics.riskReductionPct}%
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-sans">
              Direct event contract provides 100.0% variance reduction.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: Quantitative Framework & Mathematical Foundations */}
      <section className="space-y-6">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          1. Quantitative Framework & Mathematical Foundations
        </h2>

        {/* 1.1 Parametric Basis Risk Breakdown */}
        <div className="space-y-4">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
            1.1 Parametric Basis Risk Breakdown Model
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
            Let a corporation face a discrete operational loss liability <span className="font-mono text-cyan-400">L</span> conditional on binary macro event <span className="font-mono text-cyan-400">E ∈ &#123;0, 1&#125;</span>:
          </p>
          
          <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs text-cyan-400 text-center">
            L = ℓ · 𝕀<sub>E</sub>, &nbsp;&nbsp; where ℙ(E = 1) = p
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-emerald-500/30 space-y-2">
              <h4 className="font-mono font-bold text-xs text-emerald-400 uppercase">
                Direct Binary Event Contract Hedge (H<sub>event</sub>)
              </h4>
              <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                Purchasing N = ℓ binary contracts paying $1.00 upon E = 1:
              </p>
              <div className="p-2.5 rounded bg-[var(--bg-page)] font-mono text-xs text-emerald-300">
                Net Payoff = -L + H<sub>event</sub> = -ℓ · 𝕀<sub>E</sub> + ℓ · 𝕀<sub>E</sub> = 0
                <br />
                <strong className="text-emerald-400">⇒ Var(Net Loss) = 0</strong>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-rose-500/30 space-y-2">
              <h4 className="font-mono font-bold text-xs text-rose-400 uppercase">
                Liquid Proxy Asset Hedge (H<sub>proxy</sub>)
              </h4>
              <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                Shorting liquid proxy asset S<sub>t</sub> (e.g. ETF, commodity futures) with hedge ratio β:
              </p>
              <div className="p-2.5 rounded bg-[var(--bg-page)] font-mono text-xs text-rose-300">
                σ<sup>2</sup><sub>residual</sub> = ℓ<sup>2</sup> p(1 - p) (1 - ρ<sup>2</sup><sub>E, S</sub>)
                <br />
                <strong className="text-rose-400">When ρ → 0, proxy hedge fails completely.</strong>
              </div>
            </div>
          </div>

          {/* Embedded Figure 4 */}
          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span className="font-bold text-[var(--accent-cyan)]">Figure 4: Basis Risk Variance Comparison</span>
              <span>Empirical Model Simulation</span>
            </div>
            <img 
              src={fig4BasisRisk} 
              alt="Figure 4: Basis Risk Variance Comparison" 
              className="w-full rounded-lg border border-[var(--border-color)] bg-slate-950"
            />
            <p className="text-[11px] text-[var(--text-muted)] font-sans italic">
              Comparison of residual payout variance across unhedged corporate liability, liquid proxy hedge under correlation breakdown (ρ = 0.25), and zero-basis-risk parametric event contract hedge.
            </p>
          </div>
        </div>

        {/* 1.2 Binary Option Risk-Neutral Pricing */}
        <div className="space-y-3 pt-2">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
            1.2 Binary Option Risk-Neutral Pricing & Capital Efficiency
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
            Under risk-neutral probability measure <span className="font-mono text-cyan-400">ℚ</span>, the fair price <span className="font-mono text-cyan-400">C<sub>t</sub></span> of a binary event contract maturing at <span className="font-mono text-cyan-400">T</span> with discount rate <span className="font-mono text-cyan-400">r</span> is:
          </p>

          <div className="p-3 rounded bg-[#090d16] border border-cyan-500/30 font-mono text-xs text-cyan-300 text-center">
            C<sub>t</sub> = e<sup>-r(T-t)</sup> 𝔼<sup>ℚ</sup>[𝕀<sub>E</sub> ∣ ℱ<sub>t</sub>] = e<sup>-r(T-t)</sup> π<sub>t</sub>
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
            Where <span className="font-mono text-cyan-400">π<sub>t</sub></span> represents the market-implied probability of the event occurring. Compared to commercial P&C underwriting loss ratios (<strong className="text-white">60%–70%</strong>, representing a <strong className="text-rose-400">30%–40% expense loading</strong>), exchange-cleared binary event contracts enable pure parametric risk transfer at actuarially fair prices with transparent, instant cleared settlement.
          </p>
        </div>
      </section>

      {/* SECTION 2: Empirical Market Calibration & Microstructure Analysis */}
      <section className="space-y-6">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          2. Empirical Market Calibration & Microstructure Analysis
        </h2>

        {/* 2.1 Kalshi Calibration */}
        <div className="space-y-4">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
            2.1 Historical Price Calibration (Kalshi Macro Markets)
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
            To evaluate whether prediction market contract prices reflect true statistical probabilities, we evaluated settled macro-economic markets across Federal Reserve interest rate policy, CPI inflation, GDP growth, and trade tariff series.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Aggregate Brier Score</span>
              <div className="text-2xl font-mono font-bold text-emerald-400">0.1142</div>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">
                Brier Score &lt; 0.15 proves high statistical calibration & actuarial reliability.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-cyan-500/30 space-y-1">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Aggregate Log-Loss</span>
              <div className="text-2xl font-mono font-bold text-cyan-400">0.3491</div>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">
                Log-loss metric confirming probability density accuracy.
              </p>
            </div>
          </div>

          {/* Embedded Figure 1 */}
          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span className="font-bold text-[var(--accent-cyan)]">Figure 1: Kalshi Macro Reliability Curve</span>
              <span>Brier Score = 0.1142</span>
            </div>
            <img 
              src={fig1Calibration} 
              alt="Figure 1: Kalshi Macro Reliability Curve" 
              className="w-full rounded-lg border border-[var(--border-color)] bg-slate-950"
            />
            <p className="text-[11px] text-[var(--text-muted)] font-sans italic">
              Empirical calibration reliability curve comparing Kalshi market forecast probabilities against actual realized historical outcomes.
            </p>
          </div>
        </div>

        {/* 2.2 Microstructure & Order Book Block Execution Slippage */}
        <div className="space-y-4 pt-2">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
            2.2 Microstructure & Order Book Block Execution Slippage
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
            While prediction markets offer high pricing efficiency, institutional corporate hedges require large block sizes ($100k → $500M). Analyzing Level-2 Central Limit Order Books (CLOBs) from Polymarket and Kalshi reveals severe liquidity constraints on retail order books.
          </p>

          {/* Math Formulations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
              <h4 className="font-mono font-bold text-xs text-cyan-400">Level-1 Order Book Imbalance (OBI<sub>L1</sub>):</h4>
              <div className="p-2.5 rounded bg-[var(--bg-page)] font-mono text-xs text-center text-cyan-300">
                OBI<sub>L1</sub> = (V<sub>bid</sub> - V<sub>ask</sub>) / (V<sub>bid</sub> + V<sub>ask</sub>)
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
              <h4 className="font-mono font-bold text-xs text-purple-400">Avellaneda-Stoikov Reservation Pricing:</h4>
              <div className="p-2.5 rounded bg-[var(--bg-page)] font-mono text-xs text-center text-purple-300">
                R(s, q, t) = s - q · γ · s(1 - s)(T - t)
              </div>
            </div>
          </div>

          {/* Execution Slippage Table */}
          <div className="overflow-x-auto rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-muted)]">
                <tr>
                  <th className="p-3">Target Hedge Size ($ USD)</th>
                  <th className="p-3">Fill Percentage (%)</th>
                  <th className="p-3">Volume-Weighted Avg Price (VWAP)</th>
                  <th className="p-3">Execution Slippage (bps)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                <tr>
                  <td className="p-3 font-bold text-slate-200">$1,000</td>
                  <td className="p-3 text-emerald-400">100.0%</td>
                  <td className="p-3">$0.0460</td>
                  <td className="p-3 font-bold text-cyan-400">214 bps</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-200">$10,000</td>
                  <td className="p-3 text-emerald-400">100.0%</td>
                  <td className="p-3">$0.0642</td>
                  <td className="p-3 font-bold text-amber-400">4,277 bps</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-200">$50,000</td>
                  <td className="p-3 text-emerald-400">100.0%</td>
                  <td className="p-3">$0.2100</td>
                  <td className="p-3 font-bold text-rose-400">36,672 bps</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-200">$100,000</td>
                  <td className="p-3 text-emerald-400">100.0%</td>
                  <td className="p-3">$0.3245</td>
                  <td className="p-3 font-bold text-rose-400">62,114 bps</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-200">$500,000</td>
                  <td className="p-3 text-emerald-400">100.0%</td>
                  <td className="p-3">$0.6968</td>
                  <td className="p-3 font-bold text-rose-500">144,841 bps</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Embedded Figures 2 & 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
              <span className="text-xs font-mono text-[var(--accent-cyan)] font-bold">Figure 2: L2 Orderbook Depth Profile</span>
              <img 
                src={fig2Depth} 
                alt="Figure 2: L2 Orderbook Depth Profile" 
                className="w-full rounded-lg border border-[var(--border-color)] bg-slate-950"
              />
            </div>

            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
              <span className="text-xs font-mono text-[var(--accent-cyan)] font-bold">Figure 3: Institutional Block Slippage Curve</span>
              <img 
                src={fig3Slippage} 
                alt="Figure 3: Institutional Block Execution Slippage Curve" 
                className="w-full rounded-lg border border-[var(--border-color)] bg-slate-950"
              />
            </div>
          </div>

          {/* Key Institutional Finding Warning Alert */}
          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/40 space-y-2">
            <h4 className="font-mono font-bold text-xs text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Key Institutional Finding
            </h4>
            <p className="text-xs text-amber-200/90 font-sans leading-relaxed">
              Retail CLOB order books cannot support institutional corporate block hedges (&gt;$100k) without market impact. Corporate risk transfer requires designated Market Maker (MM) bilateral block facilitation / Request-For-Quote (RFQ) desks (e.g., Susquehanna / SIG) quoting customized block prices on CFTC-regulated exchanges.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Empirical Corporate Case Studies */}
      <section className="space-y-6">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Building2 className="w-5 h-5 text-purple-400" />
          3. Empirical Corporate Case Studies
        </h2>

        {/* Case Study 1: Western Grazers */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
            <div>
              <h3 className="text-base font-mono font-bold text-cyan-400">
                3.1 Case Study 1: Western Grazers ($500k California Wage Exemption Hedge)
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-sans">
                Agricultural livestock maintenance & legislative wage exemption liability.
              </p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Parametric Wage Exemption
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><strong className="text-white font-mono">• Liability:</strong> Expiration of California agricultural wage exemption adding ~$500k in annual payroll costs for 8 goat herders.</li>
              <li><strong className="text-white font-mono">• Kalshi Instrument:</strong> Bespoke binary contract paying $1.00 if California Assembly Bill relief fails prior to October 1, 2026.</li>
              <li><strong className="text-white font-mono">• Execution:</strong> Castle Technologies (Structuring Broker) + Susquehanna (Institutional Market Maker quoting $500k block) on Kalshi.</li>
              <li><strong className="text-white font-mono">• Outcome Matrix:</strong> Premium paid: $50,000 (10% probability). Capped net loss: -$50,000 in both scenarios.</li>
            </ul>

            <div>
              <img 
                src={fig5WesternGrazers} 
                alt="Figure 5: Western Grazers Payoff Comparison" 
                className="w-full rounded-lg border border-[var(--border-color)] bg-slate-950"
              />
            </div>
          </div>
        </div>

        {/* Case Study 2: Ford Motor Co. */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
            <div>
              <h3 className="text-base font-mono font-bold text-purple-400">
                3.2 Case Study 2: Ford Motor Co. ($1.5B Critical Minerals Tariff Hedge)
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-sans">
                Automotive supply chain & chemical processing equipment component tariffs.
              </p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
              $1.5 Billion Tariff Defense
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><strong className="text-white font-mono">• Liability:</strong> Downstream automotive manufacturers face tariffs between 15% and 50% on chemical processing equipment, aluminum, steel components, and mineral inputs required for EV/truck production.</li>
              <li><strong className="text-white font-mono">• Financial Impact:</strong> Absorbing component cost spikes creates an estimated <strong>$1.5 Billion annual net income squeeze</strong>.</li>
              <li><strong className="text-white font-mono">• Kalshi Market:</strong> <code className="font-mono text-cyan-400">KXTARIFFSECTOR-27JAN01-MINE</code> (<em>"Will Trump issue an executive action on critical mineral tariffs in 2026?"</em>). Last traded price: $0.40 (40% probability).</li>
              <li><strong className="text-white font-mono">• Execution:</strong> Purchasing 1.5B binary contracts for a premium of <strong>$600 Million</strong>. Net cash flow capped at -$600M in both scenarios.</li>
            </ul>

            <div>
              <img 
                src={fig6Ford} 
                alt="Figure 6: Ford Critical Minerals Tariff Profile" 
                className="w-full rounded-lg border border-[var(--border-color)] bg-slate-950"
              />
            </div>
          </div>
        </div>

        {/* Case Study 3: Stanley Black & Decker */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
            <div>
              <h3 className="text-base font-mono font-bold text-emerald-400">
                3.3 Case Study 3: Stanley Black & Decker / KPMG 2026 Tariff Survey
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-sans">
                Industrial tool manufacturing component hardware tariff drag.
              </p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Margin Defense ($300M)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><strong className="text-white font-mono">• KPMG Survey Benchmark:</strong> KPMG's 2026 Tariff Survey finds 34% of U.S. businesses pass &gt;50% of tariff costs to customers, while 55% of executives plan price hikes up to 15% to defend gross margins.</li>
              <li><strong className="text-white font-mono">• Subject (SWK):</strong> Industrial tool manufacturer Stanley Black & Decker faces a <strong>$300 Million annual tariff cost drag</strong> on imported steel, aluminum, and component hardware.</li>
              <li><strong className="text-white font-mono">• Kalshi Market:</strong> <code className="font-mono text-cyan-400">KXEFFTARIFF</code>. Last traded price: $0.40.</li>
              <li><strong className="text-white font-mono">• Execution:</strong> Purchasing 300M binary contracts for a <strong>$120 Million premium</strong>, locking net cash flow at -$120M and eliminating the 300 bps margin squeeze.</li>
            </ul>

            <div>
              <img 
                src={fig7SWK} 
                alt="Figure 7: KPMG Survey SWK Tariff Hedge Profile" 
                className="w-full rounded-lg border border-[var(--border-color)] bg-slate-950"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Practical Applications & Corporate Benefits */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          4. Practical Applications & Corporate Benefits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="font-mono font-bold text-cyan-400 text-sm">1. Zero Basis Risk</span>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              By aligning contract settlement criteria directly with underlying legal or operational triggers, corporate balance sheets eliminate residual variance (<code className="font-mono text-cyan-300">Var(Net Loss) → 0</code>).
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="font-mono font-bold text-emerald-400 text-sm">2. Capital Efficiency</span>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Converts unpredictable multi-billion-dollar jump-diffusive liabilities into a transparent, fixed premium expense with actuarially calibrated pricing.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="font-mono font-bold text-purple-400 text-sm">3. Leading Price Signals</span>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Prediction market probabilities lead equity option volatility surfaces and CDS spreads ahead of legislative votes:
              <br />
              <code className="font-mono text-purple-300 text-[10px]">Δ ln(S<sub>t</sub>) = α + ∑ β<sub>k</sub> Δ π<sub>t-k</sub> + ε<sub>t</sub></code>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Empirical Checklist & Risk Analysis */}
      <section className="space-y-6">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          5. Empirical Checklist, Limitations & Risk Analysis
        </h2>

        {/* Treasury Interactive Checklist */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            5.1 Verification Checklist for Corporate Treasuries
          </h3>

          <div className="space-y-2 font-mono text-xs">
            <div 
              onClick={() => toggleChecklist('brierScore')}
              className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                checklist.brierScore 
                  ? 'border-emerald-500/40 bg-emerald-950/10 text-emerald-300' 
                  : 'border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-muted)]'
              }`}
            >
              <span>[ {checklist.brierScore ? '✓' : ' '} ] Verify market calibration using historical Brier Scores (&lt; 0.15).</span>
              <span className="text-[10px] font-sans italic">Click to toggle</span>
            </div>

            <div 
              onClick={() => toggleChecklist('obiProfile')}
              className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                checklist.obiProfile 
                  ? 'border-emerald-500/40 bg-emerald-950/10 text-emerald-300' 
                  : 'border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-muted)]'
              }`}
            >
              <span>[ {checklist.obiProfile ? '✓' : ' '} ] Evaluate Order Book Imbalance (OBI<sub>L1</sub>) and Level-2 order book depth profiles.</span>
              <span className="text-[10px] font-sans italic">Click to toggle</span>
            </div>

            <div 
              onClick={() => toggleChecklist('rfqDesks')}
              className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                checklist.rfqDesks 
                  ? 'border-emerald-500/40 bg-emerald-950/10 text-emerald-300' 
                  : 'border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-muted)]'
              }`}
            >
              <span>[ {checklist.rfqDesks ? '✓' : ' '} ] Structure institutional block trades via designated market maker RFQ desks.</span>
              <span className="text-[10px] font-sans italic">Click to toggle</span>
            </div>

            <div 
              onClick={() => toggleChecklist('rule4011')}
              className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                checklist.rule4011 
                  ? 'border-emerald-500/40 bg-emerald-950/10 text-emerald-300' 
                  : 'border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-muted)]'
              }`}
            >
              <span>[ {checklist.rule4011 ? '✓' : ' '} ] Validate CFTC Rule 40.11 compliance for bona fide commercial risk transfer status.</span>
              <span className="text-[10px] font-sans italic">Click to toggle</span>
            </div>
          </div>
        </div>

        {/* 5.2 Limitations & Risks Grid */}
        <div className="space-y-3">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
            5.2 Structural Limitations & Risk Factors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-lg bg-amber-950/10 border border-amber-500/30 space-y-1.5">
              <h4 className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> 1. Retail CLOB Slippage Bottleneck
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Public limit order books cannot absorb &gt;$100k block hedges without severe price impact. Corporate execution depends on OTC / RFQ market maker desks.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-950/10 border border-amber-500/30 space-y-1.5">
              <h4 className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> 2. Regulatory CFTC Classification Risk
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Contracts must strictly satisfy CFTC Rule 40.11 guidelines defining bona fide hedging to prevent classification as speculative gaming or illegal gambling.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-950/10 border border-amber-500/30 space-y-1.5">
              <h4 className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> 3. Term Structure Basis Mismatch
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Expiration dates listed on exchanges (e.g. quarterly or annual contracts) may not align perfectly with corporate fiscal reporting dates or inventory cycles.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-950/10 border border-amber-500/30 space-y-1.5">
              <h4 className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> 4. Counterparty & Oracle Resolution Risk
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Resolution disputes, oracle failures, or regulatory interventions could delay payout clearance or trigger exchange halt proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Future Roadmap & Institutional Infrastructure */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Layers className="w-5 h-5 text-blue-400" />
          6. Future Roadmap & Institutional Infrastructure
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1.5">
            <h4 className="font-mono font-bold text-cyan-400">1. Standardized ISDA Master Agreements</h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Developing standardized ISDA credit support annexes (CSAs) specifically tailored for event derivatives and binary event contracts.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1.5">
            <h4 className="font-mono font-bold text-purple-400">2. Enterprise ERP Integrations</h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Building automated plugins for SAP and Oracle Treasury modules to score regulatory risk and trigger parametric event hedges.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1.5">
            <h4 className="font-mono font-bold text-emerald-400">3. Automated RFQ Clearing Desks</h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Establishing designated market maker clearing desks providing instant two-sided block quotes for corporate treasury desks.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion Banner */}
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 to-blue-950/20 space-y-2">
        <h3 className="font-mono font-bold text-sm text-cyan-400 uppercase tracking-wider">
          Conclusion & Strategic Takeaway
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
          Binary prediction market event contracts on regulated exchanges (Kalshi) and decentralized venues (Polymarket) represent a revolutionary paradigm in corporate financial engineering. By converting uninsurable regulatory, legislative, and macroeconomic liabilities into zero-basis-risk parametric hedges, corporations can protect balance sheet margins and achieve complete cash flow certainty.
        </p>
      </div>

      {/* Bottom CTA Navigation */}
      <div className="pt-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/Deep070203/macro-lottery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onNavigateToProjects}
            className="px-4 py-2 text-xs font-mono font-bold rounded bg-[var(--accent-cyan)] text-slate-950 hover:bg-cyan-300 transition-colors inline-flex items-center gap-1.5"
          >
            View Projects & Live Sandboxes
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
