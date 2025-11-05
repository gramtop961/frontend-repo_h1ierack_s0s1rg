import React from 'react';

const Unit = ({ label, value }) => (
  <div className="countdown-unit flex flex-col items-center justify-center rounded-2xl px-5 sm:px-6 py-4 sm:py-5 bg-[var(--card-bg)] shadow-md border border-[var(--card-border)] transition-colors">
    <div className="countdown-value text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight" style={{ color: 'var(--accent)' }}>
      {value ?? '--'}
    </div>
    <div className="countdown-label mt-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
      {label}
    </div>
  </div>
);

const CountdownDisplay = ({ time }) => {
  return (
    <div className="countdown-display grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full justify-center">
      <Unit label="Days" value={time?.days} />
      <Unit label="Hours" value={time?.hours} />
      <Unit label="Minutes" value={time?.minutes} />
      <Unit label="Seconds" value={time?.seconds} />
    </div>
  );
};

export default CountdownDisplay;
