"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

type HoardingImage = {
    id: string;
    src: string;
    location: string;
};

const allHoardings: HoardingImage[] = [
    {
        id: "bhavnagar1",
        src: "/hordingimage/bhavnagar1.jpg?height=400&width=600&text=Bhavnagar-1",
        location: "Bhavnagar Central"
    },
    {
        id: "bhavnagar2",
        src: "/hordingimage/bhavnagar2.jpg?height=400&width=600&text=Bhavnagar-2",
        location: "Bhavnagar Highway"
    },
    {
        id: "bhavnagar4",
        src: "/hordingimage/b2.jpg?height=400&width=600&text=Bhavnagar-2",
        location: "Bhavnagar Highway"
    },
    {
        id: "bhavnagar3",
        src: "/hordingimage/b5.jpg?height=400&width=600&text=Bhavnagar-3",
        location: "Bhavnagar Market"
    },
    {
        id: "surat1",
        src: "/hordingimage/s1.jpg?height=400&width=600&text=Surat-1",
        location: "Surat Ring Road"
    },
    {
        id: "surat2",
        src: "/hordingimage/s2.jpg?height=400&width=600&text=Surat-2",
        location: "Surat Station"
    },
    {
        id: "surat3",
        src: "/hordingimage/s3.jpg?height=400&width=600&text=Surat-3",
        location: "Surat Mall"
    },
    {
        id: "surat4",
        src: "/hordingimage/s4.jpg?height=400&width=600&text=Surat-3",
        location: "Surat Mall"
    },
    {
        id: "ahmedabad1",
        src: "/hordingimage/a1.jpg?height=400&width=600&text=Ahmedabad-1",
        location: "Ahmedabad SG Highway"
    },
    {
        id: "ahmedabad2",
        src: "/hordingimage/a2.jpg?height=400&width=600&text=Ahmedabad-2",
        location: "Ahmedabad Airport Road"
    },
];

export default function AllHoardingsPage() {
    const [hoveredHoarding, setHoveredHoarding] = useState<string | null>(null);

    return (
        <section className="py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/services/hoardings">
                        <Button
                            variant="outline"
                            className="bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cities
                        </Button>
                    </Link>
                </div>

                <motion.h1
                    className="text-5xl font-bold text-center mb-12 text-white"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    All Available Hoardings
                </motion.h1>

                <motion.p
                    className="text-center text-white mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Explore our complete collection of premium advertising locations.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {allHoardings.map((hoarding) => (
                        <motion.div
                            key={hoarding.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative bg-white rounded-lg overflow-hidden shadow-lg"
                        >
                            <div className="p-4">
                                <div
                                    className="relative h-64 mb-4 overflow-hidden rounded-md"
                                    onMouseEnter={() => setHoveredHoarding(hoarding.id)}
                                    onMouseLeave={() => setHoveredHoarding(null)}
                                >
                                    <Image
                                        src={hoarding.src}
                                        alt={hoarding.location}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                                    />
                                    <AnimatePresence>
                                        {hoveredHoarding === hoarding.id && (
                                            <motion.div
                                                className="absolute inset-0 bg-[#3982c3] bg-opacity-50 flex items-center justify-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <ArrowRight className="text-white w-12 h-12" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-500 mb-2">
                                    {hoarding.location}
                                </h3>
                                <div className="flex justify-center">
                                    <Link href={`/services/hoardings/${hoarding.id.split(/\d+/)[0]}`}>
                                        <Button className="bg-[#3982c3] text-white hover:bg-[#2c6190]">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

