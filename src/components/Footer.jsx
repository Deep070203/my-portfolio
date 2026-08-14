import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-page)] py-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Deep Shah. All rights reserved.</span>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Deep070203"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent-cyan)] transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/deep-j-shah"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent-cyan)] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:deshah979@gmail.com"
            className="hover:text-[var(--accent-cyan)] transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
