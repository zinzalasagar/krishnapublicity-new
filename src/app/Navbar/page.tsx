"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import apiService from "@/services/apiService"
import endPointApi from "@/services/endPointApi"
import MagneticButton from "@/components/MagneticButton"

const navItems = [
  { section: "home", label: "Home" },
  { section: "about", label: "About" },
  { section: "services", label: "Services" },
  { section: "gallery", label: "Gallery" },
  { section: "contact", label: "Contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [siteSettings, setSiteSettings] = useState<{
    logo?: string;
    brandName?: string;
    phone?: string;
  }>({
    logo: '',
    brandName: 'KRISHNA.',
    phone: '+91 7878161516'
  })

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const windowHeight = window.innerHeight
      navItems.forEach(({ section }) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Fetch site settings
    apiService.get(endPointApi.settings)
      .then(data => {
        if (data) {
          setSiteSettings({
            logo: data.logo || '',
            brandName: data.brandName || 'KRISHNA.',
            phone: data.phone || '+91 7878161516'
          })
        }
      })
      .catch(err => console.error('Error fetching settings for Navbar:', err))

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const logoUrl = siteSettings.logo ? apiService.getImageUrl(siteSettings.logo) : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top promotional bar */}
      <div className={`transition-colors duration-500 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase py-2 flex justify-center items-center text-center px-4 ${scrolled ? 'bg-theme-navy text-[#F8F5F0]' : 'bg-[#F8F5F0] text-theme-navy'}`}>
        Premium Outdoor Advertising — Contact us today for exclusive rates
      </div>

      <nav
        className={`w-full transition-all duration-500 ${scrolled ? "bg-[#F8F5F0] shadow-md py-3" : "bg-theme-navy shadow-lg py-4 md:py-6"
          }`}
      >
        <div className="w-full px-6 lg:px-16">
          <div className="flex justify-between items-center relative">

            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center cursor-pointer z-10">
              <ScrollLink to="home" smooth={true} duration={800}>
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-9 md:h-11 w-auto object-contain" />
                ) : (
                  <span className={`font-extrabold text-2xl md:text-3xl tracking-tighter flex items-center gap-1 transition-colors duration-500 ${scrolled ? 'text-theme-navy' : 'text-white'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`mr-1 transition-colors duration-500 ${scrolled ? 'text-theme-navy' : 'text-white'}`}>
                      <path d="M6 3V21M6 12C6 12 10 10 14 10C18 10 20 12 20 16C20 20 18 22 14 22C10 22 6 20 6 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {siteSettings.brandName || 'KRISHNA.'}
                  </span>
                )}
              </ScrollLink>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center justify-center absolute left-0 right-0 pointer-events-none">
              <div className="flex space-x-6 lg:space-x-10 pointer-events-auto">
                {navItems.map(({ section, label }) => (
                  <MagneticButton key={section}>
                    <ScrollLink
                      to={section}
                      smooth={true}
                      duration={800}
                      className="relative cursor-pointer group py-1 block px-2"
                    >
                      <span className={`relative z-10 text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${activeSection === section
                          ? (scrolled ? "text-theme-navy" : "text-white")
                          : (scrolled ? "text-theme-navy/60 group-hover:text-theme-navy" : "text-white/70 group-hover:text-white")
                        }`}>
                        {label}
                      </span>
                      {activeSection === section && (
                        <motion.div
                          layoutId="navUnderline"
                          className={`absolute bottom-0 left-0 right-0 h-[2px] ${scrolled ? 'bg-theme-navy' : 'bg-white'}`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </ScrollLink>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Desktop Right Action Area */}
            <div className="hidden md:flex items-center space-x-6 z-10">
              {/* Removed Let's Talk button */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center z-10">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-colors duration-500 ${scrolled ? "text-theme-navy hover:bg-theme-navy/5" : "text-white hover:bg-white/10"
                  }`}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-theme-cream border-t border-theme-navy/10 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col py-4 px-6 space-y-4">
              {navItems.map(({ section, label }) => (
                <ScrollLink
                  key={section}
                  to={section}
                  smooth={true}
                  duration={800}
                  className={`block py-2 text-sm font-bold tracking-widest uppercase transition-all ${activeSection === section ? "text-theme-navy translate-x-2" : "text-theme-navy/60 hover:text-theme-navy hover:translate-x-2"
                    }`}
                  onClick={() => {
                    setIsOpen(false)
                    setActiveSection(section)
                  }}
                >
                  {label}
                </ScrollLink>
              ))}
              <div className="pt-4 mt-2 border-t border-theme-navy/10">
                {/* Removed Let's Talk button */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

