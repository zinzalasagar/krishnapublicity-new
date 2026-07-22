"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./Navbar/page";
import Hero from "./hero/page";
import About from "./about/page";
import Services from "./services/page";
import Gallery from "./gallery/page"
import Contact from "./contact/page";
import Footer from "./Footer/page";
import TeamSection from "@/components/TeamSection";
import FeatureSection from "@/components/FeatureSection";
import Marquee from "@/components/Marquee";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div>
      {/* Interactive Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <Hero />
      <About />
      
      {/* New Interactive Section: Feature Section */}
      <FeatureSection />

      <Services/>

      {/* New Interactive Section: Team / Staff */}
      <TeamSection />

      <Gallery />
      <Contact />
      <Marquee />
      <Footer/>
    </div>
  );
}
