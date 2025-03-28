"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSectionClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname !== "/") {
      window.location.href = `/#${section}`
    } else {
      const sectionElement = document.getElementById(section)
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md text-black shadow-sm" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link href="/" className="text-2xl text-blue-500 font-bold tracking-tight">
            Bipin.dev
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
              Home
            </Link>
            <a
              href="#projects"
              onClick={(e) => handleSectionClick("projects", e)}
              className="text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={(e) => handleSectionClick("about", e)}
              className="text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
            >
              About
            </a>
            <Link href="/blog" className="text-sm font-medium hover:opacity-70 transition-opacity">
              Blog
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick("contact", e)}
              className="text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
            >
              Contact
            </a>
            <div className="flex items-center space-x-4 ml-4">
              <Link
                href="https://github.com/bipin311"
                target="_blank"
                aria-label="GitHub"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/bipinphaiju/"
                target="_blank"
                aria-label="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#projects"
              onClick={(e) => {
                handleSectionClick("projects", e)
                setIsMenuOpen(false)
              }}
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md cursor-pointer"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={(e) => {
                handleSectionClick("about", e)
                setIsMenuOpen(false)
              }}
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md cursor-pointer"
            >
              About
            </a>
            <Link
              href="/blog"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <a
              href="#contact"
              onClick={(e) => {
                handleSectionClick("contact", e)
                setIsMenuOpen(false)
              }}
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md cursor-pointer"
            >
              Contact
            </a>
            <div className="flex space-x-4 px-3 py-2">
              <Link href="https://github.com" target="_blank" aria-label="GitHub">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

