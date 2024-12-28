"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

const brandingTypes = [
  {
    id: "tricycle-ad",
    name: "Tricycle Ad",
    image: "/branndingImage/t1.jpg",
    description: "Mobile advertising on tricycles for maximum visibility",
  },
  {
    id: "rickshaw-ad",
    name: "Rickshaw Ad",
    image: "/branndingImage/r1.jpg",
    description: "Eye-catching ads on rickshaws for local exposure",
  },
  {
    id: "wall-painting",
    name: "Wall Painting",
    image: "/branndingImage/w1.jpg",
    description: "Large-scale artistic advertisements on building walls",
  },
  {
    id: "tempovan-ad",
    name: "Tempovan Ad",
    image: "/branndingImage/te1.jpg",
    description: "Mobile advertising on tempo vans for wider reach",
  },
  {
    id: "canopy",
    name: "Canopy",
    image: "/branndingImage/c1.jpg",
    description: "Branded canopies for events and outdoor promotions",
  },
  {
    id: "gazebo",
    name: "Gazebo",
    image: "/branndingImage/g1.jpg",
    description: "Customized gazebos for trade shows and exhibitions",
  },
  {
    id: "acrylic-boards",
    name: "Acrylic Boards",
    image: "/branndingImage/li1.jpg",
    description: "Sleek and modern acrylic signage for businesses",
  },
  {
    id: "acp-elevation",
    name: "ACP Elevation",
    image: "/branndingImage/ac1.jpg",
    description: "Aluminum Composite Panel elevations for building branding",
  },
  {
    id: "non-woven-bag",
    name: "Non Woven Bag",
    image: "/branndingImage/no2.jpg",
    description: "Eco-friendly and durable promotional bags",
  },
  {
    id: "lighting-board",
    name: "Lighting Board",
    image: "/branndingImage/a1.jpg",
    description: "Illuminated signage for enhanced visibility",
  },
  {
    id: "led-board",
    name: "LED Board",
    image: "/branndingImage/le1.jpg",
    description: "Energy-efficient LED displays for dynamic advertising",
  },
  {
    id: "sunpack-board",
    name: "Sunpack Board",
    image: "/branndingImage/sp1.jpg",
    description: "Durable and weather-resistant signage for outdoor use",
  },
];

export default function BrandingPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredType, setHoveredType] = useState(null);

  const filteredBranding = brandingTypes.filter(
    (type) =>
      (filter === "all" || type.id === filter) &&
      (type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen">
      <div className="container mx-auto px-4">
        <Link href="/">
        <Button
          variant="outline"
          className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        </Link>
        <motion.h1
          className="text-5xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Branding Solutions
        </motion.h1>

        <motion.p
          className="text-center text-white mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Discover our comprehensive brand identity services to elevate your
          business.
        </motion.p>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search branding solutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-[#1e4060]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3982c3]" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={
                  filter === "all"
                    ? "bg-[#3982c3] text-white"
                    : "bg-white text-[#3982c3]"
                }
              >
                All Types
              </Button>
              {brandingTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={filter === type.id ? "default" : "outline"}
                  onClick={() => setFilter(type.id)}
                  className={
                    filter === type.id
                      ? "bg-[#3982c3] text-white"
                      : "bg-white text-[#3982c3]"
                  }
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredBranding.map((type) => (
              <motion.div
                key={type.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/services/branding/${type.id}`}>
                  <Card className="h-full flex flex-col justify-between overflow-hidden bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-center text-[#3982c3]">
                        {type.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="relative h-48 mb-4 overflow-hidden rounded-md group"
                        onMouseEnter={() => setHoveredType(type.id)}
                        onMouseLeave={() => setHoveredType(null)}
                      >
                        <Image
                          src={type.image}
                          alt={type.name}
                          width={600}
                          height={400}
                          className="transition-transform duration-300 ease-in-out transform group-hover:scale-110 "
                          // onError={(e) => {
                          //   e.currentTarget.src = type.image.replace('.jpg', '.png');
                          // }}
                        />
                        {hoveredType === type.id && (
                          <motion.div
                            className="absolute inset-0 bg-[#3982c3] bg-opacity-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <ArrowRight className="text-white w-12 h-12" />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-[#1e4060]">
                        {type.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button className="bg-[#3982c3] text-white hover:bg-[#2c6190]">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

