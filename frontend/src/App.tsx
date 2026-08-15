import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { KpiCards } from './components/dashboard/KpiCards';
import { ChartsSection } from './components/dashboard/ChartsSection';
import { HighlightsSection } from './components/dashboard/HighlightsSection';
import { MistakeAnalysis } from './components/dashboard/MistakeAnalysis';
import { CriticalMoments } from './components/dashboard/CriticalMoments';
import { RecentGamesTable } from './components/dashboard/RecentGamesTable';
import { GameAnalysisPanel } from './components/board/GameAnalysisPanel';
import { AuthModal } from './components/auth/AuthModal';
import { QuickImportModal } from './components/layout/QuickImportModal';
import { useAuth } from './context/AuthContext';
import { Tabs, TabItem } from './components/ui/Tabs';
import { Calendar, Filter, Sparkles, LayoutDashboard, Swords, History, LineChart } from 'lucide-react';
import { TimeFilter, ViewTab } from './types';

export function App() {
  const { user } = useAuth();
  const [activeNavView, setActiveNavView] = useState<string>('dashboard');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30d');
  const [mobileTab, setMobileTab] = useState<ViewTab>('overview');

  const mobileTabItems: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'board', label: 'Interactive Board', icon: <Swords className="w-3.5 h-3.5" />, badge: 'Live' },
    { id: 'games', label: 'Recent Games', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'performance', label: 'Performance Trends', icon: <LineChart className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-warmbg text-slate-900 flex flex-col font-sans">
      {/* Mobile Top Header */}
      <Header activeView={activeNavView} onViewChange={setActiveNavView} />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-[1800px] w-full mx-auto">
        {/* 1. Left Sidebar (Desktop sticky w-64) */}
        <Sidebar activeView={activeNavView} onViewChange={setActiveNavView} />

        {/* 2. Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-full overflow-x-hidden">
          {/* Top Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif tracking-tight">
                  Welcome back, {user ? user.name.split(' ')[0] : 'Ananya'}! 👋
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-100 text-gold-800 border border-gold-300">
                  Rating: 1850 ELO
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Here is your grandmaster telemetry breakdown and Stockfish game analysis.
              </p>
            </div>

            {/* Date Range & Time Filter Dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-forest-800" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                  className="bg-transparent focus:outline-none cursor-pointer font-bold"
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation Bar (< 1024px) */}
          <div className="lg:hidden">
            <Tabs
              tabs={mobileTabItems}
              activeTab={mobileTab}
              onChange={(tabId) => setMobileTab(tabId as ViewTab)}
            />
          </div>

          {/* DESKTOP 2-COLUMN FEED LAYOUT (Center Analytics + Right Board Panel) */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Center Analytics Feed (Desktop: Always visible. Mobile: Controlled by tabs) */}
            <div className="flex-1 space-y-6 min-w-0">
              {/* MOBILE: Overview Tab Content */}
              <div className={mobileTab === 'overview' || 'hidden lg:block' ? 'space-y-6' : 'hidden'}>
                {/* 4 Top KPI Cards */}
                <KpiCards />

                {/* Rating Chart, Donut Breakdown, & Phase Accuracy */}
                <ChartsSection />

                {/* Highlights (Strength & Improvement Area) */}
                <HighlightsSection />
              </div>

              {/* MOBILE: Interactive Board Tab Content */}
              <div className={mobileTab === 'board' ? 'block lg:hidden space-y-6' : 'hidden lg:hidden'}>
                <GameAnalysisPanel />
              </div>

              {/* MOBILE & DESKTOP: Recent Games Table */}
              <div className={mobileTab === 'games' || 'hidden lg:block' ? 'block' : 'hidden'}>
                <RecentGamesTable />
              </div>

              {/* MOBILE & DESKTOP: Performance Trends & Critical Moments */}
              <div className={mobileTab === 'performance' || 'hidden lg:block' ? 'space-y-6' : 'hidden'}>
                <MistakeAnalysis />
                <CriticalMoments />
              </div>
            </div>

            {/* 3. Right Game Analysis Panel (Desktop sticky w-96) */}
            <div className="hidden lg:block">
              <GameAnalysisPanel />
            </div>
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <AuthModal />
      <QuickImportModal />
    </div>
  );
}

export default App;
