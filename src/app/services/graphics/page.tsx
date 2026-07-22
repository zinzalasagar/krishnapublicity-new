"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import PageTransition from "@/components/PageTransition";
import InteractiveCard from "@/components/InteractiveCard";

interface GraphicsType {
  slug: string;
  name: string;
  image: string;
  description: string;
}

const fallbackGraphicsTypes: GraphicsType[] = [
  {
    slug: "board-banner",
    name: "Board Banner",
    image: "/graphicsimage/bordbanner.jpg",
    description: "Large format printed banners for outdoor display",
  },
  {
    slug: "business-card",
    name: "Business Card",
    image: "/graphicsimage/bussineshcard.jpg",
    description: "Professional business cards for networking",
  },
  {
    slug: "bill-books",
    name: "Bill Books",
    image: "/graphicsimage/billbook.jpg",
    description: "Custom bill books for businesses",
  },
  {
    slug: "pamphlet",
    name: "Pamphlet",
    image: "/graphicsimage/paplate.jpg",
    description: "Informative pamphlets for marketing",
  },
  {
    slug: "brochure",
    name: "Brochure",
    image: "/graphicsimage/brochure.jpg",
    description: "Detailed brochures for product showcases",
  },
  {
    slug: "invitation-card",
    name: "Invitation Card",
    image: "/graphicsimage/inviation.jpg",
    description: "Elegant invitation cards for events",
  },
  {
    slug: "wedding-card",
    name: "Wedding Card",
    image: "/graphicsimage/weddingcard.jpg",
    description: "Customized wedding cards and invitations",
  },
  {
    slug: "digital-pdf",
    name: "Digital PDF",
    image: "/graphicsimage/digital.jpg",
    description: "Interactive digital PDFs for online distribution",
  },
  {
    slug: "calendar",
    name: "Calendar",
    image: "/graphicsimage/calender.jpg",
    description: "Custom calendars for promotional purposes",
  },
  {
    slug: "doctor-file",
    name: "Doctor File",
    image: "/graphicsimage/doctorfile.jpg",
    description: "Specialized file folders for medical professionals",
  },
  {
    slug: "letterhead",
    name: "Letterhead",
    image: "/graphicsimage/letter.jpg",
    description: "Professional letterheads for business correspondence",
  },
  {
    slug: "traveling-books",
    name: "Traveling Books",
    image: "/graphicsimage/travillang.jpg",
    description: "Compact, informative travel guides",
  },
  {
    slug: "vinyl-sticker",
    name: "Sticker Vinyl",
    image: "/graphicsimage/vinyl.jpg",
    description: "Durable vinyl stickers for various applications",
  },
  {
    slug: "blurred-film",
    name: "Blurred Film",
    image: "/graphicsimage/blur.jpg",
    description: "Decorative blurred film for windows and glass surfaces",
  },
  {
    slug: "one-way-vision",
    name: "One-Way Vision",
    image: "/graphicsimage/oneway.jpg",
    description: "One-way vision graphics for windows and vehicles",
  },
];

export default function GraphicsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [graphicsTypes, setGraphicsTypes] = useState<GraphicsType[]>(fallbackGraphicsTypes);

  useEffect(() => {
    const fetchGraphics = async () => {
      try {
        const data = await apiService.get(endPointApi.graphics);
        if (Array.isArray(data) && data.length > 0) {
          setGraphicsTypes(data);
        }
      } catch (error) {
        console.error("Error fetching graphics services:", error);
      }
    };
    fetchGraphics();
  }, []);

  const filteredGraphics = graphicsTypes.filter(
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
              Graphics <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-navy to-blue-600">Solutions</span>
            </h1>
            <p className="text-lg text-theme-navy/70 max-w-2xl mx-auto leading-relaxed font-light">
              Explore our creative graphic design solutions designed to make your visual communications stand out.
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
                  placeholder="Search graphics solutions..."
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
                    <motion.div layoutId="graphics-filter" className="absolute inset-0 bg-theme-navy" />
                  )}
                  <span className="relative z-10">All</span>
                </Button>
                {graphicsTypes.slice(0, 4).map((type) => (
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
                      <motion.div layoutId="graphics-filter" className="absolute inset-0 bg-theme-navy" />
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
              {filteredGraphics.map((type) => (
                <InteractiveCard
                  key={type.slug}
                  title={type.name}
                  description={type.description}
                  image={type.image}
                  fallbackImage="/graphicsimage/bordbanner.jpg"
                  href={`/services/graphics/${type.slug}`}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredGraphics.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 text-theme-navy/50"
            >
              No graphics solutions found matching your search.
            </motion.div>
          )}
        </div>
      </PageTransition>

      <Footer />
    </div>
  );
}
