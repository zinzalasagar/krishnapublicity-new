"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoSlider from "@/components/LogoSlider";

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary-darker">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-4xl font-bold mb-8 text-center text-white">Gallery</h2> */}
        {/* <Link href="/">
          <Button variant="outline" className="mb-8">Back to Home</Button>
        </Link> */}

        {/* Logo Slider */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4 text-center text-white">Our Clients</h3>
          <LogoSlider />
        </div>
      </div>
    </section>
  );
}

