"use client"

import React, { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {  Search, Menu, X, Sun, Moon, } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useTheme } from "next-themes"
import { ColorSchemeSelector } from "@/components/ColorSchemeSelector"

const navItems = [
  { section: "home", label: "Home"},
  { section: "about", label: "About" },
  { section: "services", label: "Services" },
  { section: "gallery", label: "Gallery"},
  { section: "contact", label: "Contact"},
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
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? `bg-primary shadow-lg backdrop-blur-md`
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <ScrollLink to="home" smooth={true} duration={500}>
              <Image
                src="/logo.jpg"
                alt="Krishna Publicity"
                width={125}
                height={50}
                className="rounded-md"
              />
            </ScrollLink>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ section, label }, index) => (
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
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-300 ${activeSection === section
                      ? `bg-secondary text-white scale-105`
                      : `text-white hover:bg-primary-foreground/10 hover:scale-105`
                    }`}
                >
                  <span>{label}</span>
                </ScrollLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              {/* <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}> */}
                {/* <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 hover:scale-110 transition-transform duration-200 text-white hover:bg-primary-foreground/10"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </DialogTrigger> */}
                {/* <DialogContent className="bg-background text-foreground">
                  <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="flex-grow bg-secondary text-white placeholder-white/50 border-accent"
                    />
                    <Button
                      type="submit"
                      className="bg-accent text-primary hover:bg-accent/90"
                    >
                      Search
                    </Button>
                  </div>
                </DialogContent> */}
              {/* </Dialog> */}
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            > */}
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-2 hover:scale-110 transition-transform duration-200 text-blue-500 hover:bg-primary-foreground/10"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button> */}
            {/* </motion.div>ion */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <ColorSchemeSelector />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-2 hover:scale-110 transition-transform duration-200 text-white hover:bg-primary-foreground/10"
                  >
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-background text-foreground"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-accent" />
                  <DropdownMenuItem className="hover:bg-secondary hover:text-white">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-secondary hover:text-white">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-secondary hover:text-white">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </motion.div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-[#3982c3] hover:bg-primary-foreground/10"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
            className="md:hidden bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map(({ section, label }, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <ScrollLink
                    to={section}
                    smooth={true}
                    duration={500}
                    className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${activeSection === section
                      ? `bg-secondary text-[#3982c3] scale-105`
                        : `text-foreground hover:bg-secondary hover:text-white hover:scale-105`
                      }`}
                    onClick={() => {
                      toggleMenu();
                      setActiveSection(section);
                    }}
                  >
                    <span>{label}</span>
                  </ScrollLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleMenu();
                  }}
                  className="w-full justify-start text-foreground border-accent hover:bg-secondary hover:text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="w-full justify-start text-foreground border-accent hover:bg-secondary hover:text-white"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 mr-2" />
                  ) : (
                    <Moon className="w-4 h-4 mr-2" />
                  )}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <ColorSchemeSelector />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex justify-center"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="h-1 bg-accent absolute bottom-0 left-0"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.nav>
  )
}

