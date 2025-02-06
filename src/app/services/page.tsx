//services/page.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Paintbrush,
  PenTool,
  ChevronUp,
  Layout,
  
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "hoardings",
    title: "Hoardings",
    description: "Eye-catching outdoor advertising solutions",
    icon: Layout,
    color: "bg-[#3982c3]",
    features: ["Gantry", "Unipole", "Steeper", "Kiosks"],
    image: "/serviceimage/hordingimage.jpg?height=160&width=320&text=Hoardings",
  },
  {
    id: "branding",
    title: "Branding",
    description: "Comprehensive brand identity services",
    icon: Paintbrush,
    color: "bg-[#2c6190]",
    features: [
      "Tricycle Ad",
      "Rickshaw Ad",
      "Wall Painting",
      "Tempovan Ad",
      "Canopy",
      "Gazebo",
      "Acrylic Boards",
      "ACP Elevation",
    ],
    image: "/serviceimage/brandingmian.jpg?height=160&width=320&text=Branding",
  },
  {
    id: "graphics",
    title: "Graphics",
    description: "Creative graphic design for all your needs",
    icon: PenTool,
    color: "bg-[#1e4060]",
    features: [
      "Board Banner",
      "Business Card",
      "Bill Books",
      "Pamphlet",
      "Brochure",
      "Invitation Card",
      "Wedding Card",
      "Digital PDF",
      "Non-Woven Bag",
      "Calendar",
      "Doctor File",
      "Letterhead",
      "Traveling Books",
      "Sticker Vinyl",
      "Blurred Film",
      "One-Way Vision",
    ],
    image: "/serviceimage/graphicmain1.jpg?height=160&width=320&text=Graphics",
  },
];

export default function Services() {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary-darker  to-[#1e4060] min-h-screen"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-center text-white mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover our range of professional services designed to elevate your
          brand and captivate your audience.
        </motion.p>

        {/* Featured Service Carousel */}
        {/* <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold mb-4 text-[#3982c3]">
                    {services[activeIndex].title}
                  </h2>
                  <p className="text-[#1e4060] mb-4">
                    {services[activeIndex].description}
                  </p>
                  <Button
                    onClick={() =>
                      router.push(`/services/${services[activeIndex].id}`)
                    }
                    className="bg-[#3982c3] hover:bg-[#2c6190] text-white"
                  >
                    Learn More <ArrowRight className="ml-2" />
                  </Button>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <Image
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-4">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === activeIndex ? "bg-white" : "bg-[#2c6190]"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                onHoverStart={() => setHoveredService(service.id)}
                onHoverEnd={() => setHoveredService(null)}
                className="cursor-pointer"
                onClick={() => router.push(`/services/${service.id}`)}
              >
                <Card className="h-full flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4 mx-auto`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-[#3982c3]">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-center text-[#1e4060]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="w-full h-40 bg-[#f0f8ff] rounded-md overflow-hidden"
                      animate={{
                        scale: hoveredService === service.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={service.image}
                        alt={`${service.title} preview`}
                        width={320}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button
                      className="w-full bg-[#3982c3] hover:bg-[#2c6190] text-white"
                      onClick={() => router.push(`/services/${service.id}`)}
                    >
                      Explore {service.title}
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        {/* <TooltipTrigger asChild>
                          <Badge
                            variant="outline"
                            className="cursor-help border-[#3982c3] text-[#3982c3]"
                          >
                            New
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Check out our latest offerings!</p>
                        </TooltipContent> */}
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="fixed bottom-8 right-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
