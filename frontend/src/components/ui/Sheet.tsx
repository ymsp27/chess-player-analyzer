import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'left',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          'fixed inset-y-0 w-80 max-w-[85vw] bg-forest-900 text-white p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 z-10 border-r border-forest-800',
          side === 'left' ? 'left-0' : 'right-0'
        )}
      >
        <div className="flex items-center justify-between pb-6 border-b border-forest-800">
          {title ? (
            <h2 className="text-lg font-serif font-bold text-gold-300">{title}</h2>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-300 flex items-center justify-center font-serif text-forest-950 font-black">
                ⚔️
              </div>
              <span className="font-serif font-bold tracking-wider text-white">CHESS ANALYTICA</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">{children}</div>
      </div>
    </div>
  );
};
