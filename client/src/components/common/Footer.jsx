import React from 'react';
import { FaLinkedinIn, FaGithub, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const socials = [
  { href: 'https://linkedin.com/in/shivam-srivastava0022', Icon: FaLinkedinIn, label: 'LinkedIn'  },
  { href: 'https://github.com/shivam-sri-ng',              Icon: FaGithub,     label: 'GitHub'    },
  { href: 'https://instagram.com/',                         Icon: FaInstagram,  label: 'Instagram' },
  { href: 'https://twitter.com/',                           Icon: FaTwitter,    label: 'Twitter'   },
  { href: 'https://facebook.com/',                          Icon: FaFacebookF,  label: 'Facebook'  },
];

const Footer = ({ aboutName = 'Shivam Srivastava' }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#07070b] border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/40 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="text-sm text-slate-400">
          © {year} <span className="text-purple-400 font-medium">{aboutName}</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
