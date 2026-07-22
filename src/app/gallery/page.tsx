"use client";

import LogoSlider from "@/components/LogoSlider";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <section id="gallery" className="py-12 bg-[#F8F5F0] relative overflow-hidden w-full">

      <div className="w-full relative z-10 px-6 lg:px-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="mb-4">
            <p className="text-theme-navy text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">
              Trusted By Leaders
            </p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-theme-navy mb-6">
            Our Elite Partners.
          </h2>
          <p className="text-base md:text-lg text-theme-navy/70 font-light max-w-2xl mx-auto leading-relaxed">
            We collaborate with industry-leading brands to create unforgettable advertising experiences.
          </p>
        </motion.div>

        {/* Logo Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LogoSlider />
        </motion.div>
      </div>
    </section>
  );
}

