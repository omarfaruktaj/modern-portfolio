import { blogs } from "@/data/blogs";
import { BlogCard } from "./_components/blog-card";

export default function BlogPage() {
  const featuredPost = blogs[0];
  const regularPosts = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Insights, tutorials, and thoughts on modern web development
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Featured Article
          </h2>
          <BlogCard post={featuredPost} variant="featured" />
        </div>

        {/* Regular Posts */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
