import React, { useState } from 'react';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPostsData';
import BtcPredictionMarketPost from './blogs/BtcPredictionMarketPost';
import MacroLotteryPost from './blogs/MacroLotteryPost';

export default function BlogView({ setActiveTab }) {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // VIEW 1: Render Standalone Report Component if selected
  if (selectedPostId === 'btc-prediction-market-arb') {
    return (
      <div className="py-8 dark-blog-theme rounded-2xl px-2 sm:px-6 my-4">
        <BtcPredictionMarketPost
          onBack={() => setSelectedPostId(null)}
          onNavigateToProjects={() => setActiveTab('projects')}
        />
      </div>
    );
  }

  if (selectedPostId === 'macro-lottery-tail-risk') {
    return (
      <div className="py-8 dark-blog-theme rounded-2xl px-2 sm:px-6 my-4">
        <MacroLotteryPost
          onBack={() => setSelectedPostId(null)}
          onNavigateToProjects={() => setActiveTab('projects')}
        />
      </div>
    );
  }

  const isPostSelectable = (id) => ['btc-prediction-market-arb', 'macro-lottery-tail-risk'].includes(id);

  // VIEW 2: Clean Lightweight Multi-Article Index Grid
  return (
    <div className="py-8 dark-blog-theme rounded-2xl px-2 sm:px-6 my-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-4 border-b border-[var(--border-color)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)]">
            Blog & Research Notes
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-sans mt-1">
            Technical writeups on quantitative systems, high-throughput microservices, and AI frameworks.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles & tags..."
            className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-md border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors"
          />
        </div>
      </div>

      {/* Articles Index Grid */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)] transition-all space-y-4 group"
          >
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 font-semibold">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h2
              onClick={() => isPostSelectable(post.id) && setSelectedPostId(post.id)}
              className={`text-xl font-mono font-bold text-[var(--text-primary)] transition-colors flex items-start justify-between gap-2 ${
                isPostSelectable(post.id)
                  ? 'group-hover:text-[var(--accent-cyan)] cursor-pointer'
                  : 'opacity-80'
              }`}
            >
              <span>{post.title}</span>
              <ArrowRight className="w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-400 mt-1" />
            </h2>

            {/* Subtitle / Summary */}
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              {post.summary}
            </p>

            {/* Tags & Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--border-color)]">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-color)]">
                    {t}
                  </span>
                ))}
              </div>

              {isPostSelectable(post.id) ? (
                <button
                  onClick={() => setSelectedPostId(post.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-cyan)] hover:underline"
                >
                  Read Full Research Paper
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[11px] font-mono text-[var(--text-muted)] italic">
                  Research draft in progress
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      </div>
    </div>
  );
}
