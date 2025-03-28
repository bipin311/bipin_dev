"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import ParallaxSection from "./parallax-section"

export default function AboutSection() {
  const skills = [
    "UI/UX Design",
    "Web Development",
    "Mobile Development",
    "Prototyping",
    "User Research",
    "Interaction Design",
    "Machine Learning"
  ]

  return (
    <section id="about" className="w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ParallaxSection offset={0.2}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden about-art-stroke-shape">
                <Image src="/my_photo.png?height=600&width=600" alt="Profile" fill className="object-contain" />
              </div>
            </motion.div>
          </ParallaxSection>

          <ParallaxSection offset={0.3}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">About Me</h2>
              <p className="text-lg text-gray-600 mb-6">
                A highly skilled and results-oriented software engineer with over six years of experience in the software
                industry. Currently, in the placement year of my MSc in Data Science and Analytics, I possess strong
                programming expertise and a solid foundation in data science, mathematics, and statistics. With a versatile
                skill set spanning application development and data science, I thrive in dynamic environments and adapt 
                easily to diverse work conditions. 
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Previously, I've worked with startups and established companies across various industries, helping them
                achieve their business goals through thoughtful design and development.
              </p>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-gray-900 mb-4"
              >
                My Skills
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-800 shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-sm"
                >
                  <h4 className="text-4xl font-bold text-gray-900 mb-2">5+</h4>
                  <p className="text-gray-600">Years Experience</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-sm"
                >
                  <h4 className="text-4xl font-bold text-gray-900 mb-2">20+</h4>
                  <p className="text-gray-600">Projects Completed</p>
                </motion.div>
              </div>
            </motion.div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  )
}

