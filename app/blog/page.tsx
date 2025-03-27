import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"

export default function BlogPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Thoughts, stories and ideas about design, development, and creativity.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Link href={`/blog/${blogPosts[0].slug}`} className="group">
            <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl mb-6">
              <Image
                src={blogPosts[0].coverImage || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span>{blogPosts[0].date}</span>
                <span className="mx-2">•</span>
                <span>{blogPosts[0].readTime} min read</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-gray-700 transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
              <div className="inline-flex items-center text-black font-medium">
                Read more <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gray-700 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="inline-flex items-center text-black font-medium">
                    Read more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

