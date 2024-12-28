"use client"

// import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/use-toast";
import { ThemeProvider } from "@/contexts/ThemeContext"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";


// export const metadata: Metadata = {
//   title: "Krishna Publicity",
//   description: "Advertising and publicity services",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
