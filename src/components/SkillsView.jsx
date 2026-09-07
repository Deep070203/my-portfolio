import React, { useState } from 'react';
import { Search, Code, Cpu, Database, Server, Wrench, Sparkles, Terminal, Globe, Network, Award, ShieldCheck, Eye } from 'lucide-react';
import { 
  GoLogo, TypeScriptLogo, PythonLogo, RustLogo, JavaLogo, CSharpLogo, PostgresLogo, 
  SpringBootLogo, KafkaLogo, RedisLogo, DockerLogo, PyTorchLogo, AWSLogo, RestApiLogo,
  GoogleCloudLogo
} from './TechLogos';

export default function SkillsView({ onOpenCertificate }) {
  const [searchTerm, setSearchTerm] = useState('');

  const skillGroups = [
    {
      category: 'Languages & Runtimes',
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      skills: [
        { name: 'Go / Golang', level: 'Advanced', desc: 'High-throughput microservices, concurrency routines, channels, and low-latency network servers.', logo: <GoLogo /> },
        { name: 'TypeScript', level: 'Advanced', desc: 'Strict static typing, Node.js, React, async runtimes, and AST parsing tools.', logo: <TypeScriptLogo /> },
        { name: 'Python', level: 'Advanced', desc: 'Data science, PyTorch, pandas, FastAPI, and autonomous agent orchestration.', logo: <PythonLogo /> },
        { name: 'Rust', level: 'Intermediate', desc: 'Tokio async runtime, Rayon parallelism, zero-cost abstractions for quant HFT bots.', logo: <RustLogo /> },
        { name: 'Java', level: 'Advanced', desc: 'Enterprise Spring Boot microservices, JVM tuning, multithreading, and Kafka integration.', logo: <JavaLogo /> },
        { name: 'C# / .NET', level: 'Intermediate', desc: 'Enterprise backend services, LINQ, Async/Await, and ASP.NET Core microservices.', logo: <CSharpLogo /> },
        { name: 'PostgreSQL', level: 'Advanced', desc: 'Complex relational queries, indexing strategies, JSONB data types, and Prisma integration.', logo: <PostgresLogo /> },
        { name: 'SQL & C++', level: 'Intermediate', desc: 'Database query optimization, schema migrations, and memory-efficient C++ data structures.' },
      ]
    },
    {
      category: 'Backend & Distributed Systems',
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      skills: [
        { name: 'REST APIs', level: 'Advanced', desc: 'OpenAPI/Swagger specs, JWT authentication, rate limiting, and resilient HTTP endpoints.', logo: <RestApiLogo /> },
        { name: 'Apache Kafka', level: 'Advanced', desc: 'Event streaming pipelines, partition strategies, high-throughput consumer groups at UPS.', logo: <KafkaLogo /> },
        { name: 'Spring Boot', level: 'Advanced', desc: 'REST APIs, dependency injection, JPA/Hibernate, Spring Security, microservices.', logo: <SpringBootLogo /> },
        { name: 'Redis', level: 'Advanced', desc: 'In-memory caching, pub/sub messaging, rate limiters, session storage.', logo: <RedisLogo /> },
        { name: 'Docker & Kubernetes', level: 'Advanced', desc: 'Containerization, Helm charts, multi-stage builds, ingress controllers, pod scaling.', logo: <DockerLogo /> },
        { name: 'WebSockets', level: 'Advanced', desc: 'Real-time full-duplex streams, sub-millisecond orderbook telemetry feeds.' },
        { name: 'gRPC & Protobuf', level: 'Intermediate', desc: 'High-performance IPC, binary serialization, bidirectional streaming.' },
      ]
    },
    {
      category: 'AI & Data Science',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      skills: [
        { name: 'Google Cloud Generative AI Leader', level: 'Certified', desc: 'Official Google Cloud certification: enterprise LLM adoption, Vertex AI, Gemini models, production RAG pipelines, and AI governance.', logo: <GoogleCloudLogo />, isCert: true },
        { name: 'LLM Agents & FastMCP', level: 'Advanced', desc: 'Autonomous agent loops, model context protocol tools, self-correction harnesses.' },
        { name: 'PyTorch & Scikit-Learn', level: 'Intermediate', desc: 'Deep learning models, classification pipelines, feature engineering (MIDS @ Berkeley).', logo: <PyTorchLogo /> },
        { name: 'Vector DBs (Chroma, Pinecone)', level: 'Advanced', desc: 'RAG semantic search, cosine similarity indexing, prompt context injection.' },
        { name: 'Pandas & NumPy', level: 'Advanced', desc: 'Quantitative data processing, tick data analysis, time series modeling.' },
      ]
    },
    {
      category: 'Quant & DevTools',
      icon: <Wrench className="w-4 h-4 text-blue-400" />,
      skills: [
        { name: 'Black-Scholes Solver', level: 'Advanced', desc: 'Real-time Options GEX / VEX calculations, implied volatility skew modeling.' },
        { name: 'Git & GitHub Actions', level: 'Advanced', desc: 'CI/CD pipelines, automated testing, release management.' },
        { name: 'AWS & Cloud Infrastructure', level: 'Intermediate', desc: 'EC2, S3, IAM, CloudWatch, serverless Lambda functions.', logo: <AWSLogo /> },
        { name: 'Linux / Bash Scripting', level: 'Advanced', desc: 'Shell scripting, systemd service management, performance profiling.' },
      ]
    }
  ];

  // Helper function to render text with highlighted search substring
  const highlightMatches = (text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="highlight-matched-text">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-color)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)]">
            Skills & Capabilities
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-sans mt-1">
            Technical stack across high-performance languages, distributed systems, and AI frameworks.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills... e.g. Go, C#, Postgres"
            className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-md border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Featured Credential Banner */}
      {!searchTerm && (
        <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
              <GoogleCloudLogo className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                  Google Cloud Certified — Generative AI Leader
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                Active credential through Sep 2029 • Verification ID: a6922600124a4f0797c27e832d518ee0
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenCertificate && onOpenCertificate()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-colors shrink-0 self-start sm:self-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            View Certificate
          </button>
        </div>
      )}

      {/* Skills Groups */}
      <div className="space-y-10">
        {skillGroups.map((group) => {
          const matchingSkills = group.skills.filter(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.desc.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (searchTerm && matchingSkills.length === 0) return null;

          return (
            <div key={group.category} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[var(--border-color)]/50 pb-2">
                {group.icon}
                <h2 className="font-mono font-bold text-base text-[var(--text-primary)]">
                  {group.category}
                </h2>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  ({matchingSkills.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingSkills.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => skill.isCert && onOpenCertificate && onOpenCertificate()}
                    className={`p-4 rounded-lg border transition-all space-y-2 group ${
                      skill.isCert
                        ? 'border-blue-500/30 bg-blue-500/5 hover:border-blue-400 cursor-pointer shadow-sm'
                        : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {skill.logo && (
                          <div className="p-1 rounded bg-[var(--bg-page)] border border-[var(--border-color)] group-hover:scale-110 transition-transform">
                            {skill.logo}
                          </div>
                        )}
                        <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
                          {highlightMatches(skill.name, searchTerm)}
                        </h3>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                        skill.isCert
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 font-semibold'
                          : 'bg-[var(--bg-page)] text-[var(--accent-cyan)] border-[var(--border-color)]'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {highlightMatches(skill.desc, searchTerm)}
                    </p>
                    {skill.isCert && (
                      <div className="pt-1 flex items-center gap-1 text-[11px] font-mono text-blue-400 group-hover:underline">
                        <Eye className="w-3 h-3" />
                        <span>Click to view official certificate →</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
