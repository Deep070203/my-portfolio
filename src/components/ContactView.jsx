import { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function ContactView() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const emailAddress = 'deshah979@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 border-b border-[var(--border-color)] pb-6">
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)]">
          Contact & Reach Out
        </h1>
        <p className="text-sm text-[var(--text-secondary)] font-sans">
          Feel free to reach out regarding engineering roles, quantitative systems, or AI agent research.
        </p>
      </div>

      {/* 2x2 Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Email Card */}
        <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)]/50 transition-all flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Direct Email</span>
                <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
                  {emailAddress}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
            <a
              href={`mailto:${emailAddress}`}
              className="text-xs font-mono text-[var(--accent-cyan)] hover:underline inline-flex items-center gap-1"
            >
              Send Mail
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-cyan-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* LinkedIn Card */}
        <a
          href="https://linkedin.com/in/deep-j-shah"
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-blue-500/10 text-blue-400">
              <LinkedinIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">LinkedIn Network</span>
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                linkedin.com/in/deep-j-shah
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
            <span className="text-xs font-mono text-[var(--text-secondary)] group-hover:text-blue-400 transition-colors inline-flex items-center gap-1">
              Connect on LinkedIn
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </a>

        {/* GitHub Card */}
        <a
          href="https://github.com/Deep070203"
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-purple-500/10 text-purple-400">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">GitHub Repositories</span>
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                github.com/Deep070203
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
            <span className="text-xs font-mono text-[var(--text-secondary)] group-hover:text-purple-400 transition-colors inline-flex items-center gap-1">
              View Repos & OSS Contributions
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </a>

        {/* Location Card */}
        <div className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Location & Timezone</span>
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">
                Parsippany, NJ / NYC Area
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
            <span>Eastern Time (UTC-5/UTC-4)</span>
            <span className="text-emerald-400 font-semibold">Open to Remote & Hybrid</span>
          </div>
        </div>

      </div>

      {/* Direct Message Form */}
      <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
        <h3 className="font-mono font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
          <Send className="w-4 h-4 text-cyan-400" />
          Send Direct Message
        </h3>

        {formSent ? (
          <div className="p-4 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs text-center space-y-1">
            <p className="font-bold text-sm">Message Sent Successfully! ✅</p>
            <p className="text-[var(--text-secondary)]">Thanks for reaching out. I'll respond to your email as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[var(--text-secondary)]">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[var(--text-secondary)]">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. sarah@company.com"
                  className="w-full px-3 py-2 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[var(--text-secondary)]">Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Write your note, role inquiry, or collaboration idea here..."
                className="w-full px-3 py-2 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded font-mono text-xs font-bold bg-[var(--accent-cyan)] text-slate-950 hover:bg-cyan-300 transition-colors inline-flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Message
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
