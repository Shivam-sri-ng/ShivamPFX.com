import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingSteps = [
  'Initialising MERN Architecture...',
  'Loading Data Science & ML Models...',
  'Connecting Database Analytics...',
  'Rendering Interactive UI...',
];

const Loader = ({ fullScreen = false }) => {
  const [progress, setProgress] = useState(10);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next > 25 && next <= 50) setStepIndex(1);
        else if (next > 50 && next <= 75) setStepIndex(2);
        else if (next > 75) setStepIndex(3);
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const loaderContent = (
    <div className="flex flex-col items-center justify-center space-y-7 px-4 max-w-md text-center z-10">
      {/* Outer Rotating Cyber Tech Rings */}
      <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
        {/* Layer 1: Outer dashed spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute inset-0 border-2 border-dashed border-purple-500/50 rounded-full"
        />

        {/* Layer 2: Counter-rotating cyan ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          className="absolute -inset-3 border border-cyan-400/30 rounded-full"
        />

        {/* Layer 3: Pulsing gradient aura background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 rounded-full blur-2xl opacity-40 animate-pulse" />

        {/* Center Glass Initials Badge */}
        <motion.div
          animate={{ scale: [0.96, 1.04, 0.96] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative z-10 w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-[#0a0a14]/90 border-2 border-purple-500/60 flex flex-col items-center justify-center shadow-2xl shadow-purple-950/80 backdrop-blur-md"
        >
          <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-['Space_Grotesk'] tracking-wider">
            SS
          </span>
          <span className="text-[9px] uppercase tracking-widest text-purple-300 font-bold -mt-0.5">
            Shivam
          </span>
        </motion.div>
      </div>

      {/* Name & Role Title */}
      <div className="space-y-1">
        <h3 className="text-xl font-black text-white tracking-tight font-['Space_Grotesk']">
          Shivam <span className="text-purple-400">Srivastava</span>
        </h3>
        <p className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-400 font-semibold tracking-wider uppercase">
          Full Stack & Data Science Portfolio
        </p>
      </div>

      {/* Animated Progress Bar & Dynamic Status Steps */}
      <div className="w-full space-y-2.5 max-w-xs">
        <div className="h-2 w-full bg-slate-900/90 rounded-full overflow-hidden border border-purple-500/30 p-0.5 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 rounded-full shadow-lg shadow-purple-500/60"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-mono">
          <AnimatePresence mode="wait">
            <motion.span
              key={stepIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-purple-300/90 font-medium text-[11px] truncate max-w-[210px] text-left"
            >
              {loadingSteps[stepIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="font-bold text-white text-[11px]">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#07070d] flex items-center justify-center overflow-hidden">
        {/* Background Radial Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        {loaderContent}
      </div>
    );
  }

  return <div className="py-12 flex justify-center">{loaderContent}</div>;
};

export default Loader;
