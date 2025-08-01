import { blogs } from "@/data/blogs";
import { BlogCard } from "../blogs/_components/blog-card";

export default function BlogSection() {
  const regularPosts = blogs.slice(1, 4);

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Insights, tutorials, and thoughts on modern web development
          </p>
        </div>

        {/* Regular Posts */}
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
