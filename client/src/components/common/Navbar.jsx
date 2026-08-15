import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserLock } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { toggleMode, isNight } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  const handleNavClick = (to) => {
    setIsOpen(false);
    if (!isHomePage) {
      navigate('/', { state: { scrollTo: to } });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07070d]/60 backdrop-blur-xl border-b border-purple-500/20 py-3 shadow-2xl shadow-purple-950/30 text-slate-100'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Top Scroll Progress Line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Shivam Srivastava Branding */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30"
            >
              <div className="w-full h-full bg-[#09090e] rounded-[10px] flex items-center justify-center">
                <span className="text-sm font-black text-purple-400 font-['Space_Grotesk']">SS</span>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-none">
                Shivam <span className="text-purple-400">Srivastava</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Full Stack & Data Science
              </span>
            </div>
          </Link>

          {/* Desktop Nav Menu Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) =>
              isHomePage ? (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  className="cursor-pointer text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors py-1 relative group"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    {item.name}
                  </motion.span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </ScrollLink>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.to)}
                  className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors py-1 cursor-pointer"
                >
                  {item.name}
                </button>
              )
            )}
          </nav>

          {/* Right Action Items: Admin Logo & Hire Me Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/admin/login"
              className="p-2.5 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-purple-950/30 transition-all border border-transparent hover:border-purple-500/30"
              title="Admin Portal"
            >
              <FaUserLock size={18} />
            </Link>

            {isHomePage ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  offset={-90}
                  duration={500}
                  className="cursor-pointer inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50"
                >
                  Hire Me
                </ScrollLink>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/#contact"
                  className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50"
                >
                  Hire Me
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center space-x-3">
            <Link
              to="/admin/login"
              className="p-2 text-slate-400 hover:text-purple-400"
              title="Admin Portal"
            >
              <FaUserLock size={18} />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0c0c14]/95 backdrop-blur-xl border-b border-purple-500/30 px-4 pt-4 pb-6 space-y-3 shadow-2xl"
          >
            {navItems.map((item) =>
              isHomePage ? (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:text-white hover:bg-purple-900/30 transition-all border border-transparent hover:border-purple-500/20 active:scale-98"
                >
                  {item.name}
                </ScrollLink>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.to)}
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:text-white hover:bg-purple-900/30 transition-all border border-transparent hover:border-purple-500/20"
                >
                  {item.name}
                </button>
              )
            )}
            <div className="pt-2">
              <ScrollLink
                to="contact"
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 active:scale-95"
              >
                Hire Me
              </ScrollLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
