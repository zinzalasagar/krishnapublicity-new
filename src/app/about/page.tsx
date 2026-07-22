"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, Award, ChevronLeft, ChevronRight, Zap, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import ScrollFillText from "@/components/ScrollFillText";

// Default static fallbacks
const defaultStats = [
  { icon: Users, value: "10+", label: "Years of Excellence" },
  { icon: CheckCircle, value: "5000+", label: "Clients Served" },
  { icon: Award, value: "3600+", label: "Successful Campaigns" },
  { icon: Zap, value: "98%", label: "Client Satisfaction" },
];

const defaultTeamMembers = [
  {
    name: "Mr. Sanjay Ahir & Vivek Ahir",
    role: "Founding Partners",
    bio: "Visionaries with over 15 years of industry experience, passionate about driving innovation and redefining advertising standards.",
    image: "/main1.jpg",
  },
  {
    name: "Mr. Umesh Zinzala",
    role: "Managing Director",
    bio: "Bringing a wealth of creative expertise, Umesh has led numerous award-winning campaigns across Gujarat.",
    image: "/main2.jpg",
  },
  {
    name: "Harshad Ahir",
    role: "Chief Marketing Officer",
    bio: "Specializing in cutting-edge digital marketing strategies with a proven track record of driving monumental growth.",
    image: "/main3.jpg",
  }
];

const getMemberImage = (imagePath?: string, index: number = 0) => {
  const defaultImages = ['/main1.jpg', '/main2.jpg', '/main3.jpg'];
  return apiService.getImageUrl(imagePath, defaultImages[index % defaultImages.length]);
};

export default function About() {
  const [currentMember, setCurrentMember] = useState(0);
  const [aboutData, setAboutData] = useState({
    title: 'Where Creativity Meets Measurable Impact.',
    description: 'We are architects of brand experiences, designing campaigns that resonate and convert.'
  });
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await apiService.get(endPointApi.about);
        if (data) {
          if (data.title) setAboutData(prev => ({ ...prev, title: data.title }));
          if (data.description) setAboutData(prev => ({ ...prev, description: data.description }));
          if (data.team && data.team.length > 0) setTeamMembers(data.team);
          if (data.stats && data.stats.length > 0) {
             const parsedStats = data.stats.map((s: any) => ({
               icon: s.icon === 'check' ? CheckCircle : 
                     s.icon === 'award' ? Award : 
                     s.icon === 'zap' ? Zap : Users, 
               value: s.value,
               label: s.label
             }));
             setStats(parsedStats);
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };
    fetchAboutData();
  }, []);

  const nextMember = () => setCurrentMember((prev) => (prev + 1) % teamMembers.length);
  const prevMember = () => setCurrentMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  const activeMember = teamMembers[currentMember] || defaultTeamMembers[0];
  const memberImg = getMemberImage(activeMember?.image, currentMember);

  return (
    <section id="about" className="relative py-12 lg:py-16 bg-[#F8F5F0] overflow-hidden w-full font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1B2642]/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1B2642]/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />

      <div className="container max-w-7xl px-6 mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-[#1B2642] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B2642]">The Agency</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1B2642] tracking-tight leading-[1.1] max-w-3xl"
          >
            {aboutData.title.includes('Measurable Impact.') ? (
              <>
                Where Creativity Meets <br className="hidden md:block" />
                <span className="text-[#1B2642]">Measurable Impact.</span>
              </>
            ) : (
              aboutData.title
            )}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: About Text & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1B2642] to-transparent rounded-full" />
              <ScrollFillText 
                text={aboutData.description}
                className="text-lg md:text-xl lg:text-2xl text-[#1B2642] font-extrabold leading-tight pl-5 mb-6"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="glass-card p-4 md:p-5 rounded-2xl group hover:bg-white/80 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B2642]/5 to-[#1B2642]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                      <stat.icon className="w-5 h-5 text-[#1B2642]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#1B2642] mb-1 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#1B2642] group-hover:to-[#1B2642] transition-all">
                      <AnimatedCounter value={stat.value} />
                    </h3>
                    <p className="text-[10px] font-bold text-[#1B2642]/60 uppercase tracking-widest leading-tight">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Leadership Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative h-[350px] md:h-[400px] w-full rounded-3xl overflow-hidden group shadow-2xl bg-slate-900 ring-1 ring-white/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMember}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img 
                  src={memberImg} 
                  alt={activeMember?.name || "Team Member"} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/main1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMember}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {activeMember?.name}
                  </h3>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center space-x-3 mt-4">
                <button 
                  onClick={prevMember} 
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-white/20 glass text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextMember} 
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-white/20 glass text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex-1 flex justify-end space-x-3 items-center">
                  {teamMembers.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentMember ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

