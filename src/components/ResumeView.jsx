import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Briefcase, GraduationCap, Award, Calendar, MapPin, Building2 } from 'lucide-react';

export default function ResumeView() {
  const [openSections, setOpenSections] = useState({
    ups2: true,
    ups1: true,
    berkeley: true,
    rutgers: true,
    awards: true,
  });

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
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

    </div>
  );
}
