
//services/graphics/page.tsx


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
import { Search, ArrowRight, ArrowLeft } from "lucide-react";

const graphicsTypes = [
  {
    id: "board-banner",
    name: "Board Banner",
    image: "/graphicsimage/bordbanner.jpg?height=400&width=600&text=Board+Banner",
    description: "Large format printed banners for outdoor display",
  },
  {
    id: "business-card",
    name: "Business Card",
    image: "/graphicsimage/bussineshcard.jpg?height=400&width=600&text=Business+Card",
    description: "Professional business cards for networking",
  },
  {
    id: "bill-books",
    name: "Bill Books",
    image: "/graphicsimage/billbook.jpg?height=400&width=600&text=Bill+Books",
    description: "Custom bill books for businesses",
  },
  {
    id: "pamphlet",
    name: "Pamphlet",
    image: "/graphicsimage/paplate.jpg?height=400&width=600&text=Pamphlet",
    description: "Informative pamphlets for marketing",
  },
  {
    id: "brochure",
    name: "Brochure",
    image: "/graphicsimage/brochure.jpg?height=400&width=600&text=Brochure",
    description: "Detailed brochures for product showcases",
  },
  {
    id: "invitation-card",
    name: "Invitation Card",
    image: "/graphicsimage/inviation.jpg?height=400&width=600&text=Invitation+Card",
    description: "Elegant invitation cards for events",
  },
  {
    id: "wedding-card",
    name: "Wedding Card",
    image: "/graphicsimage/weddingcard.jpg?height=400&width=600&text=Wedding+Card",
    description: "Customized wedding cards and invitations",
  },
  {
    id: "digital-pdf",
    name: "Digital PDF",
    image: "/graphicsimage/digital.jpg?height=400&width=600&text=Digital+PDF",
    description: "Interactive digital PDFs for online distribution",
  },
  {
    id: "calendar",
    name: "Calendar",
    image: "/graphicsimage/calender.jpg?height=400&width=600&text=Calendar",
    description: "Custom calendars for promotional purposes",
  },
  {
    id: "doctor-file",
    name: "Doctor File",
    image: "/graphicsimage/doctorfile.jpg?height=400&width=600&text=Doctor+File",
    description: "Specialized file folders for medical professionals",
  },
  {
    id: "letterhead",
    name: "Letterhead",
    image: "/graphicsimage/letter.jpg?height=400&width=600&text=Letterhead",
    description: "Professional letterheads for business correspondence",
  },
  {
    id: "traveling-books",
    name: "Traveling Books",
    image: "/graphicsimage/travillang.jpg?height=400&width=600&text=Traveling+Books",
    description: "Compact, informative travel guides",
  },
  {
    id: "vinyl-sticker",
    name: "Sticker Vinyl",
    image: "/graphicsimage/vinyl.jpg?height=400&width=600&text=Sticker+Vinyl",
    description: "Durable vinyl stickers for various applications",
  },
  {
    id: "blurred-film",
    name: "Blurred Film",
    image: "/graphicsimage/blur.jpg?height=400&width=600&text=Blurred+Film",
    description: "Decorative blurred film for windows and glass surfaces",
  },
  {
    id: "one-way-vision",
    name: "One-Way Vision",
    image: "/graphicsimage/oneway.jpg?height=400&width=600&text=One-Way+Vision",
    description: "One-way vision graphics for windows and vehicles",
  },
];

export default function GraphicsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredType, setHoveredType] = useState(null);

  const filteredGraphics = graphicsTypes.filter(
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
          Graphics Solutions
        </motion.h1>

        <motion.p
          className="text-center text-white mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Explore our creative graphic design solutions for all your needs.
        </motion.p>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search graphics solutions..."
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
              {graphicsTypes.map((type) => (
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
            {filteredGraphics.map((type) => (
              <motion.div
                key={type.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/services/graphics/${type.id}`}>
                  <Card className="h-full flex flex-col justify-between overflow-hidden bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-center text-[#3982c3]">
                        {type.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="relative h-48 mb-4 overflow-hidden rounded-md"
                        onMouseEnter={() => setHoveredType(type.id)}
                        onMouseLeave={() => setHoveredType(null)}
                      >
                        <Image
                          src={type.image}
                          alt={type.name}
                          width={600}
                          height={400}
                          objectFit="cover"
                          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
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
