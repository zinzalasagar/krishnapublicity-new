"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import apiService from "@/services/apiService";

interface InteractiveCardProps {
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
  href: string;
}

export default function InteractiveCard({ title, description, image, fallbackImage, href }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
      }}
      className="group h-full perspective-1000"
    >
      <Link href={href} className="block h-full outline-none">
        <motion.div
          className="h-full bg-white border border-theme-navy/10 rounded-[2rem] flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-500 group-hover:border-theme-navy/30 group-hover:shadow-2xl relative"
          whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={apiService.getImageUrl(image, fallbackImage)}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/90 via-[#1a2332]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            
            {/* Title */}
            <div className="absolute bottom-6 left-6 right-6 transform transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
              <div className="h-1 w-12 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Hover Action Icon */}
            <motion.div
              className="absolute inset-0 bg-[#1a2332]/20 backdrop-blur-[2px] flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ArrowRight className="text-[#1a2332] w-7 h-7" />
              </motion.div>
            </motion.div>
          </div>
          
          <div className="p-6 bg-slate-50 flex-grow border-t border-slate-100 relative overflow-hidden">
            <p className="text-[#1a2332]/70 text-sm leading-relaxed line-clamp-3 relative z-10 transition-colors duration-300 group-hover:text-[#1a2332]/90">
              {description}
            </p>
            {/* Subtle highlight effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
