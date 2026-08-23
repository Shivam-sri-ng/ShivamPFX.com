import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FiDownload, FiMail, FiCode, FiDatabase, FiTrendingUp, FiChevronDown } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaPython, FaFacebookF } from 'react-icons/fa';

import { useTheme } from '../../context/ThemeContext';

const iconMap = {
  FaLinkedinIn: FaLinkedinIn,
  FaGithub: FaGithub,
  FaTwitter: FaTwitter,
  FaInstagram: FaInstagram,
  FaFacebookF: FaFacebookF,
};


const Hero = ({ about, socials }) => {
  const { currentTheme } = useTheme();
  const name = about?.name || 'Shivam Srivastava';
  const shortBio =
    about?.shortBio ||
    'Versatile Full Stack Engineer and Data Analyst/Scientist specializing in scalable web applications, predictive machine learning models, and interactive data analytics dashboards.';
  const profileImage = about?.profileImage || '/shiva_pro.jpeg';
  const resumeUrl = about?.resumeUrl && about.resumeUrl !== '#' ? about.resumeUrl : '/Shivam_2.0_CV.pdf';

  // Dynamic Typewriter Effect
  const typingTexts = about?.typingTexts?.length
    ? about.typingTexts
    : [
        'Full Stack Engineer',
        'Data Analyst & Scientist',
        'MERN Stack Specialist',
        'Machine Learning & AI Enthusiast',
        'Python & SQL Analytics Expert',
      ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = typingTexts[currentTextIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    };

    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, typingTexts]);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Dynamic Background Radial Glow Effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-colors duration-500"
        style={{ backgroundColor: currentTheme.glow }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Main Hero Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Row for Mobile: Availability Pill + Mobile Avatar on Right */}
            <div className="flex items-start justify-between lg:block gap-4">
              <div className="space-y-4 flex-1">
                {/* Top Status Pill */}
                <motion.div variants={itemVariants} className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full ${currentTheme.badgeBg} text-xs font-semibold tracking-wide shadow-lg backdrop-blur-md transition-colors duration-300`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 -ml-4" />
                  <span>Available for Hire & Projects</span>
                </motion.div>

                <div>
                  <motion.h2 variants={itemVariants} className="text-xl sm:text-3xl font-extrabold text-slate-300 tracking-tight">
                    Hello, I’m
                  </motion.h2>
                  <motion.h1 variants={itemVariants} className={`text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient} tracking-tight mt-1 font-['Space_Grotesk'] leading-tight transition-colors duration-500`}>
                    {name}
                  </motion.h1>

                  {/* Typewriter text */}
                  <motion.div variants={itemVariants} className="flex items-center space-x-2 mt-2 sm:mt-4 min-h-[40px]">
                    <span className="text-base sm:text-2xl md:text-3xl font-bold text-slate-200">
                      {displayText}
                    </span>
                    <span className="animate-pulse font-extrabold text-xl sm:text-3xl" style={{ color: currentTheme.primary }}>|</span>
                  </motion.div>
                </div>
              </div>

              {/* Mobile Right Side Dynamic Photo Avatar */}
              <div className="lg:hidden shrink-0 pt-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${currentTheme.gradient} p-0.5 blur-xs opacity-90 animate-pulse`} />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 bg-[#12121f] shadow-xl">
                    <img
                      src={profileImage}
                      alt={name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/shiva_pro.jpeg';
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
              {shortBio}
            </motion.p>

            {/* Quick Competencies Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 pt-1">
              <motion.div whileHover={{ y: -2 }} className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 shadow-md">
                <FiCode style={{ color: currentTheme.primary }} />
                <span>Full Stack (MERN)</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 shadow-md">
                <FaPython style={{ color: currentTheme.primary }} />
                <span>Python & ML Models</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 shadow-md">
                <FiDatabase style={{ color: currentTheme.primary }} />
                <span>SQL & Data Analytics</span>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3.5 pt-2">
              <motion.a
                whileHover={{ scale: 1.04, translateY: -2 }}
                whileTap={{ scale: 0.96 }}
                href={resumeUrl}
                download="Shivam_Srivastava_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3.5 rounded-xl ${currentTheme.btnBg} font-semibold text-xs sm:text-sm transition-all shadow-xl flex items-center space-x-2.5 cursor-pointer`}
              >
                <span>Download CV</span>
                <FiDownload size={17} />
              </motion.a>

              <motion.div whileHover={{ scale: 1.04, translateY: -2 }} whileTap={{ scale: 0.96 }}>
                <ScrollLink
                  to="projects"
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="cursor-pointer px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/40 text-white font-semibold text-xs sm:text-sm bg-white/5 hover:bg-white/10 transition-all flex items-center space-x-2.5 shadow-lg"
                >
                  <span>Explore Projects</span>
                  <FiTrendingUp size={17} style={{ color: currentTheme.primary }} />
                </ScrollLink>
              </motion.div>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex items-center space-x-3.5 pt-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Connect:</span>
              {socials && socials.length > 0 ? (
                socials.map((social) => {
                  const IconComp = iconMap[social.icon] || FaLinkedinIn;
                  return (
                    <motion.a
                      key={social._id || social.platform}
                      whileHover={{ scale: 1.15, rotate: 5, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white transition-all shadow-md"
                      aria-label={social.platform}
                    >
                      <IconComp size={18} />
                    </motion.a>
                  );
                })
              ) : (
                <>
                  {[
                    { href: 'https://linkedin.com/in/shivam-srivastava0022', Icon: FaLinkedinIn, label: 'LinkedIn',  rotate: 5  },
                    { href: 'https://github.com/shivam-sri-ng',              Icon: FaGithub,     label: 'GitHub',    rotate: -5 },
                    { href: 'https://instagram.com/',                         Icon: FaInstagram,  label: 'Instagram', rotate: 5  },
                    { href: 'https://twitter.com/',                           Icon: FaTwitter,    label: 'Twitter',   rotate: -5 },
                    { href: 'https://facebook.com/',                          Icon: FaFacebookF,  label: 'Facebook',  rotate: 5  },
                  ].map(({ href, Icon, label, rotate }) => (
                    <motion.a
                      key={label}
                      whileHover={{ scale: 1.15, rotate, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white transition-all shadow-md"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Desktop Right Column Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex lg:col-span-5 justify-end"
          >
            <motion.div
              whileHover={{ y: -8, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative w-80 h-80 xl:w-96 xl:h-96"
            >
              {/* Outer Glowing Gradient Ring */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${currentTheme.gradient} p-1 blur-xs opacity-90 animate-pulse transition-colors duration-500`} />

              {/* Backing Blur Backdrop */}
              <div className="absolute -inset-4 rounded-3xl blur-2xl -z-10 opacity-30" style={{ backgroundColor: currentTheme.glow }} />

              {/* Photo Card Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/20 bg-[#12121f] shadow-2xl group">
                <img
                  src={profileImage}
                  alt={name}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/shiva_pro.jpeg';
                  }}
                />
                
                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                {/* Floating Experience Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0c0c16]/90 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-xl"
                >
                  <div>
                    <p className="text-xs font-bold text-white">Shivam Srivastava</p>
                    <p className="text-[11px] font-medium" style={{ color: currentTheme.primary }}>Full Stack & Data Science</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-white/10 text-white border border-white/20 font-mono text-xs font-bold">
                    MERN | ML
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Bounce Indicator */}
      <div className="w-full flex justify-center pb-4 pt-6 z-10">
        <ScrollLink to="about" smooth={true} duration={500} offset={-80} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex flex-col items-center space-y-1 text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll Down</span>
            <FiChevronDown size={18} style={{ color: currentTheme.primary }} />
          </motion.div>
        </ScrollLink>
      </div>
    </section>
  );
};

export default Hero;
