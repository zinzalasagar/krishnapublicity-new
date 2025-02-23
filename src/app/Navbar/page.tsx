"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { FaPhoneAlt } from "react-icons/fa";

const navItems = [
  { section: "home", label: "Home" },
  { section: "about", label: "About" },
  { section: "services", label: "Services" },
  { section: "gallery", label: "Gallery" },
  { section: "contact", label: "Contact" },
  {
    section: "tel:+91 7878161516",
    label: " +91 7878161516",
    isExternal: true,
    icon: <FaPhoneAlt className="w-5 h-5 mr-2" /> // Custom phone icon
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      setIsScrolled(scrollPosition > 50)
      setScrollProgress((scrollPosition / (fullHeight - windowHeight)) * 100)

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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gradient-to-r bg-[#3982c3] shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
            <ScrollLink to="home" smooth={true} duration={500}>
              <Image
                src="/logos/krishnalogo.png"
                alt="Krishna Publicity"
                width={125}
                height={50}
                className="rounded-md"
              />
            </ScrollLink>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ section, label, icon }, index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                <ScrollLink
                  to={section}
                  smooth={true}
                  duration={500}
                  className={`relative flex items-center cursor-pointer space-x-1 px-4 py-2 rounded-full transition-all duration-300 ${activeSection === section
                    ? "bg-white text-[#3982c3] font-bold shadow-md"
                    : "text-white hover:bg-white/20 font-semibold"
                    }`}
                >
                  {icon && <span>{icon}</span>} {/* Render the custom icon */}
                  <span>{label}</span>
                </ScrollLink>
              </motion.div>
            ))}
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2 text-white hover:bg-white/20 rounded-full"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="ml-2 text-white hover:bg-white/20 rounded-full">
              <Search className="w-5 h-5" />
            </Button> */}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white hover:bg-white/20 rounded-full"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-blue-600 to-purple-600 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map(({ section, label, isExternal, icon }, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {isExternal ? (
                    <a
                      href={section}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-2 rounded-md transition-all duration-300 ${activeSection === section ? "bg-white text-blue-600 font-bold" : "text-white hover:bg-white/20"
                        }`}
                      onClick={() => {
                        toggleMenu()
                        setActiveSection(section)
                      }}
                    >
                      {icon && <span>{icon}</span>} {/* Render the custom icon */}
                      {label}
                    </a>
                  ) : (
                    <ScrollLink
                      to={section}
                      smooth={true}
                      duration={500}
                      className={`block p-2 rounded-md transition-all duration-300 ${activeSection === section ? "bg-white text-blue-600 font-bold" : "text-white hover:bg-white/20"
                        }`}
                      onClick={() => {
                        toggleMenu()
                        setActiveSection(section)
                      }}
                    >
                      {label}
                    </ScrollLink>
                  )}
                </motion.div>
              ))}
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="w-full justify-start text-white border-white hover:bg-white/20"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button variant="outline" className="w-full justify-start text-white border-white hover:bg-white/20">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="h-1 bg-white absolute bottom-0 left-0"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.nav>
  )
}

