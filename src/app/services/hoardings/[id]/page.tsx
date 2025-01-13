"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Hoarding {
  id: string;
  title: string;
  image: string;
  description: string;
  currentPrice: number;
  previousPrice: number;
  mapLink: string;
}

interface CityData {
  name: string;
  hoardings: Hoarding[];
}

const cityHoardings: Record<string, CityData> = {
  bhavnagar: {
    name: "Bhavnagar",
    hoardings: [
      {
        id: "bhavnagar-1",
        title: "City Center Billboard",
        image: "/hordingimage/bhavnagar2.jpg?height=600&width=800&text=Bhavnagar+Hoarding+1",
        description: "Prime location in the heart of Bhavnagar",
        currentPrice: 50000,
        previousPrice: 45000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "bhavnagar-2",
        title: "Highway Entrance Hoarding",
        image: "/hordingimage/b2.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "High visibility spot at the city entrance",
        currentPrice: 40000,
        previousPrice: 38000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "bhavnagar-3",
        title: "Mahuva Hoarding",
        image: "/hordingimage/b5.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "High visibility spot at the city entrance",
        currentPrice: 40000,
        previousPrice: 38000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
    ],
  },
  surat: {
    name: "Surat",
    hoardings: [
      {
        id: "surat-1",
        title: "Diamond Market Display",
        image: "/hordingimage/s3.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Located near the famous diamond market",
        currentPrice: 60000,
        previousPrice: 55000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "surat-2",
        title: "Olpad Road Billboard",
        image: "/hordingimage/s2.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Popular tourist route with high traffic",
        currentPrice: 55000,
        previousPrice: 50000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "surat-3",
        title: "olpad Road",
        image: "/hordingimage/s4.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Popular tourist route with high traffic",
        currentPrice: 55000,
        previousPrice: 50000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
    ],
  },
  ahmedabad: {
    name: "Ahmedabad",
    hoardings: [
      {
        id: "ahmedabad-1",
        title: "SG Highway Unipole",
        image: "/hordingimage/a2.jpg?height=600&width=800&text=Ahmedabad+Hoarding+1",
        description: "Premium spot on the busiest highway",
        currentPrice: 75000,
        previousPrice: 70000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "ahmedabad-2",
        title: "Sabarmati Riverfront Billboard",
        image: "/hordingimage/s1.jpg?height=600&width=800&text=Ahmedabad+Hoarding+2",
        description: "Scenic location with high footfall",
        currentPrice: 65000,
        previousPrice: 60000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
    ],
  },
};

export default function CityHoardingsPage() {
  const params = useParams();
  const router = useRouter();
  const [city, setCity] = useState<CityData | null>(null);
  const [selectedHoarding, setSelectedHoarding] = useState<Hoarding | null>(null);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const cityData = cityHoardings[params.id];
      if (cityData) {
        setCity(cityData);
      }
    }
  }, [params.id]);

  if (!city) {
    return (
      <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
        <Button
          variant="outline"
          className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-4xl font-bold mb-8">City not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
      <Link href="/services/hoardings">
        <Button
          variant="outline"
          className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cities
        </Button>
      </Link>
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hoardings in {city.name}
      </motion.h1>
      <motion.p
        className="text-xl text-[#d1e8ff] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore our premium hoarding locations in {city.name}.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {city.hoardings.map((hoarding: Hoarding) => (
          <motion.div
            key={hoarding.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="h-full flex flex-col justify-between overflow-hidden bg-white text-[#1e4060]">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-center text-gray-500">
                  {hoarding.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                  <Image
                    src={hoarding.image}
                    alt={hoarding.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <a
                    href={hoarding.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3982c3] focus:ring-opacity-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MapPin className="h-6 w-6 text-[#3982c3]" />
                  </a>
                </div>
                <p className="text-sm text-gray-500 mb-2">{hoarding.description}</p>
                <p className="text-sm text-gray-500 font-bold">
                  Current Price: ₹{hoarding.currentPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  Previous Price: ₹{hoarding.previousPrice.toLocaleString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  className="bg-[#3982c3] text-white hover:bg-[#2c6190]"
                  onClick={() => setSelectedHoarding(hoarding)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedHoarding && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-2xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-[#3982c3]">{selectedHoarding.title}</h2>
            <Image
              src={selectedHoarding.image}
              alt={selectedHoarding.title}
              width={800}
              height={600}
              objectFit="cover"
              className="rounded-lg mb-4"
            />
            <p className="text-gray-500 mb-4">{selectedHoarding.description}</p>
            <p className="text-gray-500 font-bold mb-2">
              Current Price: ₹{selectedHoarding.currentPrice.toLocaleString()}
            </p>
            <p className="text-gray-500 line-through mb-4">
              Previous Price: ₹{selectedHoarding.previousPrice.toLocaleString()}
            </p>
            <Button
              className="bg-[#3982c3] text-white hover:bg-[#2c6190]"
              onClick={() => setSelectedHoarding(null)}
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

