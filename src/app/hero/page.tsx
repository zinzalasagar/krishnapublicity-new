"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface HeroVideo {
  src: string;
  title: string;
  subtitle: string;
  type: "video" | "image"; // Add a type to differentiate video and image
}

const heroVideos: HeroVideo[] = [
  {
    // src: "/branndingImage/v1.mp4",
    src: "/main1.jpg",
    title: "WELCOME TO KRISHNA PUBLICITY",
    subtitle: "Your Trusted Partner for Creative Advertising Solutions",
    type: "image",
  },
  {
    src: "/main2.jpg",
    title: "Advertising Agency in All Over Gujarat.",
    subtitle: "Your Brand With our outdoor billboard locations across all city of Gujarat.",
    type: "image", // This and others are images
  },
  {
    src: "/main3.jpg",
    title: "BHAVNAGAR - SURAT - AHEMDABAD",
    subtitle: "Transform Your Vision into Reality",
    type: "image", // This is also an image
  },
];

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 10000); // Change slide every 10 seconds
  };

  useEffect(() => {
    if (isPlaying) {
      startAutoScroll();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideo && heroVideos[index].type === "video") {
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

  // const togglePlayPause = () => {
  //   setIsPlaying(!isPlaying);
  // };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        {heroVideos.map((video, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentVideo ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {video.type === "video" ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={video.src}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* <div className="absolute inset-0 bg-gradient-to-r  via-[#2c6190] to-[#1e4060] opacity-50" /> */}

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

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroVideos.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentVideo ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            onClick={() => {
              setCurrentVideo(index);
              if (intervalRef.current) clearInterval(intervalRef.current);
              if (isPlaying) startAutoScroll();
            }}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#3982c3]/30 text-blue-400 border-white/50 hover:bg-white hover:text-[#3982c3] transition-all duration-300"
        onClick={() => handleVideoChange('prev')}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#3982c3]/30 text-blue-400 border-white/50 hover:bg-white hover:text-[#3982c3] transition-all duration-300"
        onClick={() => handleVideoChange('next')}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* <Button
        variant="ghost"
        size="sm"
        className="absolute bottom-4 left-4 text-white hover:text-[#3982c3] transition-colors duration-300"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Pause className="mr-2 h-4 w-4" />
        ) : (
          <Play className="mr-2 h-4 w-4" />
        )}
        {isPlaying ? "Pause" : "Play"} Slideshow
      </Button> */}

      {/* <Button
        variant="ghost"
        size="sm"
        className="absolute bottom-4 right-4 text-white hover:text-[#3982c3] transition-colors duration-300"
        onClick={() => {
          const nextSection = document.getElementById("about");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        Scroll Down
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button> */}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 bottom-24 text-white hover:text-[#3982c3] transition-colors duration-300 w-20 h-20 flex justify-center items-center"
        onClick={() => window.open(' https://wa.me/message/GHLZUT4SW2IXP1', '_blank')}
      >
        <img src="/whatsapp.png" alt="WhatsApp" className="w-16 h-16" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 bottom-6 text-white hover:text-[#3982c3] transition-colors duration-300 w-20 h-20 flex justify-center items-center"
        onClick={() => window.open(' https://wa.me/917878161516', '_blank')}
      >
        <img src="/whatsapp-pink.png" alt="WhatsApp" className="w-16 h-16" />
      </Button>



      {/* <div className="absolute top-0 left-0 w-full h-1 bg-[rgb(30,64,96)]">
        <motion.div
          className="h-full bg-[#3982c3]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        />
      </div> */}
    </section>
  );
}
