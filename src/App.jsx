import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import HeaderNavbar from './components/HeaderNavbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ProjectsView from './components/ProjectsView';
import ResumeView from './components/ResumeView';
import SkillsView from './components/SkillsView';
import ContactView from './components/ContactView';
import BlogView from './components/BlogView';
import ProjectDetailModal from './components/ProjectDetailModal';
import InteractiveTerminal from './components/InteractiveTerminal';
import CertificateModal from './components/CertificateModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Global keybinding: Cmd+K / Ctrl+K to toggle CLI
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
        
        {/* Header Navigation */}
        <HeaderNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {activeTab === 'home' && (
            <HomeView
              setActiveTab={setActiveTab}
              onOpenProjectModal={(id) => setSelectedProjectId(id)}
              onOpenCertificate={() => setIsCertModalOpen(true)}
            />
          )}

          {activeTab === 'about' && (
            <AboutView 
              setActiveTab={setActiveTab} 
              onOpenCertificate={() => setIsCertModalOpen(true)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              onOpenProjectModal={(id) => setSelectedProjectId(id)}
            />
          )}

          {activeTab === 'resume' && (
            <ResumeView 
              onOpenCertificate={() => setIsCertModalOpen(true)}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsView 
              onOpenCertificate={() => setIsCertModalOpen(true)}
            />
          )}

          {activeTab === 'contact' && (
            <ContactView />
          )}

          {activeTab === 'blog' && (
            <BlogView setActiveTab={setActiveTab} />
          )}
        </main>

        {/* Minimal Footer */}
        <Footer setActiveTab={setActiveTab} />

        {/* Project Detail Deep-Dive & Sandbox Modal */}
        {selectedProjectId && (
          <ProjectDetailModal
            projectId={selectedProjectId}
            onClose={() => setSelectedProjectId(null)}
          />
        )}

        {/* Interactive CLI Terminal Modal */}
        <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        {/* Official Certificate Lightbox Modal */}
        <CertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}
