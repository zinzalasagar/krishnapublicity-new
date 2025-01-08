import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const images = [
    { src: "/gallery/First1.webp", alt: "Billboard Advertisement" },
    { src: "/gallery/g1.jpeg", alt: "Print Media Campaign" },
    { src: "/gallery/g2.png", alt: "Digital Marketing" },
    { src: "/gallery/second2.png", alt: "Event Management" },
    { src: "/gallery/g5.png", alt: "Event Management" },
    { src: "/gallery/g6.png", alt: "Another Service" },
    { src: "/gallery/g7.png", alt: "Service Image" },
];

export default function ImageSlider() {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const openLightbox = (image: { src: string; alt: string }, index: number) => {
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
        <div className="relative">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="relative aspect-video">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                            className="cursor-pointer"
                            onClick={() => openLightbox(image, index)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold text-center px-4">
                                {image.alt}
                            </span>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Lightbox Modal */}
            <Dialog open={!!selectedImage} onClose={closeLightbox} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    {/* Custom Overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-75" onClick={closeLightbox}></div>
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
                                    <button
                                        onClick={prevImage}
                                        className="bg-[#3982c3] text-white px-4 py-2 rounded-lg hover:bg-[#2c6190] transition-colors"
                                    >
                                        <FiChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="bg-[#3982c3] text-white px-4 py-2 rounded-lg hover:bg-[#2c6190] transition-colors"
                                    >
                                        <FiChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
