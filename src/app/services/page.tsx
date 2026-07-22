"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

const defaultServices = [
  {
    id: "hoardings",
    title: "OUTDOOR HOARDINGS",
    description: "High-impact premium billboard displays positioned in strategic, high-traffic prime locations.",
    image: "/serviceimage/hordingimage.jpg",
  },
  {
    id: "branding",
    title: "BRAND IDENTITY",
    description: "Distinctive logo design, complete branding suites, and brand guidelines that define your presence.",
    image: "/serviceimage/brandingmian.jpg",
  },
  {
    id: "graphics",
    title: "CREATIVE DESIGN",
    description: "State-of-the-art graphic illustrations, promotional ads, and immersive visual campaigns.",
    image: "/serviceimage/graphicmain1.jpg",
  },
];

export default function Services() {
  const router = useRouter();
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServicesSettings = async () => {
      try {
        const settings = await apiService.get(endPointApi.settings);
        if (settings && settings.servicesCards) {
          setServices(defaultServices.map(service => {
            const dynamicCard = settings.servicesCards[service.id];
            if (dynamicCard) {
              return {
                ...service,
                title: dynamicCard.title || service.title,
                description: dynamicCard.description || service.description,
                image: dynamicCard.image ? apiService.getImageUrl(dynamicCard.image) : service.image,
              };
            }
            return service;
          }));
        }
      } catch (error) {
        console.error("Failed to load dynamic service cards:", error);
      }
    };

    fetchServicesSettings();
  }, []);

  return (
    <section id="services" className="py-24 bg-[#F8F5F0] w-full overflow-hidden">
      <div className="w-full px-6 lg:px-16 mx-auto">

        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-theme-navy text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Our Expertise
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-theme-navy tracking-tight leading-tight">
              Advertising Solutions
            </h2>
            <div className="w-24 h-[3px] bg-theme-navy/20 mx-auto mt-6 rounded-full" />
          </motion.div>
        </div>

        {/* 3 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeInOut" } }}
              onClick={() => router.push(`/services/${service.id}`)}
              className="group relative h-[350px] md:h-[400px] lg:h-[480px] w-full rounded-[2rem] overflow-hidden cursor-pointer bg-black border border-theme-navy/5 transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Gradient Overlay for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95 z-10" />

              {/* Text Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <span className="text-[10px] text-white/50 font-bold tracking-[0.2em] mb-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 uppercase">
                  Service 0{index + 1}
                </span>

                <h3 className="text-white font-serif text-2xl md:text-3xl mb-3 tracking-wide">
                  {service.title}
                </h3>

                {/* Decorative Line */}
                <div className="h-[2px] w-12 bg-white transition-all duration-500 group-hover:w-24 mb-4" />

                {/* Description - slides up on hover */}
                <p className="text-white/80 text-sm font-medium leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-hover:mb-5">
                  {service.description}
                </p>

                <span className="text-white font-extrabold text-xs tracking-widest uppercase flex items-center gap-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore Solution
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

