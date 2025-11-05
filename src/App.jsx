import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HeroSpline from './components/HeroSpline';
import CountdownDisplay from './components/CountdownDisplay';
import HeaderBar from './components/HeaderBar';
import AdminPanel from './components/AdminPanel';

// Storage & interval
const STORAGE_KEY = 'timer_countdown_v1';
const COUNTDOWN_INTERVAL = 250; // ms

// Theme definitions (8 complete themes with light/dark variants)
const THEMES = {
  TealDream: {
    id: 'TealDream',
    name: 'Teal Dream',
    light: {
      background: '#f7fbfb',
      surface: '#eef7f7',
      cardBg: '#ffffff',
      cardBorder: '#e3eeee',
      text: '#0f2b2b',
      muted: '#5d7474',
      accent: '#14b8a6',
      shadow: '0 10px 30px rgba(20,184,166,0.15)'
    },
    dark: {
      background: '#0b1414',
      surface: '#0f1b1b',
      cardBg: '#0f1b1b',
      cardBorder: '#1e2c2c',
      text: '#e6f2f2',
      muted: '#9db3b3',
      accent: '#2dd4bf',
      shadow: '0 10px 30px rgba(45,212,191,0.2)'
    }
  },
  MistyRose: {
    id: 'MistyRose',
    name: 'Misty Rose',
    light: {
      background: '#fff6f7',
      surface: '#ffeef0',
      cardBg: '#ffffff',
      cardBorder: '#f8dfe3',
      text: '#3a2224',
      muted: '#7d5b60',
      accent: '#f472b6',
      shadow: '0 10px 30px rgba(244,114,182,0.15)'
    },
    dark: {
      background: '#1b1315',
      surface: '#23171a',
      cardBg: '#20161a',
      cardBorder: '#3a252b',
      text: '#ffeef2',
      muted: '#d7a6b7',
      accent: '#fb7185',
      shadow: '0 10px 30px rgba(251,113,133,0.2)'
    }
  },
  SageGreen: {
    id: 'SageGreen',
    name: 'Sage Green',
    light: {
      background: '#f7faf7',
      surface: '#eef5ef',
      cardBg: '#ffffff',
      cardBorder: '#e0e7e1',
      text: '#1d2a20',
      muted: '#5e6a60',
      accent: '#84cc16',
      shadow: '0 10px 30px rgba(132,204,22,0.15)'
    },
    dark: {
      background: '#0f150f',
      surface: '#141c14',
      cardBg: '#141c14',
      cardBorder: '#233023',
      text: '#ecf4ec',
      muted: '#a8b5a9',
      accent: '#a3e635',
      shadow: '0 10px 30px rgba(163,230,53,0.2)'
    }
  },
  CopperAccent: {
    id: 'CopperAccent',
    name: 'Copper Accent',
    light: {
      background: '#fbf7f4',
      surface: '#f6eee9',
      cardBg: '#ffffff',
      cardBorder: '#eaded6',
      text: '#2b2220',
      muted: '#7a6a63',
      accent: '#f59e0b',
      shadow: '0 10px 30px rgba(245,158,11,0.15)'
    },
    dark: {
      background: '#15110e',
      surface: '#1c1612',
      cardBg: '#1a1511',
      cardBorder: '#32281f',
      text: '#fff5e9',
      muted: '#dcc8b4',
      accent: '#fbbf24',
      shadow: '0 10px 30px rgba(251,191,36,0.2)'
    }
  },
  CreamGold: {
    id: 'CreamGold',
    name: 'Cream Gold',
    light: {
      background: '#fbfbf5',
      surface: '#f5f5ea',
      cardBg: '#ffffff',
      cardBorder: '#ebebd7',
      text: '#2a2a22',
      muted: '#6d6d5e',
      accent: '#eab308',
      shadow: '0 10px 30px rgba(234,179,8,0.15)'
    },
    dark: {
      background: '#14140e',
      surface: '#191910',
      cardBg: '#191910',
      cardBorder: '#2a2a1b',
      text: '#f5f5e6',
      muted: '#cbcbb6',
      accent: '#facc15',
      shadow: '0 10px 30px rgba(250,204,21,0.2)'
    }
  },
  StoneGrey: {
    id: 'StoneGrey',
    name: 'Stone Grey',
    light: {
      background: '#f7f8fa',
      surface: '#eef0f3',
      cardBg: '#ffffff',
      cardBorder: '#e3e6eb',
      text: '#16181d',
      muted: '#6b7280',
      accent: '#64748b',
      shadow: '0 10px 30px rgba(100,116,139,0.15)'
    },
    dark: {
      background: '#0e1013',
      surface: '#12151a',
      cardBg: '#12151a',
      cardBorder: '#20242c',
      text: '#e6e9ee',
      muted: '#aab2bf',
      accent: '#94a3b8',
      shadow: '0 10px 30px rgba(148,163,184,0.2)'
    }
  },
  MochaLatte: {
    id: 'MochaLatte',
    name: 'Mocha Latte',
    light: {
      background: '#faf7f5',
      surface: '#f1ebe7',
      cardBg: '#ffffff',
      cardBorder: '#e5ddd6',
      text: '#2b231f',
      muted: '#7b6d65',
      accent: '#d97706',
      shadow: '0 10px 30px rgba(217,119,6,0.15)'
    },
    dark: {
      background: '#15110f',
      surface: '#1b1512',
      cardBg: '#1b1512',
      cardBorder: '#2d241e',
      text: '#f6eee9',
      muted: '#d0bfb4',
      accent: '#f59e0b',
      shadow: '0 10px 30px rgba(245,158,11,0.2)'
    }
  },
  EbonPeak: {
    id: 'EbonPeak',
    name: 'Ebon Peak',
    light: {
      background: '#f6f7fb',
      surface: '#eef0f9',
      cardBg: '#ffffff',
      cardBorder: '#dde0ef',
      text: '#12131a',
      muted: '#5c5f75',
      accent: '#6366f1',
      shadow: '0 10px 30px rgba(99,102,241,0.15)'
    },
    dark: {
      background: '#0f1017',
      surface: '#14162a',
      cardBg: '#14162a',
      cardBorder: '#212549',
      text: '#e8e9ff',
      muted: '#b0b4ff',
      accent: '#818cf8',
      shadow: '0 10px 30px rgba(129,140,248,0.2)'
    }
  }
};

function applyCssVars(themeMode, themeDef) {
  const root = document.documentElement;
  const t = themeMode === 'dark' ? themeDef.dark : themeDef.light;
  root.style.setProperty('--background', t.background);
  root.style.setProperty('--surface', t.surface);
  root.style.setProperty('--card-bg', t.cardBg);
  root.style.setProperty('--card-border', t.cardBorder);
  root.style.setProperty('--text', t.text);
  root.style.setProperty('--muted', t.muted);
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--elev-shadow', t.shadow);
  root.setAttribute('data-theme', themeMode);
}

function calculateTimeRemaining(targetTimestamp) {
  const now = Date.now();
  const diff = Math.max(0, targetTimestamp - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function encodeShareUrl(timerObj) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('ts', String(timerObj.ts));
    url.searchParams.delete('theme');
    return url.toString();
  } catch (e) {
    return `${window.location.origin}${window.location.pathname}?ts=${timerObj.ts}`;
  }
}

function App() {
  // Theme state
  const [mode, setMode] = useState('light'); // default light
  const [themeId, setThemeId] = useState('TealDream'); // default theme

  // Timer state
  const [currentTimer, setCurrentTimer] = useState(null); // { ts: number }
  const [displayTime, setDisplayTime] = useState(null);
  const [panelSection, setPanelSection] = useState(null); // 'timer' | 'theme' | null
  const [inputDateTime, setInputDateTime] = useState('');
  const intervalRef = useRef(null);

  // Initialize from URL or localStorage
  useEffect(() => {
    // Apply default theme initially
    applyCssVars(mode, THEMES[themeId]);

    const params = new URLSearchParams(window.location.search);
    const tsParam = params.get('ts');
    if (tsParam) {
      const ts = Number(tsParam);
      if (!Number.isNaN(ts) && ts > 0) {
        const timer = { ts };
        setCurrentTimer(timer);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(timer));
      }
    } else {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const saved = JSON.parse(raw);
          if (saved && typeof saved.ts === 'number') {
            setCurrentTimer(saved);
          }
        } catch {}
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start/Restart interval whenever timer changes
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (currentTimer?.ts) {
      const tick = () => setDisplayTime(calculateTimeRemaining(currentTimer.ts));
      tick();
      intervalRef.current = setInterval(tick, COUNTDOWN_INTERVAL);
      return () => clearInterval(intervalRef.current);
    } else {
      setDisplayTime(null);
    }
  }, [currentTimer]);

  // Theme application
  useEffect(() => {
    applyCssVars(mode, THEMES[themeId]);
  }, [mode, themeId]);

  const toggleAdminPanel = useCallback((section) => {
    setPanelSection((cur) => (cur === section ? null : section));
  }, []);

  const handleSetAndSave = useCallback(() => {
    if (!inputDateTime) return;
    const ts = new Date(inputDateTime).getTime();
    if (Number.isNaN(ts)) return;
    const timer = { ts };
    setCurrentTimer(timer);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timer));
  }, [inputDateTime]);

  const handleClearLocal = useCallback(() => {
    if (!window.confirm('Clear saved timer from local storage?')) return;
    localStorage.removeItem(STORAGE_KEY);
    setCurrentTimer(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handlePreview = useCallback(() => {
    if (!inputDateTime) return;
    const ts = new Date(inputDateTime).getTime();
    if (Number.isNaN(ts)) return;
    const original = currentTimer;
    setCurrentTimer({ ts });
    const t = setTimeout(() => setCurrentTimer(original || null), 3000);
    return () => clearTimeout(t);
  }, [inputDateTime, currentTimer]);

  const switchThemeMode = useCallback(() => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  }, []);

  const applyThemeStyle = useCallback((id) => {
    setThemeId(id);
  }, []);

  const handleGenerateShare = useCallback(() => {
    if (!currentTimer?.ts) return;
    const link = encodeShareUrl(currentTimer);
    navigator.clipboard?.writeText(link);
    alert('Share link copied to clipboard:\n' + link);
  }, [currentTimer]);

  // Provide CSS variables also via Tailwind-safe classes
  const appStyle = useMemo(() => ({
    background: 'var(--background)',
    color: 'var(--text)'
  }), []);

  return (
    <div className="min-h-screen w-full" style={appStyle}>
      <HeroSpline />

      <main className="mx-auto max-w-4xl px-4 -mt-14 sm:-mt-20">
        <div
          className="container rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl"
          style={{ boxShadow: 'var(--elev-shadow)' }}
        >
          <div className="p-5 sm:p-6 md:p-8 space-y-6">
            <HeaderBar
              onOpenTimer={() => toggleAdminPanel('timer')}
              onOpenTheme={() => toggleAdminPanel('theme')}
              isPanelOpen={!!panelSection}
              mode={mode}
              onToggleMode={switchThemeMode}
              onGenerateShare={handleGenerateShare}
            />

            <section className="flex flex-col items-center text-center gap-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text)' }}>
                Time Remaining
              </h2>
              <CountdownDisplay time={displayTime} />
            </section>

            <section className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={currentTimer?.ts ? encodeShareUrl(currentTimer) : 'No timer set. Configure one to generate a share link.'}
                  className="flex-1 rounded-xl bg-transparent border border-[var(--card-border)] px-3 py-2 text-sm text-[var(--muted)] overflow-hidden text-ellipsis"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (!currentTimer?.ts) return;
                      const link = encodeShareUrl(currentTimer);
                      window.open(link, '_blank');
                    }}
                    className="px-3 py-2 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-sm"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => {
                      if (!currentTimer?.ts) return;
                      const link = encodeShareUrl(currentTimer);
                      navigator.clipboard?.writeText(link);
                    }}
                    className="px-3 py-2 rounded-xl bg-[var(--accent)] text-white text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </section>

            <AdminPanel
              openSection={panelSection}
              onClose={() => setPanelSection(null)}
              onSetAndSave={handleSetAndSave}
              onClearLocal={handleClearLocal}
              onPreview={handlePreview}
              inputDateTime={inputDateTime}
              setInputDateTime={setInputDateTime}
              themes={THEMES}
              currentThemeId={themeId}
              onApplyTheme={applyThemeStyle}
            />
          </div>
        </div>

        <footer className="py-8 text-center text-xs" style={{ color: 'var(--muted)' }}>
          Tip: Click Timer to set a target, Theme to explore palettes, and the moon/sun to toggle dark mode.
        </footer>
      </main>
    </div>
  );
}

export default App;
