import React from 'react';
import { Cog, Palette, Sun, Moon, Share2 } from 'lucide-react';

const HeaderBar = ({ onOpenTimer, onOpenTheme, isPanelOpen, mode, onToggleMode, onGenerateShare }) => {
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          aria-label="Timer Settings"
          onClick={onOpenTimer}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
        >
          <Cog className="h-5 w-5" />
          <span className="hidden sm:inline text-sm">Timer</span>
        </button>
        <button
          aria-label="Theme Settings"
          onClick={onOpenTheme}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
        >
          <Palette className="h-5 w-5" />
          <span className="hidden sm:inline text-sm">Theme</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Generate Share Link"
          onClick={onGenerateShare}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
        >
          <Share2 className="h-5 w-5" />
          <span className="hidden sm:inline text-sm">Share</span>
        </button>
        <button
          aria-label="Toggle Theme Mode"
          onClick={onToggleMode}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
        >
          {mode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="hidden sm:inline text-sm">{mode === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
