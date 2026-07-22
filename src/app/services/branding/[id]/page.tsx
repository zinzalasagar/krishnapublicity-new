"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import PageTransition from "@/components/PageTransition";

interface BrandingType {
  name: string;
  images: string[];
  description: string;
}

const fallbackBrandingTypes: Record<string, BrandingType> = {
  "tricycle-ad": {
    name: "Tricycle Ad",
    images: ["/branndingImage/t2.jpg", "/branndingImage/t3.jpg", "/branndingImage/t4.jpg"],
    description: "Mobile advertising on tricycles for maximum visibility",
  },
  "rickshaw-ad": {
    name: "Rickshaw Ad",
    images: [
      "/branndingImage/r2.jpg",
      "/branndingImage/r3.jpg",
      "/branndingImage/r4.jpg",
    ],
    description: "Eye-catching ads on rickshaws for local exposure",
  },
  "wall-painting": {
    name: "Wall Painting",
    images: ["/branndingImage/w2.jpg", "/branndingImage/w3.jpg", "/branndingImage/w4.jpg"],
    description: "Large-scale artistic advertisements on building walls",
  },
};

export default function BrandingTypePage() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [brandingType, setBrandingType] = useState<BrandingType | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const slugKey = params.id.toLowerCase();
      
      apiService.get(endPointApi.branding)
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            const found = data.find((item: any) => item.slug?.toLowerCase() === slugKey);
            if (found) {
              const gallery = (found.galleryImages && found.galleryImages.length > 0) 
                ? found.galleryImages 
                : [found.image || '/branndingImage/t1.jpg'];
              setBrandingType({
                name: found.name,
                images: gallery.map((imgUrl: string) => apiService.getImageUrl(imgUrl)),
                description: found.description
              });
              return;
            }
          }
          if (fallbackBrandingTypes[slugKey]) {
            setBrandingType(fallbackBrandingTypes[slugKey]);
          }
        })
        .catch(() => {
          if (fallbackBrandingTypes[slugKey]) {
            setBrandingType(fallbackBrandingTypes[slugKey]);
          }
        });
    }
  }, [params.id]);

  if (!brandingType) {
    return (
      <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-4 pt-36 pb-24 text-theme-navy flex flex-col items-center justify-center">
          <Button
            variant="outline"
            className="mb-8 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-4xl font-bold mb-8 text-theme-navy">Branding service not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % brandingType.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + brandingType.images.length) % brandingType.images.length
    );
  };

  // Calculate header scale based on scroll
  const headerScale = Math.max(1 - scrollY / 1000, 0.85);
  const headerOpacity = Math.max(1 - scrollY / 500, 0.4);

  return (
    <PageTransition className="bg-slate-50 min-h-screen flex flex-col justify-between font-sans selection:bg-theme-navy selection:text-white">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-24 max-w-[1400px] flex-grow">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Sticky Left Section */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)] flex flex-col justify-between">
            <div>
              <Link href="/services/branding">
                <Button
                  variant="outline"
                  className="mb-8 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-all duration-300 rounded-xl group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Services
                </Button>
              </Link>
              
              <motion.div
                style={{ scale: headerScale, opacity: headerOpacity, transformOrigin: "left top" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-theme-navy/10 text-theme-navy mb-6 bg-white shadow-sm">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Branding Solution</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-theme-navy tracking-tight mb-6 leading-none">
                  {brandingType.name}
                </h1>
                <p className="text-lg text-theme-navy/70 leading-relaxed max-w-md">
                  {brandingType.description} Engage your audience and amplify your brand identity with our tailored solutions.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              className="hidden lg:block pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-4 text-theme-navy/50 text-sm font-medium">
                <div className="h-px bg-theme-navy/20 flex-grow" />
                <span>{brandingType.images.length} Showcase {brandingType.images.length === 1 ? 'Image' : 'Images'}</span>
              </div>
            </motion.div>
          </div>

          {/* Scrollable Right Section (Gallery) */}
          <div className="w-full lg:w-3/5">
            <motion.div 
              className="relative flex flex-col items-center justify-center bg-white p-4 md:p-8 rounded-[2.5rem] border border-theme-navy/10 shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={brandingType.images[currentImageIndex]}
                    alt={`${brandingType.name} ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                {brandingType.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full w-14 h-14 bg-white/50 backdrop-blur-md hover:bg-white text-theme-navy border-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="outline"
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full w-14 h-14 bg-white/50 backdrop-blur-md hover:bg-white text-theme-navy border-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}
              </div>

              {brandingType.images.length > 1 && (
                <div className="flex flex-wrap justify-center mt-8 gap-4 w-full">
                  {brandingType.images.map((img, index) => (
                    <motion.button
                      key={index}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex ? "border-theme-navy shadow-lg" : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>

      <Footer />
    </PageTransition>
  );
}

