export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Personal Portfolio",
    category: "Web Development",
    description: "A responsive portfolio site built with Next.js and Tailwind CSS.",
    image: "/placeholder.svg",
  },
  {
    id: "project-2",
    title: "Weather App",
    category: "App Development",
    description: "A simple weather app using public APIs to show forecasts.",
    image: "/placeholder.svg",
  },
  {
    id: "project-3",
    title: "AI Chatbot",
    category: "Artificial Intelligence",
    description: "Prototype chatbot demonstrating natural language understanding.",
    image: "/placeholder.svg",
  },
]
