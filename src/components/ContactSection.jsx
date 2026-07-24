import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    } catch (err) {}
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#080c14] relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Let’s Build Something Together
          </h2>
          <p className="text-base text-slate-400">
            Open for opportunities in Autonomous AI Agents, Quantitative Trading Systems, and High-Throughput Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <a
                  href="mailto:deshah979@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-slate-200 hover:text-cyan-400 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Email Address</div>
                    <div className="font-semibold text-sm">deshah979@gmail.com</div>
                  </div>
                </a>

                <a
                  href="tel:9739794182"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-slate-200 hover:text-cyan-400 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-violet-950 text-violet-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Phone Number</div>
                    <div className="font-semibold text-sm">973-979-4182</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-200">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Location</div>
                    <div className="font-semibold text-sm">Parsippany, NJ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Resume Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Profiles &amp; Document
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/Deep070203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 hover:text-cyan-400 flex items-center justify-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 hover:text-cyan-400 flex items-center justify-center gap-2 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

              </div>
            </div>

          </div>

          {/* Interactive Quick Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                Send a Direct Message
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h3>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-center space-y-3 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                  <p className="text-xs text-emerald-200 font-mono">
                    Thank you for reaching out. Deep Shah will respond to your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Chen"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Collaboration"
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Message</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Deep, I saw your Magneto.ai & AutoHarness work..."
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
