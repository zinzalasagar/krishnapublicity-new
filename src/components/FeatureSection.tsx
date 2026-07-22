"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import WordReveal from "@/components/WordReveal";

const defaultFeature = {
  badge: "Welcome to Krishna Publicity",
  title: "Creativity That Elevates the Impact of Every Campaign",
  description: "Our design team combines advanced market research, smart placements, and modern aesthetics to refine billboards, transit ads, and every critical branding component. We innovate with one goal in mind—delivering campaigns that perform better, last longer, and create real value for your brand.",
  buttonText: "Discover More",
  buttonLink: "#services",
  image: "/serviceimage/graphicmain1.jpg"
};

const resolveImageUrl = (imgStr?: string) => {
  return apiService.getImageUrl(imgStr, '/serviceimage/graphicmain1.jpg');
};

export default function FeatureSection() {
  const [feature, setFeature] = useState(defaultFeature);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const data = await apiService.get(endPointApi.home);
        if (data && data.feature) {
          setFeature({
            badge: data.feature.badge || defaultFeature.badge,
            title: data.feature.title || defaultFeature.title,
            description: data.feature.description || defaultFeature.description,
            buttonText: data.feature.buttonText || defaultFeature.buttonText,
            buttonLink: data.feature.buttonLink || defaultFeature.buttonLink,
            image: data.feature.image || defaultFeature.image,
          });
        }
      } catch (error) {
        console.error("Error fetching feature section:", error);
      }
    };
    fetchFeature();
  }, []);

  const featureImg = resolveImageUrl(feature.image);

  return (
    <section className="py-32 bg-[#F8F5F0] font-sans overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B2642]/10 rounded-full blur-[150px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B2642]/10 rounded-full blur-[150px] mix-blend-multiply pointer-events-none" />

      <div className="container max-w-7xl px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#1B2642] animate-pulse" />
              <span className="text-xs text-[#1B2642] font-bold tracking-[0.2em] uppercase">
                {feature.badge}
              </span>
            </div>

            <WordReveal 
              text={feature.title} 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1B2642] tracking-tight leading-[1.1]" 
              delay={0.2}
            />

            <div className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1B2642] to-transparent rounded-full" />
              <p className="text-[#1B2642]/80 text-lg md:text-xl font-light leading-relaxed max-w-xl pl-6">
                {feature.description}
              </p>
            </div>

            <div className="pt-6">
              <a 
                href={feature.buttonLink || '#services'} 
                className="inline-flex items-center px-10 py-4 rounded-full bg-gradient-to-r from-[#1B2642] to-[#323D53] text-white font-medium hover:shadow-2xl hover:shadow-[#1B2642]/20 hover:-translate-y-1 transform transition-all duration-300 group"
              >
                {feature.buttonText || 'Discover More'}
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Right Image/Illustration Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="flex-1 w-full relative"
          >
            {/* Elegant premium shadow instead of blocky offset or ugly blur */}
            
            <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(27,38,66,0.6)] ring-4 ring-white/80 group transform hover:-translate-y-2 transition-all duration-500">
              <img
                src={featureImg}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/serviceimage/graphicmain1.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1B2642]/40 to-transparent pointer-events-none opacity-50 group-hover:opacity-30 transition-opacity duration-700" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
