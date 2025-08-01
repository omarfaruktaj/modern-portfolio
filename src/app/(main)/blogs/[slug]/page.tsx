import { blogs } from "@/data/blogs";
import BlogPostSection from "../_components/blog-post";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogs.find((blog) => blog.slug === slug);

  if (!post) return <p>No blogPost found</p>;
  return <BlogPostSection post={post} />;
}
