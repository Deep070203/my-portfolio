import React, { useState } from 'react';
import { X, Download, ExternalLink, Check, Copy, ShieldCheck, Award, Calendar, Hash, FileText } from 'lucide-react';
import { GoogleCloudLogo } from './TechLogos';

export default function CertificateModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const credentialId = 'a6922600124a4f0797c27e832d518ee0';
  const seriesId = '78167';
  const issueDate = 'Sep 07, 2026';
  const expirationDate = 'Sep 07, 2029';

  const handleCopyId = () => {
    navigator.clipboard.writeText(credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-page)]/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <GoogleCloudLogo className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono font-bold text-base text-[var(--text-primary)]">
                  Google Cloud Certified
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Generative AI Leader • Deep Shah
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Certificate Image Frame */}
          <div className="relative rounded-lg border border-[var(--border-color)] bg-white overflow-hidden shadow-inner group">
            <img
              src="/certs/google-cloud-generative-ai-leader.png"
              alt="Google Cloud Certified Generative AI Leader - Deep Shah"
              className="w-full h-auto object-contain mx-auto transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            <a
              href="/certs/google-cloud-generative-ai-leader.png"
              target="_blank"
              rel="noreferrer"
              className="absolute top-3 right-3 px-3 py-1.5 rounded bg-black/75 hover:bg-black text-white text-xs font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Fullscreen
            </a>
          </div>

          {/* Credential Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {/* Credential ID */}
            <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1 sm:col-span-2">
              <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Hash className="w-3 h-3 text-blue-400" />
                Credential Verification ID
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-[11px] text-[var(--text-primary)] font-semibold break-all">
                  {credentialId}
                </code>
                <button
                  onClick={handleCopyId}
                  className="p-1.5 rounded hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                  title="Copy Credential ID"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Series ID */}
            <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
              <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-400" />
                Series ID
              </span>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {seriesId}
              </p>
            </div>

            {/* Validity Range */}
            <div className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] space-y-1">
              <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-400" />
                Validity
              </span>
              <p className="text-[11px] text-[var(--text-secondary)]">
                {issueDate} – {expirationDate}
              </p>
            </div>
          </div>

          {/* Competency Summary */}
          <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5 space-y-2">
            <h4 className="font-mono font-bold text-xs text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Verified Competencies & Focus
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
              Validates deep strategic and architectural acumen in enterprise Generative AI: identifying transformative business use cases, evaluating foundation model choices (Gemini, PaLM), architecting with Vertex AI, production RAG deployment, prompt engineering governance, and adhering to responsible AI safety frameworks.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-[var(--border-color)] bg-[var(--bg-page)]/70">
          <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
            <span>Issuer: Google Cloud</span>
            <span>•</span>
            <span>Thomas Kurian, CEO</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/certs/google-cloud-generative-ai-leader.pdf"
              download="Google_Cloud_Certified_Generative_AI_Leader_Deep_Shah.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-mono text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--accent-cyan)] transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Official PDF
            </a>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-md font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
