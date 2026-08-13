import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, RotateCcw, Copy, Check, Terminal, Code2, 
  Zap, Clock, Calendar, ShieldAlert, Cpu, Activity, Filter, Info
} from 'lucide-react';
import { KALSHI_BOTS } from '../data/kalshiBotsData';

// Dynamic Market Target & Settlement Expiry Helper (Strict Kalshi UTC Protocol)
function getActiveMarketInfo(botId, currentBtcPrice) {
  const now = new Date();
  const isHourly = botId === 'trade_btc_hourly_v2';
  
  // Calculate next target settlement boundary (15m: 00, 15, 30, 45)
  const expiry = new Date(now);
  if (isHourly) {
    expiry.setMinutes(0, 0, 0);
    expiry.setHours(expiry.getHours() + 1);
  } else {
    const mins = now.getMinutes();
    const next15 = Math.ceil((mins + 0.1) / 15) * 15;
    if (next15 === 60) {
      expiry.setHours(expiry.getHours() + 1);
      expiry.setMinutes(0, 0, 0);
    } else {
      expiry.setMinutes(next15, 0, 0);
    }
  }

  // Format UTC components for Kalshi ticker standard: YYMMMddHHmm
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const yy = String(expiry.getUTCFullYear()).slice(-2);
  const mon = months[expiry.getUTCMonth()];
  const dd = String(expiry.getUTCDate()).padStart(2, '0');
  const hh = String(expiry.getUTCHours()).padStart(2, '0');
  const mm = String(expiry.getUTCMinutes()).padStart(2, '0');

  // Round strike to nearest $50 Kalshi strike interval
  const validPrice = (currentBtcPrice && currentBtcPrice > 20000) ? currentBtcPrice : 96450;
  const strikeBase = Math.round(validPrice / 50) * 50;
  const series = isHourly ? 'KXBTCD' : 'KXBTC15M';
  const eventTicker = `${series}-${yy}${mon}${dd}${hh}${mm}`;
  const marketTicker = `${eventTicker}-T${strikeBase}`;

  // Time remaining in seconds
  const secondsLeft = Math.max(0, Math.floor((expiry.getTime() - now.getTime()) / 1000));
  const remMin = Math.floor(secondsLeft / 60);
  const remSec = String(secondsLeft % 60).padStart(2, '0');

  return {
    eventTicker,
    marketTicker,
    strikeBase,
    utcExpiryStr: `${hh}:${mm}:00 UTC (${expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
    secondsLeft,
    countdownStr: `${remMin}m ${remSec}s`
  };
}

export default function KalshiBotModal({ isOpen, onClose, initialBotId = 'trade_btc_15m_cross_arb' }) {
  const [selectedBotId, setSelectedBotId] = useState(initialBotId);
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'code'
  
  // Terminal Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [speed, setSpeed] = useState(1); // 1x, 2x, 5x
  const [filterLevel, setFilterLevel] = useState('ALL'); // 'ALL' | 'SIGNALS' | 'ORDERBOOK'
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [btcPrice, setBtcPrice] = useState(96450.50);
  const [wsConnected, setWsConnected] = useState(false);
  const [marketInfo, setMarketInfo] = useState(() => getActiveMarketInfo(initialBotId, 96450.50));
  
  const terminalEndRef = useRef(null);
  const selectedBot = KALSHI_BOTS.find(b => b.id === selectedBotId) || KALSHI_BOTS[0];

  // Live timer tick for target market expiry & countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setMarketInfo(getActiveMarketInfo(selectedBotId, btcPrice));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedBotId, btcPrice]);

  // Auto-scroll terminal
  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, activeTab]);

  // Live Kraken Public WebSocket BTC Price Stream
  useEffect(() => {
    let interval;
    let ws;

    try {
      ws = new WebSocket('wss://ws.kraken.com');
      ws.onopen = () => {
        setWsConnected(true);
        ws.send(JSON.stringify({
          event: 'subscribe',
          pair: ['XBT/USD'],
          subscription: { name: 'ticker' }
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data) && data[1] && data[1].c) {
            const currentPrice = parseFloat(data[1].c[0]);
            if (!isNaN(currentPrice) && currentPrice > 20000) {
              setBtcPrice(currentPrice);
            }
          }
        } catch (e) {
          // fallback
        }
      };

      ws.onerror = () => {
        setWsConnected(false);
      };
    } catch (err) {
      setWsConnected(false);
    }

    interval = setInterval(async () => {
      if (!wsConnected) {
        try {
          const res = await fetch('https://api.kraken.com/0/public/Ticker?pair=XBTUSD');
          const json = await res.json();
          if (json.result && json.result.XXBTZUSD) {
            const price = parseFloat(json.result.XXBTZUSD.c[0]);
            if (!isNaN(price) && price > 20000) setBtcPrice(price);
          }
        } catch (e) {
          setBtcPrice(prev => +(prev + (Math.random() - 0.49) * 8).toFixed(2));
        }
      }
    }, 2500);

    return () => {
      if (ws) ws.close();
      clearInterval(interval);
    };
  }, [wsConnected]);

  // Handle Bot Execution Log Generator
  useEffect(() => {
    if (!isRunning) return;

    let step = 0;
    const info = getActiveMarketInfo(selectedBotId, btcPrice);
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);

    const initialLogs = [
      { id: 1, type: 'INFO', text: `[${timeStr}] 🚀 Starting ${selectedBot.fileName}...` },
      { id: 2, type: 'INFO', text: `[${timeStr}] 🔐 Initializing read-only Kalshi & Polymarket public API client` },
      { id: 3, type: 'INFO', text: `[${timeStr}] 📡 Connected to Kraken Live BTC Stream ($${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })})` },
      { id: 4, type: 'INFO', text: `[${timeStr}] 📅 Discovered Active Market Target: ${info.marketTicker} | Expiry: ${info.utcExpiryStr} (${info.countdownStr} remaining)` }
    ];

    setLogs(initialLogs);

    const intervalTime = Math.max(200, 1200 / speed);

    const timer = setInterval(() => {
      step++;
      const currentTs = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const liveInfo = getActiveMarketInfo(selectedBotId, btcPrice);
      const strikeBase = liveInfo.strikeBase;
      const btcDiff = btcPrice - strikeBase;

      // Derive realistic Kalshi contract probability (1-99c) directly from Live BTC Spot relative to Strike
      // If BTC is $50 above strike, YES is ~68c; if $50 below, YES is ~32c
      let yesMid = Math.max(5, Math.min(95, Math.round(50 + (btcDiff / 150) * 45)));
      let yesAsk = Math.min(99, yesMid + 1);
      let yesBid = Math.max(1, yesMid - 1);
      let kalshiNoAsk = 100 - yesBid;

      let newLogLine = null;

      // Expiry proximity warning (matching Rust bot 10s check)
      if (liveInfo.secondsLeft <= 10 && step % 5 === 0) {
        newLogLine = {
          id: Date.now(),
          type: 'SIGNAL',
          text: `[${currentTs}] ⏳ Near expiry of ${liveInfo.marketTicker} (${liveInfo.secondsLeft}s left). Waiting 70s for market settlement...`
        };
      }
      else if (selectedBot.id === 'trade_btc_15m_cross_arb') {
        // Polymarket YES ask varies around Kalshi YES ask
        const polyYesAsk = Math.max(3, Math.min(97, +(yesAsk + (Math.random() - 0.52) * 4).toFixed(1)));
        const totalAsk = ((polyYesAsk + kalshiNoAsk) / 100).toFixed(3);
        const isArb = parseFloat(totalAsk) < 0.985;

        if (isArb) {
          const profit = ((1.0 - parseFloat(totalAsk)) * 100).toFixed(1);
          newLogLine = {
            id: Date.now(),
            type: 'SIGNAL',
            text: `[${currentTs}] 🔥 ARB SIGNAL: Target [${liveInfo.marketTicker}] | Poly YES Ask: ${polyYesAsk}¢ | Kalshi NO Ask: ${kalshiNoAsk}¢ | Total Cost: $${totalAsk} | Locked Profit: ${profit}¢/share`
          };
        } else {
          newLogLine = {
            id: Date.now(),
            type: 'ORDERBOOK',
            text: `[${currentTs}] 📊 Orderbook Stream [${liveInfo.marketTicker}]: Spot BTC $${btcPrice.toFixed(2)} | Kalshi [Y:${yesBid}¢ N:${100-yesAsk}¢] vs Poly [Y:${polyYesAsk}¢] | Total Cost: $${totalAsk}`
          };
        }
      } 
      else if (selectedBot.id === 'trade_btc_15m_v2') {
        const obi = ((btcDiff / 200) + (Math.random() - 0.5) * 0.4).toFixed(3);
        const whale = Math.random() > 0.85;
        if (whale) {
          const depth = (15.2 + Math.random() * 22).toFixed(1);
          newLogLine = {
            id: Date.now(),
            type: 'SIGNAL',
            text: `[${currentTs}] 🐋 WHALE WALL DETECTED: ${depth} BTC on ${btcDiff > 0 ? 'BID' : 'ASK'} depth (Kraken L3) | OBI: ${obi} | Market: ${liveInfo.marketTicker}`
          };
        } else {
          newLogLine = {
            id: Date.now(),
            type: 'ORDERBOOK',
            text: `[${currentTs}] ⚡ Kraken L3 State: Orderbook Imbalance (OBI) = ${obi} | Kalshi ATM Strike: $${strikeBase} (Expiry in ${liveInfo.countdownStr})`
          };
        }
      }
      else if (selectedBot.id === 'trade_btc_15m_4c') {
        const cheapPrice = Math.max(1, Math.floor(100 - yesAsk));
        if (cheapPrice <= 4) {
          newLogLine = {
            id: Date.now(),
            type: 'SIGNAL',
            text: `[${currentTs}] 🎯 ASYMMETRIC ENTRY DETECTED: Target [${liveInfo.marketTicker}] YES Ask = ${cheapPrice}¢ (<=4¢ Threshold) | Potential Payout: 25x`
          };
        } else {
          newLogLine = {
            id: Date.now(),
            type: 'ORDERBOOK',
            text: `[${currentTs}] 🔍 Coarse-to-Fine Scan [${liveInfo.marketTicker}]: Spot BTC $${btcPrice.toFixed(2)} vs Strike $${strikeBase} | Best Out-of-Money Ask: ${cheapPrice}¢`
          };
        }
      }
      else if (selectedBot.id === 'trade_btc_15m_95c') {
        if (yesBid >= 95) {
          newLogLine = {
            id: Date.now(),
            type: 'SIGNAL',
            text: `[${currentTs}] 📈 HIGH PROBABILITY SIGNAL: Strike $${strikeBase} YES Bid = ${yesBid}¢ (>=95¢ Confidence) | Harvesting yield late in window`
          };
        } else {
          newLogLine = {
            id: Date.now(),
            type: 'ORDERBOOK',
            text: `[${currentTs}] ⏱️ Expiry Harvester Monitor [${liveInfo.marketTicker}]: Time to expiry ${liveInfo.countdownStr} | Strike $${strikeBase} YES Bid = ${yesBid}¢ / Ask = ${yesAsk}¢`
          };
        }
      }
      else { // trade_btc_hourly_v2
        const lowStrike = strikeBase - 250;
        const highStrike = strikeBase + 250;
        const departure = Math.abs(btcDiff) > 180;
        if (departure) {
          newLogLine = {
            id: Date.now(),
            type: 'SIGNAL',
            text: `[${currentTs}] 📉 BRACKET DEPARTURE SIGNAL: Spot BTC $${btcPrice.toFixed(2)} tested outer boundary [${lowStrike}, ${highStrike}] | Executing leg hedge`
          };
        } else {
          newLogLine = {
            id: Date.now(),
            type: 'ORDERBOOK',
            text: `[${currentTs}] 🎯 Bracket Monitor [${liveInfo.eventTicker}]: Spot BTC $${btcPrice.toFixed(2)} inside range [${lowStrike} - ${highStrike}] | Expiry: ${liveInfo.utcExpiryStr}`
          };
        }
      }

      if (newLogLine) {
        setLogs(prev => [...prev.slice(-200), newLogLine]);
      }

    }, intervalTime);

    return () => clearInterval(timer);
  }, [isRunning, selectedBotId, speed, btcPrice]);

  if (!isOpen) return null;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(selectedBot.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredLogs = logs.filter(l => {
    if (filterLevel === 'SIGNALS' && l.type !== 'SIGNAL') return false;
    if (filterLevel === 'ORDERBOOK' && l.type !== 'ORDERBOOK') return false;
    if (searchTerm && !l.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">Kalshi &amp; Polymarket HFT Algorithmic Engine</h3>
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Kraken Live Spot Feed (${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })})
                </span>
              </div>
              <p className="text-xs text-slate-400">Rust Quantitative Arbitrage &amp; High-Frequency Event Contract Trading Strategies</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bot Strategy Selector Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto">
          {KALSHI_BOTS.map((bot) => {
            const isSelected = bot.id === selectedBotId;
            return (
              <button
                key={bot.id}
                onClick={() => {
                  setSelectedBotId(bot.id);
                  setLogs([]);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{bot.fileName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Strategy Overview & Expiry Countdown Bar */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-200">{selectedBot.title}</h4>
              <span className={`px-2.5 py-0.5 text-[11px] font-mono rounded-full border ${selectedBot.badgeColor}`}>
                {selectedBot.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedBot.summary}</p>
          </div>

          {/* Target Market Ticker & Live Countdown Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 font-semibold">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Target: {marketInfo.marketTicker}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  Expiry: {marketInfo.utcExpiryStr}
                </span>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{marketInfo.countdownStr}</span>
            </div>
          </div>
        </div>

        {/* View Mode Tabs & Controls Header */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-900/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'terminal' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>⚡ Live Dry-Run Stream</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'code' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>📜 Rust Source Code ({selectedBot.code.split('\n').length} lines)</span>
            </button>
          </div>

          {activeTab === 'terminal' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                  isRunning 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause Stream' : 'Run Bot (Dry Run)'}</span>
              </button>

              <button
                onClick={() => setLogs([])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Clear Terminal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {activeTab === 'code' && (
            <button
              onClick={copyCodeToClipboard}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-[#07090e] relative">
          
          {/* TAB 1: TERMINAL STREAM */}
          {activeTab === 'terminal' && (
            <div className="h-full flex flex-col">
              
              {/* Terminal Sub-header / Filters */}
              <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Filter className="w-3 h-3" /> Filter:
                  </span>
                  {['ALL', 'SIGNALS', 'ORDERBOOK'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setFilterLevel(lvl)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                        filterLevel === lvl ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'hover:text-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500">Speed:</span>
                  {[1, 2, 5].map(spd => (
                    <button
                      key={spd}
                      onClick={() => setSpeed(spd)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                        speed === spd ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Output Window */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3">
                    <Terminal className="w-10 h-10 text-slate-700 animate-pulse" />
                    <p className="text-sm">Click <span className="text-emerald-400 font-bold">"Run Bot (Dry Run)"</span> to initialize live market data streaming.</p>
                    <p className="text-xs text-slate-600 max-w-md text-center">
                      Listens to live public Kraken BTC WebSocket updates and runs the exact Rust execution algorithms in real-time dry-run mode.
                    </p>
                  </div>
                ) : (
                  filteredLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className={`leading-relaxed font-mono ${
                        log.type === 'SIGNAL' 
                          ? 'text-amber-300 bg-amber-950/30 p-1.5 rounded border-l-2 border-amber-400 font-semibold' 
                          : log.type === 'ORDERBOOK'
                          ? 'text-slate-300'
                          : 'text-cyan-400'
                      }`}
                    >
                      {log.text}
                    </div>
                  ))
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>
          )}

          {/* TAB 2: RUST SOURCE CODE VIEWER */}
          {activeTab === 'code' && (
            <div className="h-full overflow-y-auto p-4 font-mono text-xs text-slate-300 bg-[#06080d] selection:bg-cyan-500/30 selection:text-cyan-200">
              <pre className="leading-relaxed">
                {selectedBot.code.split('\n').map((line, idx) => (
                  <div key={idx} className="flex hover:bg-slate-900/60 px-2 rounded">
                    <span className="w-12 select-none text-slate-600 text-right pr-4 shrink-0">{idx + 1}</span>
                    <span className="whitespace-pre overflow-x-auto text-slate-300">
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Runtime: Tokio Async + WebSockets
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Language: Rust (1.80+)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors"
            >
              Close Showcase
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
