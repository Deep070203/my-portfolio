import React, { useState, useMemo } from 'react';
import { 
  Clock, Zap, Layers, Calculator, Code, ShieldCheck, 
  TrendingUp, ArrowLeft, ArrowRight 
} from 'lucide-react';

export default function BtcPredictionMarketPost({ onBack, onNavigateToProjects }) {
  // Interactive Calculator State inside HFT article
  const [calcSpot, setCalcSpot] = useState(96450);
  const [calcStrike, setCalcStrike] = useState(96400);
  const [calcContractPrice, setCalcContractPrice] = useState(48); // 48 cents
  const [calcQuantity, setCalcQuantity] = useState(50);
  const [calcBidQty, setCalcBidQty] = useState(120);
  const [calcAskQty, setCalcAskQty] = useState(45);

  // Exact Kalshi Fee Calculation
  const feeMetrics = useMemo(() => {
    const p = calcContractPrice / 100;
    const rawFee = 0.07 * calcQuantity * p * (1.0 - p);
    const feeInCents = Math.ceil(rawFee * 100) / 100;
    const feePerContract = (feeInCents / Math.max(1, calcQuantity)).toFixed(3);
    
    // Order Book Imbalance (OBI) = (Bids - Asks) / (Bids + Asks)
    const totalDepth = calcBidQty + calcAskQty;
    const obi = totalDepth > 0 ? (calcBidQty - calcAskQty) / totalDepth : 0;
    
    // Implied Win Probability approximation
    const spotDiff = calcSpot - calcStrike;
    const distanceBonus = (spotDiff / 100) * 8; // ~8c per $100 spot distance
    const estProbability = Math.max(1, Math.min(99, Math.round(50 + distanceBonus)));
    
    // Expected Value per contract
    const winPayoff = 100 - calcContractPrice;
    const lossPayoff = -calcContractPrice;
    const expectedValue = (estProbability / 100) * winPayoff + ((100 - estProbability) / 100) * lossPayoff - parseFloat(feePerContract);

    return {
      feeInCents,
      feePerContract,
      obi: obi.toFixed(3),
      estProbability,
      expectedValue: expectedValue.toFixed(2),
      spotDiff
    };
  }, [calcSpot, calcStrike, calcContractPrice, calcQuantity, calcBidQty, calcAskQty]);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Back Button Navigation */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </button>
        <span className="text-xs font-mono text-[var(--text-muted)]">
          Standalone Report Component
        </span>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--accent-cyan)]">
          <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30">
            Quantitative Finance & Rust HFT
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5" /> 15 min read
          </span>
          <span>•</span>
          <span className="text-[var(--text-muted)]">August 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          High-Frequency Prediction Market Arbitrage & Market Making Engine
        </h1>
        <h2 className="text-lg font-mono text-[var(--text-secondary)] font-medium">
          Quantitative Research & Architectural Writeup
        </h2>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs">
            DS
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-[var(--text-primary)]">Deep Shah</h4>
            <p className="text-[11px] font-mono text-[var(--text-muted)]">SDE II @ UPS | MIDS Candidate @ UC Berkeley</p>
          </div>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
        <h3 className="font-mono font-bold text-sm text-[var(--accent-cyan)] uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4" /> Executive Summary
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
          This project is a high-performance, ultra-low-latency quantitative trading system written in <strong className="text-[var(--text-primary)] font-mono">Rust</strong> designed to trade Bitcoin binary options and event contracts on <strong className="text-[var(--text-primary)] font-mono">Kalshi</strong> and <strong className="text-[var(--text-primary)] font-mono">Polymarket</strong>.
        </p>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
          Trading binary contracts expiring every 15 minutes (<code className="font-mono text-cyan-400">KXBTC15M</code>) and hourly (<code className="font-mono text-cyan-400">KXBTCD</code>) presents unique mathematical and microstructural challenges: extreme non-linear payoff functions (digital options delta/gamma explosions), tight expiry windows, non-linear exchange fee schedules, and severe orderbook spread dynamics.
        </p>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
          To gain an edge in this market, the codebase evolves across four key execution binaries—moving from simple directional bets to multi-exchange latency arbitrage, order book imbalance (OBI) tracking on Kraken L3 feeds, Z-score drift models, and dynamic strike bracket arbitrage.
        </p>
      </div>

      {/* Interactive Fee & Microstructure Calculator */}
      <section className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-4">
          <div>
            <h3 className="font-mono font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              Interactive Quant Fee & OBI Simulator
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-sans">
              Test Kalshi non-linear fee drag <code className="font-mono text-amber-400">Fee = ⌈0.07 × N × P(1-P)⌉</code> and Orderbook Imbalance (OBI) in real time.
            </p>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
            Live Math Engine
          </span>
        </div>

        {/* Simulator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-[var(--text-secondary)]">Spot BTC Price ($):</label>
            <input
              type="number"
              value={calcSpot}
              onChange={(e) => setCalcSpot(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)]">Strike Price ($):</label>
            <input
              type="number"
              value={calcStrike}
              onChange={(e) => setCalcStrike(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)]">Contract Price (¢): {calcContractPrice}¢</label>
            <input
              type="range"
              min="1"
              max="99"
              value={calcContractPrice}
              onChange={(e) => setCalcContractPrice(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)]">Contract Quantity (N):</label>
            <input
              type="number"
              value={calcQuantity}
              onChange={(e) => setCalcQuantity(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)]">Bid Depth (Contracts):</label>
            <input
              type="number"
              value={calcBidQty}
              onChange={(e) => setCalcBidQty(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--text-secondary)]">Ask Depth (Contracts):</label>
            <input
              type="number"
              value={calcAskQty}
              onChange={(e) => setCalcAskQty(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
          </div>
        </div>

        {/* Calculated Results Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Kalshi Fee Drag</span>
            <div className="text-base font-mono font-bold text-amber-400">
              ${feeMetrics.feeInCents} <span className="text-[11px] text-[var(--text-muted)]">({feeMetrics.feePerContract}¢/c)</span>
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Orderbook Imbalance</span>
            <div className={`text-base font-mono font-bold ${
              Number(feeMetrics.obi) > 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {feeMetrics.obi > 0 ? `+${feeMetrics.obi}` : feeMetrics.obi}
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Implied Win Prob.</span>
            <div className="text-base font-mono font-bold text-cyan-400">
              {feeMetrics.estProbability}%
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Expected Value (EV)</span>
            <div className={`text-base font-mono font-bold ${
              Number(feeMetrics.expectedValue) >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {feeMetrics.expectedValue > 0 ? `+$${feeMetrics.expectedValue}` : `$${feeMetrics.expectedValue}`}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: System Architecture & High-Frequency Pipeline */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          1. System Architecture & High-Frequency Pipeline
        </h2>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
          The engine is engineered for low latency, determinism, and async concurrency using Tokio, Tungstenite WebSockets, and thread-safe lock-free state primitives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase">Data Ingestion</span>
            <h4 className="font-bold text-[var(--text-primary)]">Kraken L3 & Binance WS</h4>
            <p className="text-[11px] text-[var(--text-muted)] font-sans">Kraken L3 Depth & Whales, Binance/Coinbase Spot, Kalshi Orderbook Deltas.</p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Feature Engine</span>
            <h4 className="font-bold text-[var(--text-primary)]">OBI Tracker & Z-Score</h4>
            <p className="text-[11px] text-[var(--text-muted)] font-sans">Order Book Imbalance (OBI), 15m Realized Volatility, CME BRTI Synthetic Proxy, 60s Settlement Predictor.</p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="text-[10px] font-bold text-purple-400 uppercase">Strategy Logic</span>
            <h4 className="font-bold text-[var(--text-primary)]">4 Rust Binaries</h4>
            <p className="text-[11px] text-[var(--text-muted)] font-sans">15m 4¢ Reversal, 15m 95¢ Dual-Regime, 15m L3 Microstructure, Hourly Bracket Stat-Arb.</p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase">Execution & Risk</span>
            <h4 className="font-bold text-[var(--text-primary)]">Fee Engine & Pre-Trade Risk</h4>
            <p className="text-[11px] text-[var(--text-muted)] font-sans">Exact Kalshi Fee calculation, Circuit Breakers, Pre-Trade Risk Limits, IOC Taker Router.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Full Strategy & Research Breakdown */}
      <section className="space-y-8">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Code className="w-5 h-5 text-purple-400" />
          2. In-Depth Strategy & Research Breakdown
        </h2>

        {/* Strategy 1 */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-mono font-bold text-cyan-400">
              Strategy 1: <code className="text-white">trade_btc_15m_4c.rs</code> — Asymmetric Low-Cost Reversal Engine (High Gamma)
            </h3>
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Risk 4¢ / Payoff 96¢ (25x)
            </span>
          </div>

          <ul className="text-xs text-[var(--text-secondary)] space-y-3 font-sans leading-relaxed">
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Core Research Focus:</strong> Exploiting asymmetric payoffs in out-of-the-money (OTM) binary contracts during high-volatility regime shifts.
            </li>
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Market Mechanics:</strong> Binary options settle at either 100¢ (YES) or 0¢ (NO). When an option is deep OTM, it trades at 3¢ - 4¢. If spot price experiences a sudden micro-reversal, the contract value surges toward 50¢ - 100¢, providing up to a 25x risk-to-reward ratio.
            </li>
          </ul>

          <div className="p-4 rounded bg-[var(--bg-page)] border border-[var(--border-color)] font-mono text-xs space-y-2">
            <span className="text-cyan-400 font-bold">Quantitative Trigger Rules:</span>
            <ol className="list-decimal pl-4 text-[var(--text-secondary)] space-y-1">
              <li><strong>Expiry Window:</strong> Active only in the final 7 minutes (T ≤ 420s).</li>
              <li><strong>Price Distance (Δ):</strong> $50 ≤ |Spot - Strike| ≤ $250.</li>
              <li><strong>Volatility Filter:</strong> 15-minute rolling realized volatility σ₁₅ₘ &gt; $150.</li>
              <li><strong>Cost Ceiling:</strong> Asymmetric entry priced strictly ≤ 4¢ with tight bid-ask spread (Ask - Bid ≤ 3¢).</li>
            </ol>
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-sans">
            <strong className="text-[var(--text-primary)] font-mono">Execution & Risk Management:</strong> Uses Immediate-or-Cancel (IOC) taker orders to eliminate queue latency. Features an automated <strong>Panic Exit</strong> module: if average position cost is high (&ge; 97¢) and bid liquidity drops below 65¢, the bot dumps position to cap tail risk.
          </p>
        </div>

        {/* Strategy 2 */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-mono font-bold text-purple-400">
              Strategy 2: <code className="text-white">trade_btc_15m_95c.rs</code> — Bifurcated Dual-Regime Trading Engine
            </h3>
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
              Dual-Regime (Long/Short Gamma)
            </span>
          </div>

          <ul className="text-xs text-[var(--text-secondary)] space-y-3 font-sans leading-relaxed">
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Core Research Focus:</strong> Dynamic switching between Mean-Reverting Tail Risk (Long Gamma) and High-Probability Trend Continuation (Short Gamma).
            </li>
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Market Mechanics:</strong> Binary option deltas exhibit extreme clustering near expiry. When spot is far from strike or volatility is suppressed, probability approaches binary saturation (98¢ - 99¢). Conversely, when volatility is expanding near the strike boundary, mean-reversing trades dominate.
            </li>
          </ul>

          <div className="p-4 rounded bg-[var(--bg-page)] border border-[var(--border-color)] font-mono text-xs space-y-2">
            <span className="text-purple-400 font-bold">Bifurcated Model Formulations:</span>
            <ul className="list-disc pl-4 text-[var(--text-secondary)] space-y-2">
              <li>
                <strong>Regime A (High-Vol Reversal):</strong> <code className="text-cyan-400">|Δ| ∈ [50, 250] AND σ₁₅ₘ &gt; 150 ⇒ Buy Ask ≤ 4¢</code>
              </li>
              <li>
                <strong>Regime B (Trend Continuation / Saturation):</strong> <code className="text-cyan-400">|Δ| &gt; 250 OR (|Δ| &gt; 100 AND σ₁₅ₘ &lt; 50) ⇒ Buy Ask ≥ 98¢</code>
              </li>
              <li>
                <strong>Regime C (Late Theta-Decay Capture):</strong> <code className="text-cyan-400">T ≤ 240s AND |Δ| &gt; 115 AND σ₁₅ₘ &lt; 75 ⇒ Buy Ask ≥ 98¢</code>
              </li>
            </ul>
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-sans">
            <strong className="text-[var(--text-primary)] font-mono">Order Book Depth Sweeper:</strong> Implements custom <code className="font-mono text-cyan-400">fill_order()</code> logic that parses 100 limit price levels in the orderbook snapshot, evaluating real-time order fill matching and slippage against the exact Kalshi fee schedule.
          </p>
        </div>

        {/* Strategy 3 */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-mono font-bold text-emerald-400">
              Strategy 3: <code className="text-white">trade_btc_15m_v2.rs</code> — Microstructure Execution with Kraken L3 & Whale Analytics
            </h3>
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              L3 Order Book Imbalance
            </span>
          </div>

          <ul className="text-xs text-[var(--text-secondary)] space-y-3 font-sans leading-relaxed">
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Core Research Focus:</strong> Order Book Imbalance (OBI), Level 3 market depth feeds, and institutional order flow detection as leading indicators for spot breakout direction.
            </li>
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Market Mechanics:</strong> Spot ticker prices reflect executed trades (lagging). Limit order additions, cancellations, and large block sweeps (Whales) on Level 3 exchanges (Kraken) signal informed directional flow <em>before</em> spot price moves across strike thresholds.
            </li>
          </ul>

          <div className="p-4 rounded bg-[var(--bg-page)] border border-[var(--border-color)] font-mono text-xs space-y-3">
            <span className="text-emerald-400 font-bold">Microstructure Innovations:</span>
            <ul className="list-disc pl-4 text-[var(--text-secondary)] space-y-2">
              <li>
                <strong>Order Book Imbalance (OBI):</strong> Calculated tick-by-tick across top levels:
                <div className="my-1 text-cyan-400">OBI = (∑ Q_bids - ∑ Q_asks) / (∑ Q_bids + ∑ Q_asks) ∈ [-1.0, 1.0]</div>
              </li>
              <li>
                <strong>Whale Order Detection:</strong> Real-time identification of institutional liquidity blocks (&gt; $50,000 volume fills/cancels) on Kraken L3 stream within a rolling 30-second window.
              </li>
              <li>
                <strong>Signal Confirmation Filter:</strong> Prevents whipsaws and high-frequency noise by requiring directional price divergence to persist continuously for at least 4 seconds before generating an execution signal.
              </li>
            </ul>
          </div>
        </div>

        {/* Strategy 4 */}
        <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-mono font-bold text-blue-400">
              Strategy 4: <code className="text-white">trade_btc_hourly_v2.rs</code> — Hourly Multi-Strike Bracket Arbitrage & Z-Score Engine
            </h3>
            <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
              Multi-Strike Stat-Arb
            </span>
          </div>

          <ul className="text-xs text-[var(--text-secondary)] space-y-3 font-sans leading-relaxed">
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Core Research Focus:</strong> Statistical arbitrage and dynamic strike bracket migration on hourly BTC binary contracts (<code className="font-mono text-cyan-400">KXBTCD</code>).
            </li>
            <li>
              <strong className="text-[var(--text-primary)] font-mono">Market Mechanics:</strong> Hourly contracts feature multiple strike brackets. By subscribing concurrently to bounding strikes [K_low, K_high], the engine models joint probability distributions, volatility skew, and boundary departures.
            </li>
          </ul>

          <div className="p-4 rounded bg-[var(--bg-page)] border border-[var(--border-color)] font-mono text-xs space-y-3">
            <span className="text-blue-400 font-bold">Key Algorithmic Components:</span>
            <ol className="list-decimal pl-4 text-[var(--text-secondary)] space-y-2">
              <li>
                <strong>CME BRTI Synthetic Proxy:</strong> Real-time weighted aggregation across Binance, Kraken, Coinbase, and OKX feeds to mirror CME Bitcoin Reference Rate calculation prior to index publication.
              </li>
              <li>
                <strong>Rolling Z-Score Drift Model:</strong>
                <div className="my-1 text-cyan-400">Z = (Δ_spot - μ_Δ,15m) / σ_Δ,15m</div>
                Evaluates statistical significance of spot moves relative to strike boundaries to prevent false breakout entries.
              </li>
              <li>
                <strong>Dynamic Bracket Migration:</strong> Automatically monitors spot departures outside [K_low - buffer, K_high + buffer]. When spot breaks out of range, the stream seamlessly tears down WS connections and re-discovers active strike brackets without missing a tick.
              </li>
              <li>
                <strong>60-Second Settlement Predictor:</strong> Models Kalshi’s official 60-second settlement averaging formula to calculate the exact per-second spot price needed for contract settlement.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION 3: Mathematical Foundations & Microstructure Models */}
      <section className="space-y-6">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Calculator className="w-5 h-5 text-amber-400" />
          3. Mathematical Foundations & Microstructure Models
        </h2>

        <div className="space-y-4">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
            A. Non-Linear Kalshi Fee Math
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
            Kalshi imposes a non-linear fee structure based on contract price <span className="font-mono text-cyan-400">P</span> (in dollars) and number of contracts <span className="font-mono text-cyan-400">N</span>:
          </p>
          <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs text-amber-400 text-center">
            Fee(P, N) = ⌈0.07 × N × P × (1 - P)⌉
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
            Standard fixed-fee assumptions fail severely near P = 50¢, where fee drag peaks at 1.75¢ per contract. The codebase integrates <code className="font-mono text-cyan-400">kalshi_fee_exact()</code> into all pre-trade EV calculations:
          </p>

          <div className="relative p-5 rounded-lg border border-[var(--border-color)] bg-[#090d16] font-mono text-xs overflow-x-auto text-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] border-b border-slate-800 pb-2">
              <span>src/fee.rs — Exact Pre-Trade Fee Calculation</span>
              <span className="text-amber-400">Rust 2024</span>
            </div>
            <pre className="text-xs leading-relaxed font-mono">
{`pub fn kalshi_fee_exact(price_cents: u16) -> f64 {
    let p = price_cents as f64 / 100.0;
    let fee = 0.07 * p * (1.0 - p);
    (fee * 100.0).ceil() / 100.0
}`}
            </pre>
          </div>
        </div>

        {/* Strategy Comparison Matrix Table */}
        <div className="space-y-4 pt-2">
          <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
            B. Strategy Comparison Matrix
          </h3>

          <div className="overflow-x-auto rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-muted)]">
                <tr>
                  <th className="p-3">Strategy File</th>
                  <th className="p-3">Time Horizon</th>
                  <th className="p-3">Volatility Target</th>
                  <th className="p-3">Key Microstructure Feature</th>
                  <th className="p-3">Risk / Reward Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                <tr className="hover:bg-[var(--bg-page)]/50 transition-colors">
                  <td className="p-3 font-bold text-cyan-400">trade_btc_15m_4c.rs</td>
                  <td className="p-3">15 Mins (T ≤ 7m)</td>
                  <td className="p-3 text-emerald-400">High (σ &gt; $150)</td>
                  <td className="p-3">Orderbook Spread ≤ 3¢</td>
                  <td className="p-3 font-bold text-emerald-400">Asymmetric (Risk 4¢, Gain 96¢)</td>
                </tr>
                <tr className="hover:bg-[var(--bg-page)]/50 transition-colors">
                  <td className="p-3 font-bold text-purple-400">trade_btc_15m_95c.rs</td>
                  <td className="p-3">15 Mins (T ≤ 7m)</td>
                  <td className="p-3">Dual (High / Low)</td>
                  <td className="p-3">100-Level Depth Parsing</td>
                  <td className="p-3">High Probability / Low Margin</td>
                </tr>
                <tr className="hover:bg-[var(--bg-page)]/50 transition-colors">
                  <td className="p-3 font-bold text-emerald-400">trade_btc_15m_v2.rs</td>
                  <td className="p-3">15 Mins (T ≤ 15m)</td>
                  <td className="p-3">Any</td>
                  <td className="p-3">Kraken L3 OBI & Whales</td>
                  <td className="p-3">Signal-Confirmed Flow Execution</td>
                </tr>
                <tr className="hover:bg-[var(--bg-page)]/50 transition-colors">
                  <td className="p-3 font-bold text-blue-400">trade_btc_hourly_v2.rs</td>
                  <td className="p-3">60 Mins (T ≤ 60m)</td>
                  <td className="p-3">Dynamic</td>
                  <td className="p-3">CME BRTI Proxy & Z-Score</td>
                  <td className="p-3">Multi-Strike Bracket Stat-Arb</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: Key Engineering Highlights & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          4. Key Engineering Highlights & Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="font-mono font-bold text-cyan-400">1. State Synchronization</span>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Uses atomic variables, <code className="font-mono text-white">Arc&lt;Mutex&lt;SimpleBook&gt;&gt;</code>, and memory-allocated arrays (<code className="font-mono text-white">[i64; 100]</code>) to process orderbook deltas without heap allocations during hot code paths.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="font-mono font-bold text-amber-400">2. Pre-Trade Risk Limits</span>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Strict risk limits enforced via <code className="font-mono text-white">RiskState</code> & <code className="font-mono text-white">RiskLimits</code>: max position size caps (N ≤ 90 contracts), cumulative loss circuit breakers (&lt; 300¢), and T ≤ 30s blackout windows.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <span className="font-mono font-bold text-purple-400">3. Multi-Exchange Resilience</span>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Automatic fallback between Binance, Kraken L2/L3, and CME index streams ensuring uninterrupted execution uptime during exchange outage events.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Next Steps & Recommended Enhancements */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          5. Next Steps & Recommended Project Enhancements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1">
            <h4 className="font-mono font-bold text-[var(--text-primary)]">1. Tick-to-Trade Latency Benchmarks</h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Add high-resolution <code className="font-mono text-cyan-400">std::time::Instant</code> instrumentation from WebSocket frame read to REST IOC order dispatch, presenting a histogram of tick-to-trade latency (μs).
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1">
            <h4 className="font-mono font-bold text-[var(--text-primary)]">2. Backtesting & Simulation Harness</h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Build a replay engine using historical Kalshi WebSocket delta files (<code className="font-mono text-cyan-400">.jsonl.gz</code>) to evaluate Sharpe Ratio, Max Drawdown, and Win Rate across volatility regimes.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1">
            <h4 className="font-mono font-bold text-[var(--text-primary)]">3. Real-Time Execution Dashboard</h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Build a lightweight web frontend (Vite + WebSockets) displaying live OBI, Z-scores, active strike brackets, and real-time execution telemetry.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1">
            <h4 className="font-mono font-bold text-[var(--text-primary)]">4. Cross-Exchange Arbitrage</h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Expand <code className="font-mono text-cyan-400">trade_btc_15m_cross_arb.rs</code> to showcase simultaneous price discrepancy arbitrage between Kalshi (CFTC-regulated) and Polymarket (DeFi AMM/CLOB).
            </p>
          </div>
        </div>
      </section>

      {/* Back to Blog List CTA */}
      <div className="pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </button>

        <button
          onClick={onNavigateToProjects}
          className="px-4 py-2 text-xs font-mono font-bold rounded bg-[var(--accent-cyan)] text-slate-950 hover:bg-cyan-300 transition-colors inline-flex items-center gap-1.5"
        >
          View Projects & Live Sandboxes
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
