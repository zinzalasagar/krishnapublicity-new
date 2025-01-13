"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

type CitiesType = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const cities: CitiesType[] = [
  {
    id: "bhavnagar",
    name: "Bhavnagar",
    image: "/hordingimage/bhavnagar1.jpg?height=100&width=200&text=Bhavnagar",
    description: "Explore hoardings in the historic city of Bhavnagar",
  },
  {
    id: "surat",
    name: "Surat",
    image: "/hordingimage/s1.jpg?height=400&width=600&text=Surat",
    description: "Discover advertising opportunities in the Diamond City",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    image: "/hordingimage/a1.jpg?height=400&width=600&text=Ahmedabad",
    description: "Find prime hoarding locations in the largest city of Gujarat",
  },
];

export default function HoardingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="outline"
              className="bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>
          </Link>
        </div>

        <motion.h1
          className="text-5xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hoarding Locations
        </motion.h1>

        <motion.p
          className="text-center text-white mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Explore our hoarding options in major cities of Gujarat.
        </motion.p>

        <div className="mb-8">
          <div className="flex justify-center">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-[#1e4060]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3982c3]" />
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
            {filteredCities.map((city) => (
              <motion.div
                key={city.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/services/hoardings/${city.id}`}>
                  <Card className="h-full flex flex-col justify-between overflow-hidden bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-center text-gray-500">
                        {city.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="relative h-48 mb-4 overflow-hidden rounded-md"
                        onMouseEnter={() => setHoveredCity(city.id)}
                        onMouseLeave={() => setHoveredCity(null)}
                      >
                        <Image
                          src={city.image}
                          alt={city.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                        />
                        {hoveredCity === city.id && (
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
                      <p className="text-sm text-gray-900">{city.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button className="bg-[#3982c3] text-white hover:bg-[#2c6190]">
                        View Hoardings
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-12">
          <Link href="/services/hoardings/all">
            <Button className="bg-[#3982c3] text-white hover:bg-[#2c6190]">
              View All Hoardings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
