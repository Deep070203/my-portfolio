import React, { useState, useEffect } from 'react';
import { Cpu, Play, RotateCcw, CheckCircle2, AlertCircle, GitPullRequest, ShieldCheck, Terminal, ArrowRight, Layers, FileCode, Check } from 'lucide-react';

export default function AutoHarnessSandbox() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState([
    '[INIT] AutoHarness Autonomous Contributor Engine v1.0.4',
    '[READY] Waiting to start candidate repository bug sourcing pipeline...'
  ]);

  const stages = [
    { id: 1, name: 'Issue Sourcing', desc: 'Scan GitHub Issues & PR candidates via Octokit', icon: '🔍' },
    { id: 2, name: 'Viability LLM Filter', desc: 'Run prompt-engineered feasibility check', icon: '🧠' },
    { id: 3, name: 'Fork & Clone Workspace', desc: 'Isolate repo into sandboxed Docker container', icon: '🐳' },
    { id: 4, name: 'Test Suite Baseline', desc: 'Execute existing test runner to verify green baseline', icon: '🧪' },
    { id: 5, name: 'AST Code Parsing', desc: 'Analyze call graph & pinpoint surgical target files', icon: '🌳' },
    { id: 6, name: 'Tool-Calling Agent Loop', desc: 'Execute iterative LLM tool calls (read, search, edit)', icon: '🔄' },
    { id: 7, name: 'Surgical Diff Generation', desc: 'Apply precise patch without breaking formatting', icon: '⚡' },
    { id: 8, name: 'Verifying Test Suite', desc: 'Re-run full regression tests & unit test suite', icon: '✅' },
    { id: 9, name: 'Style & Linter Match', desc: 'Match ESLint/Prettier rules from target repository', icon: '🎨' },
    { id: 10, name: 'HITL Approval Gate', desc: 'CLI Markdown checkbox prompt for developer sign-off', icon: '🛡️' },
    { id: 11, name: 'Commit & Push Fork', desc: 'Create branch & commit surgical changes', icon: '🚀' },
    { id: 12, name: 'PR Auto-Submission', desc: 'Generate rich PR description & submit to upstream', icon: '📥' },
    { id: 13, name: 'State Persistence', desc: 'Log run telemetry & clean up container storage', icon: '💾' },
  ];

  const logMessages = [
    '[STAGE 01] Octokit API: Found issue #142 "Memory leak in event emitter pool" in target repo.',
    '[STAGE 02] Vercel AI SDK Viability Filter: Score 0.94 / 1.00. Candidate accepted for resolution.',
    '[STAGE 03] Docker Sandbox: Isolated container container_98f4a spawned in 240ms.',
    '[STAGE 04] Test Runner: Executing `npm test`. 48 tests passed (baseline 100% green).',
    '[STAGE 05] AST Parser: Analyzed 14 source files. Target identified: src/events/pool.ts',
    '[STAGE 06] Tool-Calling Loop: Agent issued search_pattern & surgical edit command.',
    '[STAGE 07] Surgical Diff: Applied 4 insertions, 2 deletions to pool.ts file.',
    '[STAGE 08] Regression Test: Executing `npm test`. 49/49 tests passed (1 new test verified!).',
    '[STAGE 09] Linter Matcher: Formatted diff matching upstream ESLint rules.',
    '[STAGE 10] HITL Gate: Waiting for Human-In-The-Loop approval via CLI markdown check...',
    '[STAGE 10] HITL Gate APPROVED by developer Deep Shah.',
    '[STAGE 11] Git Workflow: Pushed feature/fix-event-pool-leak to fork repository.',
    '[STAGE 12] Octokit API: Auto-submitted Pull Request #143 with full reproduction steps.',
    '[STAGE 13] Pipeline COMPLETE: Run finished in 4.2s. Container disposed.'
  ];

  useEffect(() => {
    let timer;
    if (isRunning && activeStep < stages.length) {
      timer = setTimeout(() => {
        const nextStep = activeStep + 1;
        setActiveStep(nextStep);
        if (logMessages[nextStep]) {
          setLogs(prev => [...prev, logMessages[nextStep]]);
        }
        if (nextStep >= stages.length) {
          setIsRunning(false);
        }
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [isRunning, activeStep]);

  const handleStartSimulation = () => {
    setActiveStep(1);
    setIsRunning(true);
    setLogs([
      '[INIT] AutoHarness Autonomous Contributor Engine v1.0.4',
      logMessages[0]
    ]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStep(0);
    setLogs([
      '[INIT] AutoHarness Autonomous Contributor Engine v1.0.4',
      '[READY] Waiting to start candidate repository bug sourcing pipeline...'
    ]);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/60 text-violet-400 text-xs font-mono mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Autonomous AI Agents &amp; Tool-Calling Architecture</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              AutoHarness 13-Stage Autonomous Agent Pipeline
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              An autonomous GitHub contributor pipeline that sources bug candidates, runs LLM viability filters, executes surgical code edits via tool-calling loops, and manages PR submissions with CLI Human-in-the-Loop gates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isRunning ? (
              <button
                onClick={handleStartSimulation}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-violet-500/25"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Run Autonomous Agent Simulation</span>
              </button>
            ) : (
              <button
                disabled
                className="px-5 py-2.5 rounded-xl bg-violet-950 border border-violet-800 text-violet-300 font-semibold text-xs flex items-center gap-2 animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
                <span>Executing Pipeline ({activeStep}/13)...</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pipeline Diagram Grid & Real-time Logs Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 13 Stage Diagram Grid (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 max-h-[460px] overflow-y-auto">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2 border-b border-slate-800/80 pb-2">
              <span>Pipeline Stage Map</span>
              <span className="text-violet-400">TypeScript • Vercel AI SDK • Docker</span>
            </div>

            <div className="space-y-1.5">
              {stages.map((stage) => {
                const isCompleted = activeStep > stage.id;
                const isCurrent = activeStep === stage.id;

                return (
                  <div
                    key={stage.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-violet-950/80 border-violet-500 text-white shadow-lg shadow-violet-500/20'
                        : isCompleted
                        ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-950/50 border-slate-800/60 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] w-6 text-center opacity-70">
                        {stage.id < 10 ? `0${stage.id}` : stage.id}
                      </span>
                      <span className="text-sm">{stage.icon}</span>
                      <div>
                        <div className="font-semibold text-slate-100">{stage.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{stage.desc}</div>
                      </div>
                    </div>

                    <div className="font-mono text-[11px]">
                      {isCompleted && <span className="text-emerald-400 flex items-center gap-1 font-bold"><Check className="w-3.5 h-3.5" /> DONE</span>}
                      {isCurrent && <span className="text-violet-400 animate-pulse font-bold">RUNNING...</span>}
                      {!isCompleted && !isCurrent && <span className="text-slate-600">IDLE</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Streaming Terminal Console (5 cols) */}
          <div className="lg:col-span-5 bg-[#080c14] p-4 rounded-xl border border-slate-800/80 flex flex-col h-[460px] font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span>Agent Execution Stream</span>
              </div>
              <div className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                ● Docker Sandbox Connected
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 text-[11px] text-slate-300 pr-1">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`leading-relaxed ${
                    log.includes('COMPLETE')
                      ? 'text-emerald-400 font-bold bg-emerald-950/30 p-1 rounded'
                      : log.includes('APPROVED')
                      ? 'text-cyan-400 font-semibold'
                      : log.includes('STAGE')
                      ? 'text-slate-200'
                      : 'text-slate-500'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between">
              <span>CLI Gate: HITL Checkboxes</span>
              <span>Octokit API • Docker CLI</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
