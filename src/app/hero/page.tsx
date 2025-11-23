"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface HeroVideo {
  src: string;
  title: string;
  subtitle: string;
  type: "video" | "image";
}

const heroVideos: HeroVideo[] = [
  {
    src: "/main1.jpg",
    title: "WELCOME TO KRISHNA PUBLICITY",
    subtitle: "Your Trusted Partner for Creative Advertising Solutions",
    type: "image",
  },
  {
    src: "/main2.jpg",
    title: "Advertising Agency in All Over Gujarat.",
    subtitle: "Your Brand With our outdoor billboard locations across all city of Gujarat.",
    type: "image",
  },
  {
    src: "/main3.jpg",
    title: "BHAVNAGAR - SURAT - AHEMDABAD",
    subtitle: "Transform Your Vision into Reality",
    type: "image",
  },
];

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 10000); // 10 seconds
  };

  useEffect(() => {
    if (isPlaying) startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && heroVideos[index].type === "video") {
        if (index === currentVideo) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideo]);

  const handleVideoChange = (direction: 'prev' | 'next') => {
    setCurrentVideo((prev) => {
      if (direction === 'prev') {
        return (prev - 1 + heroVideos.length) % heroVideos.length;
      } else {
        return (prev + 1) % heroVideos.length;
      }
    });
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying) startAutoScroll();
  };

  const goToSlide = (index: number) => {
    setCurrentVideo(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying) startAutoScroll();
  };

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <AnimatePresence initial={false}>
          {heroVideos.map((item, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentVideo ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {item.type === "video" ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#b1d4f3] via-[#2c6190] to-[#1e4060] opacity-50" />

        {/* Text Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 max-w-4xl px-4">
            <motion.h1
              key={`title-${currentVideo}`}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              {heroVideos[currentVideo].title}
            </motion.h1>
            <motion.p
              key={`subtitle-${currentVideo}`}
              className="text-xl md:text-2xl text-white mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {heroVideos[currentVideo].subtitle}
            </motion.p>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentVideo
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-[#1e4060] z-10"
          onClick={() => handleVideoChange('prev')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-[#1e4060] z-10"
          onClick={() => handleVideoChange('next')}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </section>

      {/* ==================== FLOATING WHATSAPP BUTTONS (Fixed on Full Site) ==================== */}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-4 pointer-events-none">
        <div className="flex flex-col gap-4 pointer-events-auto">
          {/* Business WhatsApp */}
          <a
            href="https://wa.me/message/GHLZUT4SW2IXP1"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 animate-bounce-slow"
          >
            <img
              src="/whatsapp.png"
              alt="WhatsApp Business"
              className="w-10 h-10 group-hover:animate-pulse"
            />
          </a>

          {/* Personal WhatsApp */}
          <a
            href="https://wa.me/917878161516"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 bg-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-pink-500/50 transition-all duration-300 animate-bounce-slow"
          >
            <img
              src="/whatsapp-pink.png"
              alt="WhatsApp Personal"
              className="w-10 h-10 group-hover:animate-pulse"
            />
          </a>
        </div>
      </div>

      {/* Optional: Custom CSS for subtle bounce */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite;
        }
      `}</style>
    </>
  );
}