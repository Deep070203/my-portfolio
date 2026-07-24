import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function ExperienceTimeline() {
  const experiences = [
    {
      type: 'work',
      role: 'Software Development Engineer II',
      company: 'United Parcel Service (UPS)',
      location: 'Parsippany, NJ',
      period: 'May 2026 – Present',
      bullets: [
        'Design, develop, and maintain over 15+ sales hierarchy, customer, and alignment databases supporting enterprise sales planning operations like payouts and restatements.',
        'Support ESP (Enterprise Sales Planning) and ESTAT (Enterprise Sales Territory Alignment Tool) applications used by 150+ Sales Representatives and Customers to manage organizational hierarchies.',
        'Automate the monthly ESTAT-to-ESP data transfer process on Linux servers by creating a workflow automation platform, reducing manual effort and improving data consistency across platforms.',
        'Prototype and deliver AI-driven solutions using GitHub Copilot to optimize sales operations and data mapping, enhancing operational insights.'
      ],
      tech: ['Linux', 'SQL', 'Workflow Automation', 'GitHub Copilot', 'Database Architecture']
    },
    {
      type: 'work',
      role: 'Software Development Engineer I',
      company: 'United Parcel Service (UPS)',
      location: 'Parsippany, NJ',
      period: 'July 2025 – April 2026',
      bullets: [
        'Design and maintain a distributed microservices ecosystem (60+ services) enabling real-time package visibility for 1.5M+ daily customers, improving reliability and scalability.',
        'Architect and develop high-throughput backend systems using Java, AMQ, IBM MQ, and Couchbase, processing and persisting billions of requests with low latency.',
        'Led migration of critical services from on-prem/Jenkins to Azure DevOps Cloud, mentoring 3 engineers and improving deployment efficiency and CI/CD reliability.'
      ],
      tech: ['Java', 'AMQ', 'IBM MQ', 'Couchbase', 'Azure DevOps', 'Distributed Systems']
    },
    {
      type: 'work',
      role: 'AI/ML Research Intern',
      company: 'AI & Healthcare Bias RWJMS Research',
      location: 'Remote',
      period: 'June 2025 – April 2026',
      bullets: [
        'Collaborated with medical researchers and developers to build a web-based AI roleplay simulation platform designed to help medical students reflect on and identify implicit biases in clinical decision-making.',
        'Conducted research on LLM fine-tuning, transfer-learning, prompt engineering, and bias detection to support realistic, ethically guided roleplay interactions.',
        'Assisted in developing custom conversational agents that respond dynamically to user decisions with reflective guidance.'
      ],
      tech: ['Python', 'LLM Fine-Tuning', 'Prompt Engineering', 'Conversational Agents', 'Bias Detection']
    },
    {
      type: 'edu',
      role: 'Master of Information and Data Science (MIDS)',
      company: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      period: 'May 2026 – Dec 2027',
      bullets: [
        'Advanced graduate program focusing on Machine Learning, Applied Data Science, Scalable Machine Learning Pipelines, and Data Engineering.'
      ],
      tech: ['Data Science', 'Machine Learning', 'Statistical Modeling', 'Scalable AI']
    },
    {
      type: 'edu',
      role: 'Bachelor of Science in Computer Science & Mathematics',
      company: 'Rutgers University - New Brunswick',
      location: 'New Brunswick, NJ',
      period: 'Sep 2021 – May 2025',
      bullets: [
        'Graduated Summa Cum Laude with 3.86 / 4.00 Cumulative GPA.',
        'Dual major in Computer Science and Mathematics with honors coursework in algorithms, data structures, linear algebra, and probability.'
      ],
      tech: ['Summa Cum Laude', '3.86 GPA', 'Computer Science', 'Mathematics']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-[#080c14] relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-violet-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History &amp; Education</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Experience &amp; Academic Background
          </h2>
          <p className="text-base text-slate-400">
            Proven track record of architecting enterprise microservices at scale, conducting cutting-edge AI research, and maintaining academic excellence.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-slate-800">
          {experiences.map((exp, idx) => {
            const isWork = exp.type === 'work';
            return (
              <div key={idx} className="relative flex flex-col sm:flex-row items-start group">
                
                {/* Timeline Center Badge */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg z-10 transition-colors">
                  {isWork ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4 text-violet-400" />}
                </div>

                {/* Content Card */}
                <div className="ml-14 sm:ml-0 sm:w-1/2 pl-0 sm:px-8 w-full">
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                        {exp.period}
                      </span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                      <div className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 mt-0.5">
                        {exp.company}
                        {exp.company.includes('Rutgers') && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Summa Cum Laude
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-400">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
