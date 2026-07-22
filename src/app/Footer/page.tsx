"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight } from "lucide-react";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

const defaultFooterSettings = {
  logo: '',
  brandName: 'KRISHNA PUBLICITY',
  tagline: 'PREMIUM PUBLICITY',
  email: 'krishnapublicity2016@gmail.com',
  phone: '+91 78740 51516',
  socialLinks: {
    instagram: 'https://instagram.com/krishnapublicity_surat',
    facebook: 'https://www.facebook.com/krishna.pubgps',
    twitter: 'https://twitter.com/Mrsanju_krishna'
  }
};

const Footer = () => {
  const [settings, setSettings] = useState(defaultFooterSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await apiService.get(endPointApi.settings);
        if (data) {
          setSettings({
            logo: data.logo || '',
            brandName: data.brandName || defaultFooterSettings.brandName,
            tagline: data.tagline || defaultFooterSettings.tagline,
            email: data.email || defaultFooterSettings.email,
            phone: data.altPhone || data.phone || defaultFooterSettings.phone,
            socialLinks: {
              instagram: data.socialLinks?.instagram || defaultFooterSettings.socialLinks.instagram,
              facebook: data.socialLinks?.facebook || defaultFooterSettings.socialLinks.facebook,
              twitter: data.socialLinks?.twitter || defaultFooterSettings.socialLinks.twitter
            }
          });
        }
      } catch (error) {
        console.error('Error fetching footer settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const logoUrl = settings.logo ? apiService.getImageUrl(settings.logo) : null;

  return (
    <footer className="relative bg-[#1D2A44] text-white pt-8 pb-4 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      <motion.div 
        className="max-w-[1400px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-8">
          
          {/* Column 1: Brand & Intro */}
          <div className="flex flex-col space-y-6 lg:pr-8">
            <div className="flex items-center space-x-3">
              {logoUrl ? (
                <img src={logoUrl} alt={settings.brandName} className="h-10 w-auto object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white text-[#1D2A44] flex items-center justify-center font-bold text-xl">
                  {settings.brandName.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-widest uppercase leading-tight">{settings.brandName}</span>
                <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">{settings.tagline}</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 uppercase tracking-widest leading-relaxed max-w-sm mt-4">
              CRAFTING THOUGHTFUL CAMPAIGNS AND EXPERIENCES BUILT ON CLARITY, PURPOSE, AND PRECISION.
            </p>
            <ScrollLink to="services" smooth={true} className="text-white text-xs font-bold uppercase tracking-widest flex items-center hover:text-gray-300 transition-colors mt-4 w-fit group cursor-pointer">
              EXPLORE SERVICES <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ScrollLink>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-gray-400 text-xs font-semibold tracking-widest uppercase">NAVIGATION</h4>
            <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase text-gray-200">
              <li><ScrollLink to="home" smooth={true} className="hover:text-white cursor-pointer transition-colors">HOME</ScrollLink></li>
              <li><ScrollLink to="about" smooth={true} className="hover:text-white cursor-pointer transition-colors">ABOUT US</ScrollLink></li>
              <li><ScrollLink to="services" smooth={true} className="hover:text-white cursor-pointer transition-colors">SERVICES</ScrollLink></li>
              <li><ScrollLink to="contact" smooth={true} className="hover:text-white cursor-pointer transition-colors">TERMS & CONDITIONS</ScrollLink></li>
            </ul>
          </div>

          {/* Column 3: Follow On */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-gray-400 text-xs font-semibold tracking-widest uppercase">FOLLOW ON</h4>
            <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase text-gray-200">
              {settings.socialLinks.instagram && (
                <li><a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a></li>
              )}
              {settings.socialLinks.facebook && (
                <li><a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">FACEBOOK</a></li>
              )}
              {settings.socialLinks.twitter && (
                <li><a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TWITTER</a></li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact & Moto */}
          <div className="flex flex-col space-y-6 lg:items-end text-left lg:text-right">
            <p className="text-sm text-gray-300 uppercase tracking-widest leading-relaxed max-w-sm">
              CREATING EXPERIENCES THAT BALANCE AESTHETICS, USABILITY, AND INTENT.
            </p>
            <div className="mt-8 flex flex-col space-y-2 lg:items-end">
              <h4 className="text-gray-400 text-xs font-semibold tracking-widest uppercase">GET IN TOUCH</h4>
              <a href={`mailto:${settings.email}`} className="text-white hover:text-gray-300 transition-colors font-semibold tracking-wider text-sm">
                {settings.email}
              </a>
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-white hover:text-gray-300 transition-colors font-semibold tracking-wider text-sm">
                {settings.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Middle Bar */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <h3 className="text-white font-bold text-sm md:text-base tracking-widest uppercase whitespace-nowrap">
              LOOKING FOR BRAND TRANSFORMATION?
            </h3>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <p className="text-gray-300 text-xs md:text-sm tracking-widest uppercase">
              Explore our personalized advertising services, outdoor campaigns, and get a cost estimate.
            </p>
          </div>
          <ScrollLink to="contact" smooth={true} className="bg-white text-[#1D2A44] hover:bg-gray-200 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap flex items-center transition-colors cursor-pointer">
            EXPLORE KRISHNA PUBLICITY <ArrowRight className="ml-2 w-4 h-4" />
          </ScrollLink>
        </div>

        {/* Huge Bottom Text */}
        <div className="w-full flex justify-center items-center mb-4 pb-2">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-tight whitespace-nowrap flex items-center justify-center gap-2 md:gap-4"
          >
            <span className="text-white">KRISHNA</span>
            <span className="text-white">PUBLICITY</span>
          </motion.h1>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-400 font-semibold tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} KRISHNA. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">TERMS & CONDITIONS</a>
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <span>CRAFTED & DESIGNED BY KRISHNA</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

