import React, { useMemo } from 'react';

const ThemeButton = ({ id, name, colors, active, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`theme-button group rounded-xl border px-3 py-2 text-left transition-colors ${
        active ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30' : 'border-[var(--card-border)]'
      }`}
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-6 w-6 rounded-full border"
          style={{ background: colors.accent, borderColor: 'var(--card-border)' }}
        />
        <div>
          <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{name}</div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>{colors.background} / {colors.surface}</div>
        </div>
      </div>
    </button>
  );
};

const AdminPanel = ({
  openSection,
  onClose,
  onSetAndSave,
  onClearLocal,
  onPreview,
  inputDateTime,
  setInputDateTime,
  themes,
  currentThemeId,
  onApplyTheme,
}) => {
  const isOpen = Boolean(openSection);

  const themeButtons = useMemo(() => Object.entries(themes).map(([id, th]) => (
    <ThemeButton
      key={id}
      id={id}
      name={th.name}
      colors={th.light}
      active={currentThemeId === id}
      onClick={onApplyTheme}
    />
  )), [themes, currentThemeId, onApplyTheme]);

  return (
    <div
      id="adminPanel"
      className={`w-full mt-4 overflow-hidden transition-all ${isOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'} `}
      aria-hidden={!isOpen}
    >
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--card-border)]">
          <h3 className="text-sm font-medium" style={{ color: 'var(--text)' }}>
            {openSection === 'timer' ? 'Timer Settings' : 'Theme Settings'}
          </h3>
          <button
            onClick={onClose}
            className="text-sm px-2 py-1 rounded-lg bg-[var(--surface)] border border-[var(--card-border)] hover:opacity-90"
            style={{ color: 'var(--text)' }}
          >
            Close
          </button>
        </div>

        {openSection === 'timer' && (
          <div id="timerSettingsArea" className="p-4 space-y-4">
            <label className="block text-sm" style={{ color: 'var(--muted)' }}>
              Target date & time
            </label>
            <input
              id="examDateTime"
              type="datetime-local"
              value={inputDateTime}
              onChange={(e) => setInputDateTime(e.target.value)}
              className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--surface)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <button onClick={onSetAndSave} className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white shadow hover:opacity-95">
                Set & Save
              </button>
              <button onClick={onPreview} className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--text)] hover:opacity-95">
                Preview
              </button>
              <button onClick={onClearLocal} className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600">
                Clear Local Data
              </button>
            </div>
          </div>
        )}

        {openSection === 'theme' && (
          <div id="themeSettingsArea" className="p-4">
            <div id="themeSelectionGrid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {themeButtons}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
