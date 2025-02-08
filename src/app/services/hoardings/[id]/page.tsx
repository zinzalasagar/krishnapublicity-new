"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
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
        title: "Bhavnagar",
        image: "/hordingimage/Picture1.jpg?height=600&width=800&text=Bhavnagar+Hoarding+1",
        description: " SBV- KA03-B’nagar- kobdi  NH- 8E Talaja To B’nagar-Costal Hwy.",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/HDyRAVBGrK1HCJsTA"
      },
      {
        id: "bhavnagar-2",
        title: "Bhavnagar",
        image: "/hordingimage/Picture2.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "B’nagar- kobdi  NH- 8E  bhavnagar  to Talaja  –Toll plaza -Costal Hwy.",
        currentPrice: 18000,
        previousPrice: 20000,
        mapLink: "https://maps.app.goo.gl/HDyRAVBGrK1HCJsTA"
      },
      {
        id: "bhavnagar-3",
        title: "Bhavnagar",
        image: "/hordingimage/Picture3.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "B’nagar- Rajpara-khodiyar maa mandir main roed – bhavnagar to rajkot ",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/5hcewPYsDxH9LjTE6"
      },
      {
        id: "bhavnagar-4",
        title: "Bhavnagar",
        image: "/hordingimage/Picture4.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "B’nagar- Rajpara-khodiyar maa mandir main roed – bhavnagar to rajkot  ",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/5hcewPYsDxH9LjTE6"
      },
      {
        id: "bhavnagar-5",
        title: "Mahuva",
        image: "/hordingimage/Picture6.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Neswad Chokdi",  
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/ic1Nf8PH86eiXYvd7"
      },
      {
        id: "bhavnagar-6",
        title: "Mahuva",
        image: "/hordingimage/Picture7.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Neswad Chokdi",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/ic1Nf8PH86eiXYvd7"
      },
      {
        id: "bhavnagar-7",
        title: "Mahuva",
        image: "/hordingimage/Picture8.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda chokdi",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/jajddgxXLFEMinjU7"
      },
      {
        id: "bhavnagar-8",
        title: "Mahuva",
        image: "/hordingimage/Picture9.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda chokdi – cng pump ",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/jajddgxXLFEMinjU7"
      },
      {
        id: "bhavnagar-9",
        title: "Mahuva",
        image: "/hordingimage/Picture10.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda chokdi – mahuva to bhavnagar Exway 08",
        currentPrice: 18000,
        previousPrice: 20000,
        mapLink: "https://maps.app.goo.gl/jajddgxXLFEMinjU7"
      },
      {
        id: "bhavnagar-10",
        title: "Mahuva",
        image: "/hordingimage/Picture11.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda mogal maa tampl– parking ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/ECJWgL77gYnYV8dq9"
      },
      {
        id: "bhavnagar-11",
        title: "Mahuva",
        image: "/hordingimage/Picture12.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Nr. New Pollice Station S T Rd",
        currentPrice: 9000,
        previousPrice: 11000,
        mapLink: "https://maps.app.oo.gl/5hcewPYsDxH9LjTE6"
      },
      {
        id: "bhavnagar-12",
        title: "Mahuva",
        image: "/hordingimage/Picture13.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– BAGDANA-bapasitaram tample   ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/YbPNzWiWDpBtQtmq6"
      },
      {
        id: "bhavnagar-13",
        title: "Mahuva",
        image: "/hordingimage/Picture14.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– BAGDANA-bapasitaram tample   ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/YbPNzWiWDpBtQtmq6"
      },
      {
        id: "bhavnagar-14",
        title: "Talaja",
        image: "/hordingimage/Picture15.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja – bhupatbhai gardan main road",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/QkeGS6rTvH2WUj8i7"
      },
      {
        id: "bhavnagar-15",
        title: "Talaja",
        image: "/hordingimage/Picture16.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja – bhupatbhai gardan main road",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/QkeGS6rTvH2WUj8i7"
      },
      {
        id: "bhavnagar-16",
        title: "Talaja",
        image: "/hordingimage/Picture17.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja opp krishna hotel –City entry –Bhavnagar highway 08",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/eTERdbyBNU4havu16"
      },
      {
        id: "bhavnagar-17",
        title: "Talaja",
        image: "/hordingimage/Picture18.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja opp krishna hotel –City entry –Bhavnagar highway 08 ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/eTERdbyBNU4havu16"
      },
      {
        id: "bhavnagar-18",
        title: "Talaja",
        image: "/hordingimage/Picture19.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja opp jagabhai hotel –City entry –Bhavnagar to Mahuva highway",
        currentPrice: 22000,
        previousPrice: 24000,
        mapLink: "https://maps.app.goo.gl/RZWvmrVa22kyDYEp9"
      },
      {
        id: "bhavnagar-19",
        title: "Talaja",
        image: "/hordingimage/Picture20.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Talaja- opp Prarambh hotel –City entry –Bhavnagar to Mahuva highway   ",
        currentPrice: 12000,
        previousPrice: 14000,
        mapLink: "https://maps.app.goo.gl/uzRmPzzMiPjW3WSG6"
      },
      {
        id: "bhavnagar-20",
        title: "Talaja",
        image: "/hordingimage/Picture21.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Talaja- opp Prarambh hotel –City entry –Bhavnagar to Mahuva highway ",
        currentPrice: 12000,
        previousPrice: 14000,
        mapLink: "https://maps.app.goo.gl/uzRmPzzMiPjW3WSG6"
      },
      {
        id: "bhavnagar-21",
        title: "Talaja",
        image: "/hordingimage/Picture22.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Velavadar – somnath Bhavnagar highway ",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://maps.app.goo.gl/pPonC7uijPKR5fFg9"
      },
      {
        id: "bhavnagar-22",
        title: "Talaja",
        image: "/hordingimage/Picture23.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Velavadar – somnath Bhavnagar highway   ",
        currentPrice: 20000,
        previousPrice: 220000,
        mapLink: "https://maps.app.goo.gl/pPonC7uijPKR5fFg9"
      },
      {
        id: "bhavnagar-23",
        title: "Talaja",
        image: "/hordingimage/Picture24.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A054– Bhandariya – opp Nath hills Fc Talaja main Road",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://maps.app.goo.gl/y8gEL65pvqk7sqXa7"
      },
    ],
  },
  surat: {
    name: "Surat",
    hoardings: [
      {
        id: "surat-1",
        title: "Olpad",
        image: "/surathording/olpad/Picture1.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – opp,Polise Station main Road",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/sKVV4HCF2KnQYuiv8"
      },
      {
        id: "surat-2",
        title: "Olpad",
        image: "/surathording/olpad/Picture2.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – opp,Polise Station main Road",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/sKVV4HCF2KnQYuiv8"
      },
      {
        id: "surat-3",
        title: "Olpad",
        image: "/surathording/olpad/Picture3.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – opp,Polise Station main Road",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/sKVV4HCF2KnQYuiv8"
      },
      {
        id: "surat-4",
        title: "Olpad",
        image: "/surathording/olpad/Picture4.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – BSNL office main Road-fc.kim road ",
        currentPrice: 8500,
        previousPrice: 11000,
        mapLink: "https://maps.app.goo.gl/9xMKSetfwXxe5WqbA"
      },
      {
        id: "surat-5",
        title: "Olpad",
        image: "/surathording/olpad/Picture5.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – BSNL office main Road-fc.kim road",
        currentPrice: 8500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/9xMKSetfwXxe5WqbA"
      },
      {
        id: "surat-6",
        title: "Olpad",
        image: "/surathording/olpad/Picture6.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – BSNL office main Road-fc.Surat city road",
        currentPrice: 0,
        previousPrice: 0,
        mapLink: "https://maps.app.goo.gl/9xMKSetfwXxe5WqbA"
      },
      {
        id: "surat-7",
        title: "Olpad",
        image: "/surathording/olpad/Picture7.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – HP pump main Road-fc.Surat city road",
        currentPrice: 8500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/z5Rps3VUGE3Y38c5A"
      },
      {
        id: "surat-8",
        title: "Olpad",
        image: "/surathording/olpad/Picture8.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – HP pump main Road-fc.Surat city road",
        currentPrice: 8500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/z5Rps3VUGE3Y38c5A"
      },
      {
        id: "surat-9",
        title: "Olpad",
        image: "/surathording/olpad/Picture9.png?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Fruit Market city entry ",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/Kz3agMym8xGakMrH6"
      },
      {
        id: "surat-10",
        title: "Olpad",
        image: "/surathording/olpad/Picture10.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – Fruit Market city entry (BG)",
        currentPrice: 9200,
        previousPrice: 12000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "surat-11",
        title: "Olpad",
        image: "/surathording/olpad/Picture11.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Senakhadi-city exit .fc surat city",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "https://maps.app.goo.gl/kixw2nZnqofKXMKH9"
      },
      {
        id: "surat-12",
        title: "Olpad",
        image: "/surathording/olpad/Picture12.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Senakhadi-city exit .fc surat city",
        currentPrice: 15000,
        previousPrice: 17000,
        mapLink: "https://maps.app.goo.gl/kixw2nZnqofKXMKH9"
      },
      {
        id: "surat-13",
        title: "Olpad",
        image: "/surathording/olpad/Picture13.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – Senakhadi-city entry .fc surat to olpad",
        currentPrice: 14000,
        previousPrice: 16000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "surat-14",
        title: "Olpad",
        image: "/surathording/olpad/Picture14.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Senakhadi-city entry .fc kim –Ankleswar ",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/mg3usL2DRDBeGqh47"
      },
      {
        id: "surat-15",
        title: "Olpad",
        image: "/surathording/olpad/Picture15.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad –fruit market fc-surat city",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "https://maps.app.goo.gl/feT2CdCMgrJEu9Sb8"
      },
      {
        id: "surat-16",
        title: "Olpad",
        image: "/surathording/olpad/Picture16.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad –fruit market fc-surat city",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "Surat-olpad –fruit market fc-surat city"
      },
      {
        id: "surat-17",
        title: "Olpad",
        image: "/surathording/olpad/Picture17.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – fruit market -city entry .fc kim –Ankleswar",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "https://maps.app.goo.gl/feT2CdCMgrJEu9Sb8"
      },
      {
        id: "surat-18",
        title: "Olpad",
        image: "/surathording/olpad/Picture18.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – fruit market -city entry .fc kim –Ankleswar",
        currentPrice: 7500,
        previousPrice: 9000,
        mapLink: "https://maps.app.goo.gl/feT2CdCMgrJEu9Sb8"
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

  const handleDownload = async () => {
    if (!selectedHoarding) return;

    try {
      // Sanitize description for filename
      const sanitizeForFilename = (str: string) => {
        return str
          .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-')            // Replace spaces with dashes
          .substring(0, 50)               // Limit to 50 characters
          .toLowerCase();                 // Convert to lowercase
      };

      const descriptionFileName = sanitizeForFilename(selectedHoarding.description);

      // Get clean image URL without query parameters
      const imageUrl = selectedHoarding.image.split('?')[0];

      // Fetch image data
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const imageBlob = await response.blob();

      // Create text file with description
      const textContent = `${selectedHoarding.title}\n\n${selectedHoarding.description}`;
      const textBlob = new Blob([textContent], { type: 'text/plain' });

      // Create ZIP file
      const zip = new JSZip();
      zip.file(`${selectedHoarding.title}.txt`, textBlob);
      zip.file(`hoarding-image.jpg`, imageBlob);

      // Generate and save ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${descriptionFileName}-details.zip`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

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
            className="bg-white rounded-lg p-8 max-w-2xl w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close Icon at the Top */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedHoarding(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

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

            {/* Save Button */}
            {/* <Button
              className="bg-[#3982c3] text-white hover:bg-[#2c6190] mr-2"
              onClick={async () => {
                try {
                  const imageUrl = selectedHoarding.image.split('?')[0];
                  const response = await fetch(imageUrl);
                  if (!response.ok) throw new Error('Failed to fetch image');
                  const imageBlob = await response.blob();

                  const textContent = `${selectedHoarding.title}\n\n${selectedHoarding.description}`;
                  const textBlob = new Blob([textContent], { type: 'text/plain' });

                  const zip = new JSZip();
                  zip.file(`${selectedHoarding.title}.txt`, textBlob);
                  zip.file(`hoarding-image.jpg`, imageBlob);

                  const content = await zip.generateAsync({ type: 'blob' });
                  saveAs(content, `${selectedHoarding.title}-details.zip`);
                } catch (error) {
                  console.error('Save error:', error);
                  alert('Save failed. Please try again.');
                }
              }}
            >
              Save
            </Button> */}

            {/* Download Button */}
            <Button
              className="bg-[#3982c3] text-white hover:bg-[#2c6190]"
              onClick={handleDownload}
            >
              Download
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

