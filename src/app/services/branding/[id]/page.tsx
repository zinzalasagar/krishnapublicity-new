"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface BrandingType {
  name: string;
  images: string[];
  description: string;
}

const brandingTypes: Record<string, BrandingType> = {
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
  "tempovan-ad": {
    name: "Tempovan Ad",
    images: [
      "/branndingImage/te2.jpg",
      "/branndingImage/te4.jpg",
      "/branndingImage/te3.jpg",
    ],
    description: "Mobile advertising on tempo vans for wider reach",
  },
  canopy: {
    name: "Canopy",
    images: [
      "/branndingImage/c4.jpg",
      "/branndingImage/c2.jpg",
      "/branndingImage/c3.jpg",
    ],
    description: "Branded canopies for events and outdoor promotions",
  },
  gazebo: {
    name: "Gazebo",
    images: [
      "/branndingImage/g4.jpg",
      "/branndingImage/g2.jpg",
      "/branndingImage/g3.jpg",
    ],
    description: "Customized gazebos for trade shows and exhibitions",
  },
  "acrylic-boards": {
    name: "Acrylic Boards",
    images: [
      "/branndingImage/li4.jpg",
      "/branndingImage/li2.jpg",
      "/branndingImage/li3.jpg",
    ],
    description: "Sleek and modern acrylic signage for businesses",
  },
  "acp-elevation": {
    name: "ACP Elevation",
    images: ["/branndingImage/ac4.jpg", "/branndingImage/ac2.jpg", "/branndingImage/ac3.jpg"],
    description: "Aluminum Composite Panel elevations for building branding",
  },
  "non-woven-bag": {
    name: "Non Woven Bag",
    images: [
      "/branndingImage/no4.jpg",
      "/branndingImage/no2.jpg",
      "/branndingImage/no3.jpg",
    ],
    description: "Eco-friendly and durable promotional bags",
  },
  "lighting-board": {
    name: "Lighting Board",
    images: [
      "/branndingImage/a4.jpg",
      "/branndingImage/a2.jpg",
      "/branndingImage/a3.jpg",
    ],
    description: "Illuminated signage for enhanced visibility",
  },
  "led-board": {
    name: "LED Board",
    images: [
      "/branndingImage/le4.jpg",
      "/branndingImage/le2.jpg",
      "/branndingImage/le3.jpg",
    ],
    description: "Energy-efficient LED displays for dynamic advertising",
  },
  "sunpack-board": {
    name: "Sunpack Board",
    images: [
      "/branndingImage/sp4.jpg",
      "/branndingImage/sp2.jpg",
      "/branndingImage/sp3.jpg",
    ],
    description: "Durable and weather-resistant signage for outdoor use",
  },
};

export default function BrandingTypePage() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [brandingType, setBrandingType] = useState<BrandingType | null>(null);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const type = brandingTypes[params.id];
      if (type) {
        setBrandingType(type);
      }
    }
  }, [params.id]);

  if (!brandingType) {
    return (
      <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
        <Button
          variant="outline"
          className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-4xl font-bold mb-8">Branding type not found</h1>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % brandingType.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + brandingType.images.length) %
        brandingType.images.length
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
      <Link href="/services/branding">
        <Button
          variant="outline"
          className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {brandingType.name}
      </motion.h1>
      <motion.p
        className="text-xl text-[#d1e8ff] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {brandingType.description}
      </motion.p>
      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="relative h-96 md:h-[600px] rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={brandingType.images[currentImageIndex]}
              alt={`${brandingType.name} ${currentImageIndex + 1}`}
              width={900}
              height={600}
              objectFit="cover"
            />
          </motion.div>
        </AnimatePresence>
        <Button
          variant="outline"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-[#3982c3]"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-[#3982c3]"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        {brandingType.images.map((_, index) => (
          <motion.button
            key={index}
            className={`h-3 w-3 rounded-full mx-1 ${index === currentImageIndex ? "bg-white" : "bg-[#2c6190]"
              }`}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

