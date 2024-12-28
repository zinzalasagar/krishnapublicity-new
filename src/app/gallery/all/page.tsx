"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import LogoSlider from "@/components/LogoSlider";

const images = [
  { src: "/gallery/First1.webp", alt: "Billboard Advertisement" },
  { src: "/gallery/g1.jpeg", alt: "Print Media Campaign" },
  { src: "/gallery/g2.png", alt: "Digital Marketing" },
  { src: "/gallery/second2.png", alt: "Event Management" },
  { src: "/gallery/g5.png", alt: "Event Management" },
  { src: "/gallery/g6.png", alt: "Another Service" },
  { src: "/gallery/g7.png", alt: "Service Image" },
];

export default function Gallery() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[(currentImageIndex + 1) % images.length]);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setSelectedImage(images[(currentImageIndex - 1 + images.length) % images.length]);
  };

  return (
    <section id="gallery" className="py-16 bg-gradient-to-r from-[#3982c3] via-[#2c6190] to-[#1e4060]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Our Gallery</h2>

        <motion.button
          onClick={() => router.push("/")}
          className="mb-8 px-6 py-3 bg-white text-[#3982c3] rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.button>

        {/* Grid displaying all images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold text-center px-4">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Slider */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4 text-center text-white">Our Clients</h3>
          <LogoSlider />
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onClose={closeLightbox} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
          <div className="relative bg-white rounded-lg max-w-3xl mx-auto">
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-6 h-6" />
            </button>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={800}
                  height={600}
                  objectFit="contain"
                  className="rounded-lg"
                />
                <p className="text-center mt-4 text-lg font-semibold">{selectedImage.alt}</p>
                <div className="flex justify-between mt-4">
                  <Button
                    onClick={prevImage}
                    className="bg-[#3982c3] text-white px-4 py-2 rounded-lg hover:bg-[#2c6190] transition-colors"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={nextImage}
                    className="bg-[#3982c3] text-white px-4 py-2 rounded-lg hover:bg-[#2c6190] transition-colors"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Dialog>
    </section>
  );
}

