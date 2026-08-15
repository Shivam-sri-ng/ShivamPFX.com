import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber = '919170845849', message = 'Hello Shivam! I visited your portfolio website and would like to connect with you.' }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex items-center pointer-events-none group">
      {/* Hover Tooltip Label */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-xl bg-[#0c0c16]/95 text-white text-xs font-semibold backdrop-blur-md border border-emerald-500/40 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl pointer-events-none whitespace-nowrap">
        Chat with Shivam 💬
      </span>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="pointer-events-auto relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/60 border-2 border-white/20 transition-all duration-300 cursor-pointer active:scale-95"
        aria-label="Direct Connect on WhatsApp"
        title="Chat with Shivam on WhatsApp"
      >
        {/* Pulsing Outer Glow Ring */}
        <span className="absolute -inset-1.5 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <FaWhatsapp size={32} className="text-white relative z-20 drop-shadow-md" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
