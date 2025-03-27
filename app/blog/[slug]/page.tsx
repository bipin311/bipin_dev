import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center text-gray-500 gap-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl mb-10">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed mb-6">{post.excerpt}</p>

          <h2>Introduction</h2>
          <p>{post.content.introduction}</p>

          <h2>Main Points</h2>
          <p>{post.content.mainPoints}</p>

          <h2>Conclusion</h2>
          <p>{post.content.conclusion}</p>
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <div className="relative w-12 h-12 overflow-hidden art-stroke-shape scale-75">
              <Image src="/placeholder.svg?height=100&width=100" alt="Author" fill className="object-cover" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold">Alex Johnson</h3>
              <p className="text-gray-600 text-sm">Designer & Developer</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((relatedPost) => relatedPost.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 group-hover:text-gray-700 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{relatedPost.date}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}

