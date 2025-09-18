import { blogs } from "@/data/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostSection from "../_components/blog-post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = blogs.find((blog) => blog.slug === slug);

  if (!post) return notFound();

  return {
    title: `${post.title} | Omar Faruk Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toString(),
      url: `https://omarfarukpro.vercel.app/blogs/${post.slug}`,
      images: [
        {
          url: `https://omarfarukpro.vercel.app/blogs/${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`https://omarfarukpro.vercel.app/blogs/${post.featuredImage}`],
    },
    alternates: {
      canonical: `https://omarfarukpro.vercel.app/blogs/${post.slug}`,
    },
  };
}

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
