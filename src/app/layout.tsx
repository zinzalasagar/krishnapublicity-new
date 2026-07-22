"use client"

import Preloader from "@/components/Preloader"
import CustomCursor from "@/components/CustomCursor"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ToastProvider } from "@/components/ui/use-toast"
import { Toaster } from "react-hot-toast"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import { FaWhatsapp } from "react-icons/fa"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import Lenis from "lenis";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable Lenis smooth scrolling completely on the admin panel 
    // because admin panels use fixed layouts with internal scrolling.
    if (pathname && pathname.startsWith('/admin')) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [pathname])

  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans">
        <Toaster position="top-right" reverseOrder={false} />
        <Preloader />
        <CustomCursor />
        <ThemeProvider>
          <ToastProvider>
            {children}
            <a 
              href="https://wa.me/917878161516" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="fixed bottom-8 left-8 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300"
            >
              <FaWhatsapp className="w-8 h-8" />
            </a>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
