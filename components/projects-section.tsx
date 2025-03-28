"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import ParallaxSection from "./parallax-section"
import { getProjects } from "@/lib/firebase"

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const projectsData = await getProjects()
        setProjects(projectsData as Project[])
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const categories = ["All", "Web Development", "App Development", "Artificial Intelligence"]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  if (loading) {
    return (
      <section id="projects" className="w-full py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="w-full py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection offset={0.2}>
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-blue-500 mb-4"
            >
              My Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Explore my recent projects and creative endeavors.
            </motion.p>
          </div>
        </ParallaxSection>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === category ? "bg-white text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative w-full">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 hidden md:block">
            <button
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => {
                const container = document.querySelector(".overflow-x-auto")
                if (container) container.scrollBy({ left: -350, behavior: "smooth" })
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 hidden md:block">
            <button
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => {
                const container = document.querySelector(".overflow-x-auto")
                if (container) container.scrollBy({ left: 350, behavior: "smooth" })
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto pb-8 hide-scrollbar">
            <div className="flex space-x-6 px-4 md:px-0 min-w-max">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative w-[280px] md:w-[350px] flex-shrink-0"
                >
                  <ParallaxSection offset={0.1} className="aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="object-contain bg-gray-900 transition-transform duration-500 group-hover:scale-105"
                    />
                  </ParallaxSection>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white rounded-2xl">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{project.category}</p>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

