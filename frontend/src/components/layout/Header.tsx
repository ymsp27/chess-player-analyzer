import React, { useState } from 'react';
import { Menu, LogIn, Upload, Crown, LayoutDashboard, Swords, History, BookOpen, LineChart, Zap, Clock, Trophy, Users, Settings, PlusCircle } from 'lucide-react';
import { Sheet } from '../ui/Sheet';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { openQuickImport } = useGame();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Game Analysis', icon: Swords },
    { id: 'games', label: 'My Games', icon: History },
    { id: 'openings', label: 'Openings Book', icon: BookOpen },
    { id: 'insights', label: 'Grandmaster Insights', icon: LineChart },
    { id: 'tactics', label: 'Tactics Analysis', icon: Zap },
    { id: 'time', label: 'Time Control', icon: Clock },
    { id: 'performance', label: 'Performance', icon: Trophy },
    { id: 'comparison', label: 'Peer Comparison', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-forest-900 text-white border-b border-forest-800 px-4 py-3 shadow-md flex items-center justify-between">
        {/* Left Logo & Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-forest-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-300 flex items-center justify-center font-serif text-forest-950 font-black text-sm shadow">
              ♟
            </div>
            <span className="font-serif font-black tracking-wider text-sm text-white">
              CHESS <span className="text-gold-300">ANALYTICA</span>
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={openQuickImport}
            className="px-2.5 py-1.5 bg-gold-300 hover:bg-gold-400 text-forest-950 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import PGN</span>
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-forest-800">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover border border-gold-300"
              />
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('signin')}
              className="p-2 text-gold-300 hover:text-white rounded-lg hover:bg-forest-800"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <Sheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <div className="space-y-6">
          {/* User profile header in drawer */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-forest-950/80 rounded-xl border border-forest-800 flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-gold-300" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{user.name}</h4>
                  <Badge variant="gold">{user.tier}</Badge>
                </div>
                <p className="text-[11px] text-gold-300 font-mono font-bold mt-0.5">{user.rating} ELO</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setIsMobileMenuOpen(false); openAuthModal('signin'); }}
              className="w-full py-2.5 bg-gold-300 text-forest-950 rounded-xl text-xs font-bold text-center"
            >
              Sign In / Register
            </button>
          )}

          {/* Quick import */}
          <button
            onClick={() => { setIsMobileMenuOpen(false); openQuickImport(); }}
            className="w-full py-2.5 bg-forest-800 border border-forest-700 text-gold-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Import PGN / FEN
          </button>

          {/* Drawer Nav links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive ? 'bg-gold-300 text-forest-950 font-bold' : 'text-slate-200 hover:bg-forest-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {isAuthenticated && (
            <button
              onClick={() => { logout(); setIsMobileMenuOpen(false); }}
              className="w-full py-2 text-rose-400 text-xs font-semibold text-center hover:underline"
            >
              Sign Out
            </button>
          )}
        </div>
      </Sheet>
    </>
  );
};
