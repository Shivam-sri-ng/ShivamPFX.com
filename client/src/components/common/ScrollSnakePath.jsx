import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollSnakePath = () => {
  const { scrollYProgress } = useScroll();

  // Instant responsive progress for zero scroll lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 overflow-hidden w-full max-w-4xl flex justify-center">
      {/* SVG Center Winding Snake Line */}
      <svg
        className="w-full h-full opacity-40"
        viewBox="0 0 400 1200"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Neon Gradient Definition for Snake Body */}
          <linearGradient id="centerSnakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <path
          d="M 200 0 C 320 200, 80 400, 200 600 C 320 800, 80 1000, 200 1200"
          stroke="rgba(168, 85, 247, 0.06)"
          strokeWidth="3"
          fill="none"
        />

        {/* Active Animated Snake Body Path */}
        <motion.path
          d="M 200 0 C 320 200, 80 400, 200 600 C 320 800, 80 1000, 200 1200"
          stroke="url(#centerSnakeGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength: smoothProgress,
          }}
        />
      </svg>
    </div>
  );
};

export default ScrollSnakePath;
