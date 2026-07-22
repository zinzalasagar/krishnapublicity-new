"use client";

import { useState, useEffect } from "react";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const defaultLogos = [
    { src: "/logos/logo1.png", alt: "Company 1" },
    { src: "/logos/logo2.png", alt: "Company 2" },
    { src: "/logos/logo3.png", alt: "Company 3" },
    { src: "/logos/logo4.png", alt: "Company 4" },
    { src: "/logos/logo5.png", alt: "Company 5" },
    { src: "/logos/logo6.png", alt: "Company 6" },
    { src: "/logos/logo7.jpg", alt: "Company 7" },
    { src: "/logos/logo8.jpg", alt: "Company 8" },
    { src: "/logos/logo9.jpg", alt: "Company 9" },
    { src: "/logos/logo10.jpg", alt: "Company 10" },
    { src: "/logos/logo11.jpg", alt: "Company 11" },
    { src: "/logos/logo12.jpg", alt: "Company 12" },
    { src: "/logos/logo13.png", alt: "Company 13" },
];

const resolveLogoUrl = (src?: string, index: number = 0) => {
    return apiService.getImageUrl(src, defaultLogos[index % defaultLogos.length].src);
};

export default function LogoSlider() {
    const [logos, setLogos] = useState(defaultLogos);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await apiService.get(endPointApi.partners);
                if (Array.isArray(data) && data.length > 0) {
                    let mappedLogos = data.map((p: any, idx: number) => ({
                        src: resolveLogoUrl(p.image, idx),
                        alt: p.name || `Partner ${idx + 1}`
                    }));
                    
                    // Duplicate logos to ensure Swiper's loop has enough slides to scroll continuously
                    if (mappedLogos.length > 0 && mappedLogos.length < 10) {
                        const original = [...mappedLogos];
                        while (mappedLogos.length < 10) {
                            mappedLogos = [...mappedLogos, ...original];
                        }
                    }
                    setLogos(mappedLogos);
                }
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        };
        fetchPartners();
    }, []);

    const LogoCard = ({ logo }: { logo: any }) => (
        <div className="px-3 outline-none h-full">
            <div className="h-48 flex items-center justify-center p-4 rounded-xl bg-transparent border border-[#1b2642]/10 hover:border-[#1B2642]/50 hover:bg-[#EFE7DE]/50 shadow-sm transition-all duration-500 group cursor-pointer overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110 p-2 opacity-80 group-hover:opacity-100 mix-blend-multiply"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logos/logo1.png';
                        }}
                    />
                </div>
            </div>
        </div>
    );

    const renderLogos = () => {
        return (
            <div className="relative logo-swiper px-2">
                <style dangerouslySetInnerHTML={{__html: `
                  .logo-swiper .swiper-wrapper {
                    transition-timing-function: linear !important;
                  }
                  .logo-swiper .swiper-button-next,
                  .logo-swiper .swiper-button-prev {
                    color: #1b2642;
                    background: #ffffff;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  }
                  .logo-swiper .swiper-button-next:after,
                  .logo-swiper .swiper-button-prev:after {
                    font-size: 16px;
                    font-weight: bold;
                  }
                  .logo-swiper .swiper-button-next:hover,
                  .logo-swiper .swiper-button-prev:hover {
                    color: #ffffff;
                    background: #1B2642;
                  }
                `}} />
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={logos.length > 2}
                    navigation={false}
                    speed={3000}
                    autoplay={logos.length > 2 ? { delay: 0, disableOnInteraction: false } : false}
                    allowTouchMove={true}
                    breakpoints={{
                        480: { slidesPerView: Math.min(2, logos.length) },
                        768: { slidesPerView: Math.min(3, logos.length) },
                        1024: { slidesPerView: Math.min(4, logos.length) },
                        1280: { slidesPerView: Math.min(5, logos.length) },
                    }}
                    className="py-4"
                >
                    {logos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <LogoCard logo={logo} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    };

    return (
        <div className="py-10 relative overflow-hidden bg-transparent">
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
                {renderLogos()}
            </div>
        </div>
    );
}
