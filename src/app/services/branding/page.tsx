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

interface BrandingType {
  slug: string;
  name: string;
  image: string;
  description: string;
}

const fallbackBrandingTypes: BrandingType[] = [
  {
    slug: "tricycle-ad",
    name: "Tricycle Ad",
    image: "/branndingImage/t1.jpg",
    description: "Mobile advertising on tricycles for maximum visibility",
  },
  {
    slug: "rickshaw-ad",
    name: "Rickshaw Ad",
    image: "/branndingImage/r1.jpg",
    description: "Eye-catching ads on rickshaws for local exposure",
  },
  {
    slug: "wall-painting",
    name: "Wall Painting",
    image: "/branndingImage/w1.jpg",
    description: "Large-scale artistic advertisements on building walls",
  },
  {
    slug: "tempovan-ad",
    name: "Tempovan Ad",
    image: "/branndingImage/te1.jpg",
    description: "Mobile advertising on tempo vans for wider reach",
  },
  {
    slug: "canopy",
    name: "Canopy",
    image: "/branndingImage/c1.jpg",
    description: "Branded canopies for events and outdoor promotions",
  },
  {
    slug: "gazebo",
    name: "Gazebo",
    image: "/branndingImage/g1.jpg",
    description: "Customized gazebos for trade shows and exhibitions",
  },
  {
    slug: "acrylic-boards",
    name: "Acrylic Boards",
    image: "/branndingImage/li1.jpg",
    description: "Sleek and modern acrylic signage for businesses",
  },
  {
    slug: "acp-elevation",
    name: "ACP Elevation",
    image: "/branndingImage/ac1.jpg",
    description: "Aluminum Composite Panel elevations for building branding",
  },
  {
    slug: "non-woven-bag",
    name: "Non Woven Bag",
    image: "/branndingImage/no2.jpg",
    description: "Eco-friendly and durable promotional bags",
  },
  {
    slug: "lighting-board",
    name: "Lighting Board",
    image: "/branndingImage/a1.jpg",
    description: "Illuminated signage for enhanced visibility",
  },
  {
    slug: "led-board",
    name: "LED Board",
    image: "/branndingImage/le1.jpg",
    description: "Energy-efficient LED displays for dynamic advertising",
  },
  {
    slug: "sunpack-board",
    name: "Sunpack Board",
    image: "/branndingImage/sp1.jpg",
    description: "Durable and weather-resistant signage for outdoor use",
  },
];

export default function BrandingPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [brandingTypes, setBrandingTypes] = useState<BrandingType[]>(fallbackBrandingTypes);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const data = await apiService.get(endPointApi.branding);
        if (Array.isArray(data) && data.length > 0) {
          setBrandingTypes(data);
        }
      } catch (error) {
        console.error("Error fetching branding services:", error);
      }
    };
    fetchBranding();
  }, []);

  const filteredBranding = brandingTypes.filter(
    (type) =>
      (filter === "all" || type.slug === filter) &&
      (type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Our Services</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-theme-navy tracking-tight mb-6 leading-tight">
              Branding <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-navy to-blue-600">Solutions</span>
            </h1>
            <p className="text-lg text-theme-navy/70 max-w-2xl mx-auto leading-relaxed font-light">
              Discover our comprehensive brand identity services to elevate your business presence and dominate your market.
            </p>
          </motion.div>

          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/40 p-4 rounded-3xl border border-white/60 backdrop-blur-md shadow-sm">
              <div className="relative w-full md:w-96 group">
                <div className="absolute inset-0 bg-theme-navy/5 rounded-2xl blur-xl group-hover:bg-theme-navy/10 transition-colors duration-500" />
                <Input
                  type="text"
                  placeholder="Search branding solutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative pl-12 h-14 bg-white/80 backdrop-blur-xl border-theme-navy/10 text-theme-navy rounded-2xl focus:ring-2 focus:ring-theme-navy/20 shadow-sm transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-navy/40 w-5 h-5 transition-colors group-hover:text-theme-navy" />
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full relative">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                  className={`relative overflow-hidden h-12 px-6 rounded-xl transition-all duration-300 font-semibold ${
                    filter === "all"
                      ? "bg-theme-navy text-white shadow-lg shadow-theme-navy/20"
                      : "bg-white/80 border-theme-navy/10 text-theme-navy hover:bg-theme-navy/5"
                  }`}
                >
                  {filter === "all" && (
                    <motion.div layoutId="branding-filter" className="absolute inset-0 bg-theme-navy" />
                  )}
                  <span className="relative z-10">All</span>
                </Button>
                {brandingTypes.slice(0, 4).map((type) => (
                  <Button
                    key={type.slug}
                    variant={filter === type.slug ? "default" : "outline"}
                    onClick={() => setFilter(type.slug)}
                    className={`relative overflow-hidden h-12 px-6 rounded-xl transition-all duration-300 font-semibold ${
                      filter === type.slug
                        ? "bg-theme-navy text-white shadow-lg shadow-theme-navy/20"
                        : "bg-white/80 border-theme-navy/10 text-theme-navy hover:bg-theme-navy/5"
                    }`}
                  >
                    {filter === type.slug && (
                      <motion.div layoutId="branding-filter" className="absolute inset-0 bg-theme-navy" />
                    )}
                    <span className="relative z-10">{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter + searchTerm}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 perspective-1000"
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
              {filteredBranding.map((type) => (
                <InteractiveCard
                  key={type.slug}
                  title={type.name}
                  description={type.description}
                  image={type.image}
                  fallbackImage="/branndingImage/t1.jpg"
                  href={`/services/branding/${type.slug}`}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredBranding.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 text-theme-navy/50"
            >
              No branding solutions found matching your search.
            </motion.div>
          )}
        </div>
      </PageTransition>

      <Footer />
    </div>
  );
}

