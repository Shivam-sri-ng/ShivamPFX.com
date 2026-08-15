import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ColorThemePicker = () => {
  const { mode, toggleMode, isNight } = useTheme();

  return (
    <div className="fixed right-5 top-24 sm:top-28 z-50">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleMode}
        className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all cursor-pointer ${
          isNight
            ? 'bg-[#0c0c16]/90 border-purple-500/30 text-amber-300 hover:border-purple-400'
            : 'bg-white/90 border-slate-300 text-purple-600 hover:border-purple-500'
        }`}
        aria-label="Toggle Night / Morning Mode"
        title={isNight ? 'Switch to Morning Mode' : 'Switch to Night Mode'}
      >
        <motion.div
          key={mode}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isNight ? (
            <FiSun size={20} className="text-amber-400 fill-amber-400/20" />
          ) : (
            <FiMoon size={20} className="text-indigo-600 fill-indigo-600/20" />
          )}
        </motion.div>

        <span className="text-xs font-bold font-['Space_Grotesk'] tracking-wide">
          {isNight ? 'Morning Mode' : 'Night Mode'}
        </span>
      </motion.button>
    </div>
  );
};

export default ColorThemePicker;
