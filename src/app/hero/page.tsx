"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";
import Image from "next/image";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

const heroImages = [
  "/banner2.jpg",
  "/main1.jpg",
  "/main2.jpg",
  "/main3.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroData, setHeroData] = useState<{
    title: string;
    subtitle: string;
    image?: string;
  }>({
    title: 'Krishna Publicity',
    subtitle: 'Elevate your market presence with premium outdoor advertising and immersive digital campaigns crafted for impact.',
    image: ''
  });

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "30%"]);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await apiService.get(endPointApi.home);
        if (data && data.hero) {
          setHeroData(data.hero);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };
    fetchHeroData();
  }, []);

  useEffect(() => {
    if (heroData.image) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000); // slightly slower for elegant feel
    return () => clearInterval(timer);
  }, [heroData.image]);

  const activeImage = heroData.image || heroImages[currentImage];

  return (
    <section
      id="home"
      className="relative w-full mt-[100px] lg:mt-[120px] overflow-hidden flex flex-col lg:flex-row font-sans bg-white"
    >
      {/* Left Content (Text) */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 py-12 lg:py-16 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-6 flex items-center gap-4 text-black/70"
        >
          <span className="w-10 h-[1px] bg-black/30"></span>
          <span className="text-sm font-medium tracking-[0.2em] uppercase">Est. Since 2012</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-[3.5rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[5.5rem] leading-[1.1] text-black font-normal"
        >
          {heroData.title.split(' ').map((word, i, arr) => (
            <React.Fragment key={i}>
              {word}
              {i === 0 && arr.length > 1 && <br />}
              {i > 0 && ' '}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-base md:text-lg text-black/70 font-medium max-w-lg leading-relaxed"
        >
          {heroData.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <MagneticButton>
            <Button
              size="lg"
              className="group w-full sm:w-auto h-14 px-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-0 font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-cyan-400/50 transition-all duration-300"
            >
              Watch Showreel
              <ArrowRight className="ml-3 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Right Content (Image) */}
      <div className="relative w-full lg:w-1/2 bg-white flex items-center justify-center min-h-[50vh] lg:min-h-[75vh] p-8 lg:p-12">
        <div className="relative w-full h-full min-h-[350px] lg:min-h-[450px] max-h-[70vh] rounded-3xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(27,38,66,0.5)] ring-1 ring-[#1B2642]/10 hover:shadow-[0_20px_90px_-10px_rgba(27,38,66,0.7)] transition-shadow duration-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ y: backgroundY }}
            >
              <Image
                src={activeImage}
                alt="Campaign Background"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        {!heroData.image && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-20">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentImage 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}