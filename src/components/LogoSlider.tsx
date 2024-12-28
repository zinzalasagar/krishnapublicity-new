import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
    { src: "/logos/logo1.png", alt: "Company 1" },
    { src: "/logos/logo2.png", alt: "Company 2" },
    { src: "/logos/logo3.png", alt: "Company 3" },
    { src: "/logos/logo4.png", alt: "Company 4" },
    { src: "/logos/logo5.png", alt: "Company 5" },
];

export default function LogoSlider() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <div className="bg-white py-8 rounded-lg">
            <div className="container mx-auto px-4">
                <Slider {...settings}>
                    {logos.map((logo, index) => (
                        <div key={index} className="px-4">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={150}
                                height={75}
                                // objectFit="contain"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

