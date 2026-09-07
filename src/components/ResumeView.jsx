import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Briefcase, GraduationCap, Award, Calendar, MapPin, Building2, ShieldCheck, Eye, Copy, Check } from 'lucide-react';
import { GoogleCloudLogo } from './TechLogos';

export default function ResumeView({ onOpenCertificate }) {
  const [openSections, setOpenSections] = useState({
    ups2: true,
    ups1: true,
    berkeley: true,
    rutgers: true,
    awards: true,
  });
  const [copiedId, setCopiedId] = useState(false);

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCertId = () => {
    navigator.clipboard.writeText('a6922600124a4f0797c27e832d518ee0');
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-color)] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)]">
            Resume
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-sans mt-1">
            Professional background, enterprise experience, and educational credentials.
          </p>
        </div>

        {/* Download PDF Button */}
        <a
          href="/Deep_Shah_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded-md bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--accent-cyan)] transition-colors shadow-sm shrink-0"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      {/* Professional Experience Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Briefcase className="w-5 h-5 text-cyan-400" />
          <h2 className="font-mono font-bold text-lg text-[var(--text-primary)] uppercase tracking-wider">
            Professional Experience
          </h2>
        </div>

        {/* Experience Item 1: UPS SDE II */}
        <div className="border border-[var(--border-color)] rounded-lg bg-[var(--bg-surface)] overflow-hidden">
          <button
            onClick={() => toggleSection('ups2')}
            className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[var(--bg-page)]/50 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-base text-[var(--text-primary)]">
                  Software Development Engineer II
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Current
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" /> UPS
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Aug 2025 - Present
                </span>
                <span className="flex items-center gap-1 hidden sm:inline-flex">
                  <MapPin className="w-3.5 h-3.5" /> Parsippany, NJ
                </span>
              </div>
            </div>
            {openSections.ups2 ? (
              <ChevronUp className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-1" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-1" />
            )}
          </button>

          {openSections.ups2 && (
            <div className="px-5 pb-5 pt-2 border-t border-[var(--border-color)] space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed">
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Promoted to SDE II to lead architectural design for high-throughput package telemetry & event processing microservices.
                </li>
                <li>
                  Architected asynchronous event pipelines using <strong className="text-[var(--text-primary)] font-mono">Java, Spring Boot, and Apache Kafka</strong> handling over 5 million message events daily with sub-20ms latency.
                </li>
                <li>
                  Optimized database access layers and introduced multi-tier Redis caching, cutting P99 query latency by 38%.
                </li>
                <li>
                  Containerized application suites with Docker and deployed Helm chart configurations to enterprise Kubernetes clusters.
                </li>
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Java', 'Spring Boot', 'Kafka', 'Redis', 'Docker', 'Kubernetes', 'PostgreSQL'].map(t => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-color)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Experience Item 2: UPS SDE I */}
        <div className="border border-[var(--border-color)] rounded-lg bg-[var(--bg-surface)] overflow-hidden">
          <button
            onClick={() => toggleSection('ups1')}
            className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[var(--bg-page)]/50 transition-colors"
          >
            <div className="space-y-1">
              <span className="font-mono font-bold text-base text-[var(--text-primary)]">
                Software Development Engineer I
              </span>
              <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" /> UPS
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Jun 2024 - Aug 2025
                </span>
                <span className="flex items-center gap-1 hidden sm:inline-flex">
                  <MapPin className="w-3.5 h-3.5" /> Parsippany, NJ
                </span>
              </div>
            </div>
            {openSections.ups1 ? (
              <ChevronUp className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-1" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-1" />
            )}
          </button>

          {openSections.ups1 && (
            <div className="px-5 pb-5 pt-2 border-t border-[var(--border-color)] space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed">
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Engineered core REST API endpoints and data ingestion pipelines for UPS package status auditing systems.
                </li>
                <li>
                  Refactored legacy monolithic services into modular Spring Boot microservices, improving deployment frequency by 3x.
                </li>
                <li>
                  Integrated automated CI/CD pipelines with GitHub Actions and Docker, reducing release build times from 45m to 8m.
                </li>
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Java', 'REST APIs', 'Spring Data', 'CI/CD', 'GitHub Actions', 'JUnit'].map(t => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-color)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <h2 className="font-mono font-bold text-lg text-[var(--text-primary)] uppercase tracking-wider">
            Education
          </h2>
        </div>

        {/* Berkeley MIDS */}
        <div className="border border-[var(--border-color)] rounded-lg bg-[var(--bg-surface)] p-5 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-mono font-bold text-base text-[var(--text-primary)]">
                University of California, Berkeley
              </h3>
              <p className="text-xs font-mono text-[var(--accent-cyan)]">
                Master of Information and Data Science (MIDS)
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
              Expected May 2027
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Focus: Applied Machine Learning, Distributed Data Systems, Natural Language Processing, Machine Learning Operations (MLOps).
          </p>
        </div>

        {/* Rutgers B.S. */}
        <div className="border border-[var(--border-color)] rounded-lg bg-[var(--bg-surface)] p-5 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-mono font-bold text-base text-[var(--text-primary)]">
                Rutgers University - New Brunswick
              </h3>
              <p className="text-xs font-mono text-emerald-400 font-semibold">
                B.S. in Computer Science — Summa Cum Laude (GPA: 3.96 / 4.0)
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
              Graduated May 2024
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Honors: Dean's Highest Honors (All Semesters). Coursework: Data Structures, Algorithms, Distributed Systems, Database Management, Operating Systems, Artificial Intelligence.
          </p>
        </div>
      </div>

      {/* Certifications & Credentials Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
          <Award className="w-5 h-5 text-blue-400" />
          <h2 className="font-mono font-bold text-lg text-[var(--text-primary)] uppercase tracking-wider">
            Certifications & Credentials
          </h2>
        </div>

        {/* Google Cloud Certified Generative AI Leader */}
        <div className="border border-[var(--border-color)] rounded-lg bg-[var(--bg-surface)] p-5 space-y-4 hover:border-blue-500/40 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                <GoogleCloudLogo className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-mono font-bold text-base text-[var(--text-primary)]">
                    Google Cloud Certified — Generative AI Leader
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-xs font-mono text-blue-400 font-medium">
                  Issuer: Google Cloud • Signatory: Thomas Kurian, CEO
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-[var(--text-muted)] shrink-0 self-start">
              Sep 2026 – Sep 2029
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Demonstrates proficiency in articulating business value, strategy, and technical viability of generative AI solutions on Google Cloud. Covers foundation model architectures (Gemini, PaLM), production RAG pipelines, Vertex AI platform capabilities, and enterprise responsible AI governance.
          </p>

          {/* Credential Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-color)] text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4 text-[var(--text-muted)]">
              <span>Series ID: <strong className="text-[var(--text-primary)]">78167</strong></span>
              <span className="flex items-center gap-1.5">
                ID: <code className="text-[11px] text-[var(--text-primary)] font-semibold">a6922600124a4f0797c27e832d518ee0</code>
                <button
                  onClick={handleCopyCertId}
                  className="p-1 rounded hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  title="Copy verification ID"
                >
                  {copiedId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenCertificate && onOpenCertificate()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border border-[var(--border-color)] text-[var(--text-primary)] hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                View Certificate
              </button>
              <a
                href="/certs/google-cloud-generative-ai-leader.pdf"
                download="Google_Cloud_Certified_Generative_AI_Leader_Deep_Shah.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--accent-cyan)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                PDF
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
