import Link from "next/link"
import { ChevronDown } from "lucide-react"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import SpaceBackground from "@/components/space-background"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <SpaceBackground />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="mb-6 md:mb-0">
            <div className="relative w-50 h-50 md:w-72 md:h-72 overflow-hidden">
              <div className="absolute inset-0 border-4 border-white art-square"></div>
              <img
                src="/memoji.gif"
                alt="Profile Memoji"
                className="w-full h-full object-cover art-square"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Hello, I'm <span className="text-blue-500">Bipin</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
              I design and build digital experiences that are beautiful, functional, and user-centered.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 text-black px-8 py-3 text-base font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                View My Work
              </Link>
              <Link
                href="/Bipin_Phaiju.pdf"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-transparent border-2 border-white text-white px-8 py-3 text-base font-medium hover:bg-white/10 transition-colors duration-300"
              >
                Download Resume
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#projects" className="text-white">
            <ChevronDown size={32} />
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}

