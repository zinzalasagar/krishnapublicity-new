"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

const defaultSettings = {
  email: 'krishnapublicity2016@gmail.com',
  phone: '+91 7878161516',
  address: 'C-107, First Floor, Ambikapark Apt, Opp. HDFC Bank, Nr. Laxmi Tiles, Punagam, Surat, Gujarat, India',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1241.3165544824567!2d72.86615550177982!3d21.202212736660353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f7d045e2bc1%3A0x6e0d37977ac07b2c!2sKRISHNA%20PUBLICITY!5e0!3m2!1sen!2sin!4v1730006460466!5m2!1sen!2sin'
};

const Contact = () => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await apiService.get(endPointApi.settings);
        if (data) {
          setSettings({
            email: data.email || defaultSettings.email,
            phone: data.phone || defaultSettings.phone,
            address: data.address || defaultSettings.address,
            mapUrl: data.mapUrl || defaultSettings.mapUrl
          });
        }
      } catch (error) {
        console.error('Error fetching contact settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section id="contact" className="py-12 bg-[#F8F5F0] relative w-full">
      <div className="container max-w-7xl px-6 mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-theme-navy/10 text-theme-navy mb-6">
            <Send className="w-3 h-3" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Reach Out</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-theme-navy tracking-tighter leading-tight mb-6">
            Let&apos;s create <br/> <span className="text-theme-navy">something extraordinary.</span>
          </h2>
          <p className="text-lg md:text-xl text-theme-navy/70 font-light max-w-2xl mx-auto leading-relaxed">
            Ready to elevate your brand? Get in touch with our team of experts and let&apos;s start planning your next monumental campaign.
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white border-theme-navy/10 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
               <div className="p-10 md:p-16 flex flex-col justify-center">
                <CardHeader className="p-0 mb-12">
                  <CardTitle className="text-3xl font-bold text-theme-navy mb-4">Get in touch</CardTitle>
                  <CardDescription className="text-theme-navy/60 text-base font-light leading-relaxed max-w-sm">
                    Our friendly team is always here to chat and explore new possibilities for your brand.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-10">
                  <motion.a 
                    href={`mailto:${settings.email}`}
                    className="flex items-start space-x-6 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-theme-navy/20 transition-all duration-300 shadow-sm">
                      <FiMail className="text-theme-navy/40 w-6 h-6 group-hover:text-theme-navy transition-colors duration-300" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xs font-bold text-theme-navy/50 uppercase tracking-widest mb-1.5">Email</h4>
                      <p className="text-base font-semibold text-theme-navy">
                        {settings.email}
                      </p>
                    </div>
                  </motion.a>

                  <motion.a 
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="flex items-start space-x-6 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-theme-navy/20 transition-all duration-300 shadow-sm">
                      <FiPhone className="text-theme-navy/40 w-6 h-6 group-hover:text-theme-navy transition-colors duration-300" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xs font-bold text-theme-navy/50 uppercase tracking-widest mb-1.5">Phone</h4>
                      <p className="text-base font-semibold text-theme-navy">
                        {settings.phone}
                      </p>
                    </div>
                  </motion.a>

                  <motion.div 
                    className="flex items-start space-x-6 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-theme-navy/20 transition-all duration-300 shadow-sm">
                      <FiMapPin className="text-theme-navy/40 w-6 h-6 group-hover:text-theme-navy transition-colors duration-300" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xs font-bold text-theme-navy/50 uppercase tracking-widest mb-1.5">Location</h4>
                      <p className="text-sm font-light text-theme-navy/80 leading-relaxed max-w-sm">
                        {settings.address}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </div>
              
              <div className="w-full h-[400px] lg:h-auto min-h-[500px] relative group overflow-hidden bg-slate-100">
                <iframe
                  src={settings.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

