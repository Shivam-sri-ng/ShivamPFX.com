import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ aboutName = 'Shivam Srivastava' }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#07070b] border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-slate-400">
          © {year} <span className="text-purple-400 font-medium">{aboutName}</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
