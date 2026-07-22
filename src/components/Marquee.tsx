"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Marquee() {
  const text = "BRANDING • DESIGN • OUTDOOR • DIGITAL • ";
  
  return (
    <div className="relative w-full bg-[#1B2642] py-8 sm:py-12 overflow-hidden flex items-center border-t border-b border-white/10 z-10">
      <motion.div
        className="flex whitespace-nowrap text-5xl sm:text-7xl lg:text-[7rem] font-black text-transparent"
        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <span className="pr-4">{text}</span>
        <span className="pr-4">{text}</span>
        <span className="pr-4">{text}</span>
        <span className="pr-4">{text}</span>
      </motion.div>
    </div>
  );
}
