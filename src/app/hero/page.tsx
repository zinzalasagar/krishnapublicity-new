"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  // Properly typed and initialized ref array
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(
    Array(heroVideos.length).fill(null)
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 10000); // 10 seconds
  };

  // Auto-play control
  useEffect(() => {
    if (isPlaying) startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Play/pause videos based on current slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && heroVideos[index].type === "video") {
        if (index === currentVideo) {
          video.play().catch(() => { }); // Ignore play() errors on some browsers
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideo]);

  const handleVideoChange = (direction: "prev" | "next") => {
    setCurrentVideo((prev) => {
      if (direction === "prev") {
        return (prev - 1 + heroVideos.length) % heroVideos.length;
      }
      return (prev + 1) % heroVideos.length;
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
        <AnimatePresence initial={false} mode="wait">
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
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  src={item.src}
                  preload="auto"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  quality={95}
                  className="object-cover"
                  sizes="100vw"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#b1d4f3] via-[#2c6190] to-[#1e4060] opacity-50" />

        {/* Text Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 max-w-4xl px-6">
            <motion.h1
              key={`title-${currentVideo}`}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              {heroVideos[currentVideo].title}
            </motion.h1>
            <motion.p
              key={`subtitle-${currentVideo}`}
              className="text-xl md:text-3xl text-white mb-8 leading-relaxed drop-shadow-lg"
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
          {heroVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentVideo
                  ? "bg-white w-10 shadow-lg"
                  : "bg-white/60 hover:bg-white/90"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white hover:text-[#1e4060] z-10 transition-all"
          onClick={() => handleVideoChange("prev")}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white hover:text-[#1e4060] z-10 transition-all"
          onClick={() => handleVideoChange("next")}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </section>

      {/* ==================== FLOATING WHATSAPP BUTTONS ==================== */}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-4 pointer-events-none">
        <div className="flex flex-col gap-4 pointer-events-auto">
          {/* Business WhatsApp */}
          <a
            href="https://wa.me/message/GHLZUT4SW2IXP1"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-green-500/60 transition-all duration-300 animate-bounce-slow"
            aria-label="Contact via WhatsApp Business"
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp Business"
              width={40}
              height={40}
              className="group-hover:animate-pulse"
            />
          </a>

          {/* Personal WhatsApp */}
          <a
            href="https://wa.me/917878161516"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 bg-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-pink-500/60 transition-all duration-300 animate-bounce-slow"
            aria-label="Contact via Personal WhatsApp"
          >
            <Image
              src="/whatsapp-pink.png"
              alt="WhatsApp Personal"
              width={40}
              height={40}
              className="group-hover:animate-pulse"
            />
          </a>
        </div>
      </div>

      {/* Custom Bounce Animation */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}