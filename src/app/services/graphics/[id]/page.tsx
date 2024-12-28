
//services/graphics/[id]/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const graphicsTypes = {
  "board-banner": {
    name: "Board Banner",
    images: [
      "/graphicsimage/tyepimages/board1.jpg?height=600&width=800&fill&text=Board+Banner+1",
      "/graphicsimage/tyepimages/board2.jpg?height=600&width=800&text=Board+Banner+2",
      "/graphicsimage/tyepimages/boARD3.jpg?height=600&width=800&text=Board+Banner+3",
    ],
    description:
      "Large format printed banners for outdoor display. Perfect for events, promotions, and business advertising.",
  },
  "business-card": {
    name: "Business Card",
    images: [
      "/graphicsimage/tyepimages/b1.jpg?height=600&width=800&text=Business+Card+1",
      "/graphicsimage/tyepimages/b2.jpg?height=600&width=800&text=Business+Card+2",
      "/graphicsimage/tyepimages/placeholder.svg?height=600&width=800&text=Business+Card+3",
    ],
    description:
      "Professional business cards for networking. Make a lasting impression with our custom designs.",
  },
  "bill-books": {
    name: "Bill Books",
    images: [
      "/graphicsimage/tyepimages/bill1.jpg?height=600&width=800&text=Bill+Books+1",
      "/graphicsimage/tyepimages/bill2.jpg?height=600&width=800&text=Bill+Books+2",
      "/graphicsimage/tyepimages/bill3.jpg?height=600&width=800&text=Bill+Books+3",
    ],
    description:
      "Custom bill books for businesses. Organize your financial records with our professional designs.",
  },
  pamphlet: {
    name: "Pamphlet",
    images: [
      "/graphicsimage/tyepimages/p1.jpg?height=600&width=800&text=Pamphlet+1",
      "/graphicsimage/tyepimages/p2.jpg?height=600&width=800&text=Pamphlet+2",
      "/graphicsimage/tyepimages/p3.jpg?height=600&width=800&text=Pamphlet+3",
    ],
    description:
      "Informative pamphlets for marketing. Convey your message effectively with our eye-catching designs.",
  },
  brochure: {
    name: "Brochure",
    images: [
      "/graphicsimage/tyepimages/bro1.jpg?height=600&width=800&text=Brochure+1",
      "/graphicsimage/tyepimages/bro2.jpg?height=600&width=800&text=Brochure+2",
      "/graphicsimage/tyepimages/bro3.jpg?height=600&width=800&text=Brochure+3",
    ],
    description:
      "Detailed brochures for product showcases. Highlight your offerings with our professional layouts.",
  },
  "invitation-card": {
    name: "Invitation Card",
    images: [
      "/graphicsimage/tyepimages/in1.jpg?height=600&width=800&text=Invitation+Card+1",
      "/graphicsimage/tyepimages/in3.jpg?height=600&width=800&text=Invitation+Card+2",
      "/graphicsimage/tyepimages/in2.jpg?height=600&width=800&text=Invitation+Card+3",
    ],
    description:
      "Elegant invitation cards for events. Set the tone for your special occasion with our custom designs.",
  },
  "wedding-card": {
    name: "Wedding Card",
    images: [
      "/graphicsimage/tyepimages/we1.jpg?height=600&width=800&text=Wedding+Card+1",
      "/graphicsimage/tyepimages/we2.jpg?height=600&width=800&text=Wedding+Card+2",
      "/graphicsimage/tyepimages/we3.jpg?height=600&width=800&text=Wedding+Card+3",
    ],
    description:
      "Customized wedding cards and invitations. Celebrate your love with our beautiful and unique designs.",
  },
  "digital-pdf": {
    name: "Digital PDF",
    images: [
      "/graphicsimage/tyepimages/d1.jpg?height=600&width=800&text=Digital+PDF+1",
      "/graphicsimage/tyepimages/d2.jpg?height=600&width=800&text=Digital+PDF+2",
      "/graphicsimage/tyepimages/d3.jpg?height=600&width=800&text=Digital+PDF+3",
    ],
    description:
      "Interactive digital PDFs for online distribution. Engage your audience with our dynamic and responsive designs.",
  },
  calendar: {
    name: "Calendar",
    images: [
      "/graphicsimage/tyepimages/c1.jpg?height=600&width=800&text=Calendar+1",
      "/graphicsimage/tyepimages/c2.jpg?height=600&width=800&text=Calendar+2",
      "/graphicsimage/tyepimages/c3.jpg?height=600&width=800&text=Calendar+3",
    ],
    description:
      "Custom calendars for promotional purposes. Keep your brand visible all year round with our creative designs.",
  },
  "doctor-file": {
    name: "Doctor File",
    images: [
      "/graphicsimage/tyepimages/do1.jpg?height=600&width=800&text=Doctor+File+1",
      "/graphicsimage/tyepimages/do2.jpg?height=600&width=800&text=Doctor+File+2",
      "/graphicsimage/tyepimages/do3.jpg?height=600&width=800&text=Doctor+File+3",
    ],
    description:
      "Specialized file folders for medical professionals. Organize patient information efficiently with our tailored designs.",
  },
  letterhead: {
    name: "Letterhead",
    images: [
      "/graphicsimage/tyepimages/l1.jpg?height=600&width=800&text=Letterhead+1",
      "/graphicsimage/tyepimages/l2.jpg?height=600&width=800&text=Letterhead+2",
      "/graphicsimage/tyepimages/l3.jpg?height=600&width=800&text=Letterhead+3",
    ],
    description:
      "Professional letterheads for business correspondence. Make a strong impression with our sleek and modern designs.",
  },
  "traveling-books": {
    name: "Traveling Books",
    images: [
      "/graphicsimage/tyepimages/t1.jpg?height=600&width=800&text=Traveling+Books+1",
      "/graphicsimage/tyepimages/t2.jpg?height=600&width=800&text=Traveling+Books+2",
      "/graphicsimage/tyepimages/t3.jpg?height=600&width=800&text=Traveling+Books+3",
    ],
    description:
      "Compact, informative travel guides. Enhance your customers' journeys with our well-designed and practical travel books.",
  },
  "sticker-vinyl": {
    name: " Vinyl Sticker ",
    images: [
      "/graphicsimage/tyepimages/s1.jpg?height=600&width=800&text=Sticker+Vinyl+1",
      "/graphicsimage/tyepimages/s2.jpg?height=600&width=800&text=Sticker+Vinyl+2",
      "/graphicsimage/tyepimages/s3.jpg?height=600&width=800&text=Sticker+Vinyl+3",
    ],
    description:
      "Durable vinyl stickers for various applications. Make your brand stick with our high-quality, custom-designed vinyl stickers.",
  },
  "blurred-film": {
    name: "Blurred Film",
    images: [
      "/graphicsimage/tyepimages/bl1.jpg?height=600&width=800&text=Blurred+Film+1",
      "/graphicsimage/tyepimages/bl2.jpg?height=600&width=800&text=Blurred+Film+2",
      "/graphicsimage/tyepimages/bl3.jpg?height=600&width=800&text=Blurred+Film+3",
    ],
    description:
      "Decorative blurred film for windows and glass surfaces. Enhance privacy and aesthetics with our custom designed films.",
  },
  "one-way-vision": {
    name: "One-Way Vision",
    images: [
      "/graphicsimage/tyepimages/o1.jpg?height=600&width=800&text=One-Way+Vision+1",
      "/graphicsimage/tyepimages/o2.jpg?height=600&width=800&text=One-Way+Vision+2",
      "/graphicsimage/tyepimages/o3.jpg?height=600&width=800&text=One-Way+Vision+3",
    ],
    description:
      "One-way vision graphics for windows and vehicles. Maximize advertising space while maintaining visibility from the inside.",
  },
};

export default function GraphicsTypePage() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const graphicsType = graphicsTypes[params.id as keyof typeof graphicsTypes];

  if (!graphicsType) {
    return (
      <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
        <Link href="/services/graphics">
          <Button variant="outline" className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Types
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Graphics type not found</h1>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % graphicsType.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + graphicsType.images.length) %
        graphicsType.images.length
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
      <Link href="/services/graphics">
        <Button variant="outline" className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Types
        </Button>
      </Link>
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {graphicsType.name}
      </motion.h1>
      <motion.p
        className="text-xl text-[#d1e8ff] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {graphicsType.description}
      </motion.p>
      <div className="relative flex  items-center justify-center">
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
              src={graphicsType.images[currentImageIndex]}
              alt={`${graphicsType.name} ${currentImageIndex + 1}`}
              width={900}
              height={600}
              // layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </AnimatePresence>
        <Button
          variant="outline"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-[#3982c3]"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-[#3982c3]"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        {graphicsType.images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${index === currentImageIndex ? "bg-white" : "bg-[#2c6190]"
              }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

