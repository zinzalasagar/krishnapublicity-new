"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from 'lucide-react';
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import PageTransition from "@/components/PageTransition";
import InteractiveCard from "@/components/InteractiveCard";

interface CityType {
  cityId: string;
  cityName: string;
  cityImage: string;
  cityDescription: string;
}

const fallbackCities: CityType[] = [
  {
    cityId: "bhavnagar",
    cityName: "Bhavnagar",
    cityImage: "/hordingimage/bhavnagar1.jpg",
    cityDescription: "Explore hoardings in the historic city of Bhavnagar",
  },
  {
    cityId: "surat",
    cityName: "Surat",
    cityImage: "/hordingimage/s1.jpg",
    cityDescription: "Discover advertising opportunities in the Diamond City",
  },
  {
    cityId: "ahmedabad",
    cityName: "Ahmedabad",
    cityImage: "/hordingimage/a1.jpg",
    cityDescription: "Find prime hoarding locations in the largest city of Gujarat",
  },
];

export default function HoardingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<CityType[]>(fallbackCities);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await apiService.get(endPointApi.hoardings);
        if (Array.isArray(data) && data.length > 0) {
          setCities(data);
        }
      } catch (error) {
        console.error("Error fetching hoarding cities:", error);
      }
    };
    fetchCities();
  }, []);

  const filteredCities = cities.filter(
    (city) =>
      city.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.cityDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-theme-cream min-h-screen">
      <Navbar />

      <PageTransition className="pt-36 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <Link href="/#services">
            <Button
              variant="outline"
              className="mb-12 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-all duration-300 rounded-xl group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Services
            </Button>
          </Link>
          
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-theme-navy/10 text-theme-navy mb-6 bg-white/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Prime Locations</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-theme-navy tracking-tight mb-6 leading-tight">
              Hoarding <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-navy to-blue-600">Networks</span>
            </h1>
            <p className="text-lg text-theme-navy/70 max-w-2xl mx-auto leading-relaxed font-light">
              Explore our extensive hoarding network across major cities in Gujarat to maximize your brand&apos;s reach and impact.
            </p>
          </motion.div>

          <motion.div 
            className="mb-16 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative w-full md:w-[28rem] group">
              <div className="absolute inset-0 bg-theme-navy/5 rounded-2xl blur-xl group-hover:bg-theme-navy/10 transition-colors duration-500" />
              <Input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative pl-12 h-14 bg-white/80 backdrop-blur-xl border-theme-navy/10 text-theme-navy rounded-2xl focus:ring-2 focus:ring-theme-navy/20 shadow-sm transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-navy/40 w-5 h-5 transition-colors group-hover:text-theme-navy" />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={searchTerm}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {filteredCities.map((city) => (
                <InteractiveCard
                  key={city.cityId}
                  title={city.cityName}
                  description={city.cityDescription}
                  image={city.cityImage}
                  fallbackImage="/hordingimage/bhavnagar1.jpg"
                  href={`/services/hoardings/${city.cityId}`}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCities.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 text-theme-navy/50"
            >
              No cities found matching your search.
            </motion.div>
          )}

          <motion.div 
            className="flex justify-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/services/hoardings/all">
              <Button className="h-14 px-10 rounded-2xl bg-theme-navy hover:bg-theme-navy/90 text-white font-bold tracking-wide shadow-xl hover:shadow-theme-navy/30 transition-all duration-300 hover:-translate-y-1">
                View All Hoardings
              </Button>
            </Link>
          </motion.div>
        </div>
      </PageTransition>

      <Footer />
    </div>
  );
}
