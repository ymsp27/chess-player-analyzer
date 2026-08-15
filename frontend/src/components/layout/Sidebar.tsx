import React from 'react';
import {
  LayoutDashboard,
  Swords,
  History,
  BookOpen,
  LineChart,
  Zap,
  Clock,
  Trophy,
  Users,
  Settings,
  Upload,
  PlusCircle,
  LogOut,
  LogIn,
  Crown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { openQuickImport } = useGame();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Game Analysis', icon: Swords, badge: 'Live' },
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
    <aside className="hidden lg:flex flex-col w-64 bg-forest-900 text-white min-h-screen border-r border-forest-800 sticky top-0 h-screen z-30 shadow-xl">
      {/* Top Branding */}
      <div className="p-6 border-b border-forest-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-300 flex items-center justify-center font-serif text-forest-950 font-black text-xl shadow-lg gold-border-glow">
            ♟
          </div>
          <div>
            <h1 className="font-serif font-black tracking-wider text-base text-white flex items-center gap-1">
              CHESS <span className="text-gold-300">ANALYTICA</span>
            </h1>
            <p className="text-[10px] text-forest-300 font-sans uppercase tracking-widest font-semibold">
              Grandmaster Engine
            </p>
          </div>
        </div>
      </div>

      {/* Quick Import Trigger Button Panel */}
      <div className="p-4 border-b border-forest-800/50">
        <button
          onClick={openQuickImport}
          className="w-full py-2.5 px-3 bg-gold-300 hover:bg-gold-400 text-forest-950 rounded-xl font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
        >
          <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90" />
          <span>Quick Import (PGN / FEN)</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-forest-400 uppercase tracking-wider">
          Main Telemetry
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group',
                isActive
                  ? 'bg-forest-800 text-gold-300 shadow-sm border border-forest-700/60 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-forest-800/40'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-4 h-4 transition-colors',
                    isActive ? 'text-gold-300' : 'text-forest-300 group-hover:text-gold-300'
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gold-300/20 text-gold-300 border border-gold-300/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom User Profile Card */}
      <div className="p-4 border-t border-forest-800 bg-forest-950/60">
        {isAuthenticated && user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover border-2 border-gold-300/80 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 bg-gold-400 text-forest-950 rounded-full p-0.5 shadow">
                  <Crown className="w-2.5 h-2.5 fill-forest-950" />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
                  <Badge variant="gold" className="text-[9px] px-1.5 py-0">
                    {user.tier}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-mono font-bold text-gold-300">{user.rating}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">↑{user.ratingChange30Days}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] border-t border-forest-800/80">
              <span className="text-slate-400">Status: Signed In</span>
              <button
                onClick={logout}
                className="text-slate-400 hover:text-rose-400 font-semibold flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-xs text-slate-300">Sign in to save telemetry data & review games</p>
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full py-2 bg-gold-300 hover:bg-gold-400 text-forest-950 font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In / Register
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
