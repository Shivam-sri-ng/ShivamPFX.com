import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('portfolio_mode') || 'night';
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('portfolio_mode', mode);

    if (mode === 'morning') {
      root.classList.add('morning-mode');
      root.classList.remove('night-mode');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      root.classList.add('night-mode');
      root.classList.remove('morning-mode');
      document.body.style.backgroundColor = '#07070d';
      document.body.style.color = '#f1f5f9';
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'night' ? 'morning' : 'night'));
  };

  const isNight = mode === 'night';
  const isMorning = mode === 'morning';

  // Backwards compatibility for existing color references
  const currentTheme = {
    id: isNight ? 'purple' : 'morning',
    primary: isNight ? '#a855f7' : '#9333ea',
    secondary: '#818cf8',
    gradient: isNight
      ? 'from-purple-400 via-indigo-300 to-cyan-400'
      : 'from-purple-600 via-indigo-600 to-cyan-500',
    badgeBg: isNight
      ? 'bg-purple-950/70 border-purple-500/30 text-purple-300'
      : 'bg-purple-100 border-purple-300 text-purple-900',
    btnBg: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/35',
    border: isNight ? 'border-purple-500/30' : 'border-purple-200',
    text: 'text-purple-600',
    glow: '#a855f7',
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isNight,
        isMorning,
        currentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
