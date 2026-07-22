"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          exit={{ opacity: 0, transition: { delay: 1, duration: 0.5 } }}
        >
          {/* Left Door */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#121a2f] to-[#1D2A44] border-r-[1px] border-white/40 shadow-[5px_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
            initial={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          >
            {/* Pattern/Texture on Door */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay" />
          </motion.div>
          
          {/* Right Door */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#121a2f] to-[#1D2A44] border-l-[1px] border-white/40 shadow-[-5px_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
            initial={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          >
            {/* Pattern/Texture on Door */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay" />
          </motion.div>

          {/* Central Logo/Brand Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)", transition: { duration: 0.5 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Rotating Rings */}
            <motion.div 
              className="absolute w-56 h-56 md:w-[320px] md:h-[320px] rounded-full border-2 border-white/10 border-t-white/80"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-64 h-64 md:w-[360px] md:h-[360px] rounded-full border border-white/20 border-b-white/80"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            />
            
            {/* Company Name Container (Glassmorphism) */}
            <div className="flex flex-col items-center relative z-20 bg-black/10 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <motion.h1 
                className="text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] uppercase text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              >
                Krishna
              </motion.h1>
              <motion.span 
                className="text-white text-xl md:text-2xl font-light tracking-[0.5em] uppercase mt-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                Publicity
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
