"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const getMemberImage = (imagePath?: string, index: number = 0) => {
  const defaultImages = ['/main1.jpg', '/main2.jpg', '/main3.jpg'];
  return apiService.getImageUrl(imagePath, defaultImages[index % defaultImages.length]);
};

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamHeader, setTeamHeader] = useState({
    subtitle: 'Welcome to Krishna Publicity',
    title: "Gujarat's Most Reliable Advertising Family for Outdoor Campaigns",
    description: 'Our experienced Team members handle Strategy, Marketing, Design, and Execution — so you get premium service, every time.'
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await apiService.get(endPointApi.team);
        if (data) {
          if (data.teamHeader) {
            setTeamHeader(data.teamHeader);
          }
          if (Array.isArray(data.team) && data.team.length > 0) {
            setTeamMembers(data.team);
          }
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    fetchTeam();
  }, []);

  const MemberCard = ({ member, idx }: { member: any; idx: number }) => {
    const memberImg = getMemberImage(member.image, idx);
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (idx % 5) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center group cursor-pointer text-center w-full relative"
      >
        <div className="w-full aspect-[3/4] relative overflow-hidden mb-6 bg-[#EFE7DE] rounded-3xl shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 ring-1 ring-black/5 group-hover:ring-[#1B2642]/20">
          <img
            src={memberImg}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/main1.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2642]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 px-2 transform transition-all duration-500 group-hover:-translate-y-2">
          <h3 className="text-lg md:text-xl font-black text-[#1b2642] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#1B2642] group-hover:to-blue-600 transition-all duration-300">
            {member.name}
          </h3>
          <div className="h-[3px] w-0 bg-gradient-to-r from-[#1B2642] to-blue-600 group-hover:w-8 transition-all duration-500 ease-out rounded-full" />
          <p className="text-[#1b2642]/60 text-[10px] md:text-xs font-extrabold tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[#1b2642]/90">
            {member.role}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderMembers = () => {
    if (teamMembers.length <= 5) {
      const gridCols = {
        1: 'grid-cols-1 max-w-sm',
        2: 'grid-cols-1 sm:grid-cols-2 max-w-2xl',
        3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl',
        4: 'grid-cols-2 md:grid-cols-4 max-w-6xl',
        5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl'
      }[teamMembers.length] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl';

      return (
        <div className={`grid ${gridCols} gap-x-6 gap-y-12 mt-12 mx-auto px-4`}>
          {teamMembers.map((member, idx) => (
            <MemberCard key={idx} member={member} idx={idx} />
          ))}
        </div>
      );
    }

    return (
      <div className="mt-12 max-w-7xl mx-auto px-4 relative team-swiper">
        <style dangerouslySetInnerHTML={{
          __html: `
          .team-swiper .swiper-button-next,
          .team-swiper .swiper-button-prev {
            color: #1b2642;
            background: #ffffff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .team-swiper .swiper-button-next:after,
          .team-swiper .swiper-button-prev:after {
            font-size: 16px;
            font-weight: bold;
          }
          .team-swiper .swiper-button-next:hover,
          .team-swiper .swiper-button-prev:hover {
            color: #ffffff;
            background: #1B2642;
          }
          .team-swiper .swiper-pagination-bullet {
            background: #1b2642;
          }
          .team-swiper .swiper-pagination-bullet-active {
            background: #1B2642;
          }
        `}} />
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-16 pt-4 px-4"
        >
          {teamMembers.map((member, idx) => (
            <SwiperSlide key={idx}>
              <MemberCard member={member} idx={idx} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <section className="py-24 bg-[#F8F5F0] font-sans overflow-hidden">
      <div className="container max-w-screen-2xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-8 px-6"
        >
          {teamHeader.subtitle && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[10px] text-[#1B2642] font-black uppercase tracking-[0.3em] mb-5 py-2 px-5 rounded-full border border-[#1B2642]/20 bg-white/50 backdrop-blur-sm shadow-sm"
            >
              {teamHeader.subtitle}
            </motion.p>
          )}
          {teamHeader.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1b2642] tracking-tight mb-6 max-w-3xl leading-[1.2]">
              {teamHeader.title}
            </h2>
          )}
          {teamHeader.description && (
            <p className="text-[#1b2642]/70 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
              {teamHeader.description}
            </p>
          )}
        </motion.div>

        {renderMembers()}

      </div>
    </section>
  );
}
