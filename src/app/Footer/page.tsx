"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowUp,
  FiMail,
  FiMapPin,
  FiPhone,
  FiClock,
  FiYoutube,
  FiChevronDown,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [expandedOffice, setExpandedOffice] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: FiFacebook, href: "https://facebook.com/krishnapublicity" },
    { icon: FiTwitter, href: "https://twitter.com/krishnapublicity" },
    { icon: FiInstagram, href: "https://instagram.com/krishnapublicity" },
    { icon: FiLinkedin, href: "https://linkedin.com/company/krishnapublicity" },
    { icon: FiYoutube, href: "https://youtube.com/krishnapublicity" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const offices = [
    { city: "Surat", address: "C-107, First Floor, Ambikapark Apt, Opp. HDFC Bank, Nr. Laxmi Tiles, Punagam, Surat, Gujarat, India", phone: "7878161516 , 7874251516" },
    { city: "Ahmedabad", address: " Ahmedabad, Gujarat", phone: "7874351516,7878161516" },
    { city: "Bhavnagar", address: " Bhavnagar, Gujarat", phone: "7874051516,7878161516" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#3982c3] via-[#2c6190] to-[#1e4060] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Image src="/logo.jpg" alt="Krishna Publicity" width={150} height={50} />
            <p className="text-sm leading-relaxed">
              Your Trusted Partner for Creative Advertising Solutions. We bring your vision to life with innovative marketing strategies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3982c3] transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#3982c3] transition-colors flex items-center"
                  >
                    <FiArrowUp className="mr-2 rotate-45" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-6">Our Offices</h4>
            <div className="space-y-4">
              {offices.map((office) => (
                <motion.div
                  key={office.city}
                  className="text-sm bg-white/10 p-3 rounded-lg cursor-pointer"
                  onClick={() => setExpandedOffice(expandedOffice === office.city ? null : office.city)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-white">{office.city}</p>
                    <FiChevronDown
                      className={`transition-transform ${expandedOffice === office.city ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                  {expandedOffice === office.city && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <p className="flex items-center mt-1">
                        <FiMapPin className="mr-2 text-[#3982c3]" /> {office.address}
                      </p>
                      <p className="flex items-center mt-1">
                        <FiPhone className="mr-2 text-[#3982c3]" /> {office.phone}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Stay updated with our latest news and offers.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                required
                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-[#3982c3] focus:border-[#3982c3]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full bg-[#3982c3] hover:bg-[#2c6190] text-white transition-colors"
              >
                <FiMail className="mr-2" />
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm">&copy; 2024 Krishna Publicity. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <FiClock className="text-[#3982c3]" />
            <span className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="fixed bottom-4 right-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#3982c3] hover:bg-[#2c6190] text-white border-white/20 shadow-lg"
          onClick={scrollToTop}
        >
          <FiArrowUp className="w-4 h-4" />
        </Button>
      </motion.div>
    </footer>
  );
};

export default Footer;

