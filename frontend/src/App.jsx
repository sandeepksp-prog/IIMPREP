import React, { useState, useEffect } from 'react';
import { Home, BookOpen, BarChart2, AlertCircle, Layout, Settings, LogOut, Terminal, Brain, User, Target } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MockList from './components/MockList';
import ExamInterface from './components/ExamInterface';
import DailyAnalysis from './components/DailyAnalysis';
import SectionalMocks from './components/SectionalMocks';
import PracticeTests from './components/PracticeTests';
import CatAiChatbot from './components/CatAiChatbot';

// Placeholder imports for now, will implement shortly
const ErrorLog = () => <div className="p-8 text-white">Error Log Dashboard (Coming Soon)</div>;
const AnalyticsDashboard = () => <div className="p-8 text-white">Deep Analytics Dashboard (Coming Soon)</div>;

import { fetchHealth } from './api/client';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, mocks, sectionals, practice, analytics, errors, settings, profile, exam
  const [activeExam, setActiveExam] = useState(null);
  const [brainStatus, setBrainStatus] = useState("Offline");

  // Check Agent Brain Health
  useEffect(() => {
    fetchHealth().then(data => setBrainStatus(data.status || "Offline"));
  }, []);

  const handleStartExam = (exam) => {
    setActiveExam(exam);
    setCurrentView('exam');
  };

  const handleExitExam = () => {
    setActiveExam(null);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    if (activeExam && currentView === 'exam') return <ExamInterface examData={activeExam} onExit={handleExitExam} />;

    switch (currentView) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentView} onStartMock={handleStartExam} onOpenDailyInsights={() => setCurrentView('analysis')} />;
      case 'mocks': return <MockList onStart={handleStartExam} />;
      case 'sectionals': return <SectionalMocks onStart={handleStartExam} />;
      case 'practice': return <PracticeTests onStart={handleStartExam} />;
      case 'analytics': return <AnalyticsDashboard />;
      case 'errors': return <ErrorLog />;
      case 'analysis': return <DailyAnalysis onBack={() => setCurrentView('dashboard')} />;
      case 'exam': return <ExamInterface examData={activeExam} onExit={handleExitExam} />;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-900 border-r-2 border-zinc-800 flex flex-col z-20">
        <div className="p-6 border-b-2 border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-white flex items-center justify-center">
            <span className="font-black text-black text-xl">DC</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter italic block leading-none">DO <span className="text-emerald-500">CRACK</span></h1>
            {/* AGENT STATUS INDICATOR */}
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${brainStatus === "Brain Online" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}></div>
              <span className="text-[10px] uppercase font-mono text-zinc-500">{brainStatus}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={Home} label="War Room" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <SidebarItem icon={Terminal} label="Full Mocks" active={currentView === 'mocks'} onClick={() => setCurrentView('mocks')} />
          <SidebarItem icon={BookOpen} label="Sectionals" active={currentView === 'sectionals'} onClick={() => setCurrentView('sectionals')} />
          <SidebarItem icon={Target} label="Practice Tests" active={currentView === 'practice'} onClick={() => setCurrentView('practice')} />
          <SidebarItem icon={BarChart2} label="Analytics" active={currentView === 'analytics'} onClick={() => setCurrentView('analytics')} />
          <SidebarItem icon={AlertCircle} label="Error Log" active={currentView === 'errors'} onClick={() => setCurrentView('errors')} />

          <div className="pt-8 pb-4">
            <div className="px-4 text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">System</div>
            <SidebarItem icon={User} label="Profile" />
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="p-4 border-t-2 border-zinc-800">
          {/* AGENT QUICK ACTION */}
          <div className="bg-zinc-800 p-3 rounded border border-zinc-700 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-2">
              <Brain size={14} /> AGENT DIRECTIVE
            </div>
            <p className="text-[10px] text-zinc-500 font-mono leading-tight">
              "Focus on RC Inference. Accuracy dropped 12% in last mock."
            </p>
          </div>

          <button className="flex items-center gap-3 w-full px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-900/10 rounded transition-colors text-sm font-bold">
            <LogOut size={20} />
            <span>Jack Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto bg-zinc-950 relative">
        {renderContent()}
      </main>

      {/* CAT AI CHATBOT OVERLAY */}
      <CatAiChatbot />
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`relative group w-full flex items-center gap-4 px-4 py-3 border-2 transition-all duration-200
        ${active
          ? 'bg-zinc-800 border-zinc-50 text-white shadow-[4px_4px_0px_0px_#fff] translate-x-[-2px] translate-y-[-2px]'
          : 'bg-transparent border-transparent hover:bg-zinc-900 hover:border-zinc-800 text-zinc-500 hover:text-zinc-300'
        } ${className}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
      <span className="hidden lg:block font-bold tracking-wide uppercase text-xs">{label}</span>
    </button>
  );
}
