/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

import { ReadingProgress } from "@/components/reading-progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { BlogPost } from "@/types";
import "highlight.js/styles/github.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function BlogPostSection({ post }: { post: BlogPost }) {
  const [activeHeading, setActiveHeading] = React.useState<string>("");

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/blogs">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft size={16} />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          <div>
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="space-y-8">
                {/* Header */}
                <motion.header
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Category & Meta */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readingTime} min read
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        {formatViews(post.views || 0)} views
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <Heart size={16} />
                      {post.likes}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <Share2 size={16} />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <Bookmark size={16} />
                      Save
                    </Button>
                  </div> */}
                </motion.header>

                {/* Featured Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative aspect-[16/9] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    height={500}
                    width={500}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Content */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900/50 lg:p-12"
                >
                  <div className="prose prose-lg prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h1:font-bold prose-h2:font-semibold prose-h3:font-semibold prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm dark:prose-code:bg-gray-800">
                    <div className="prose prose-lg prose-gray max-w-none dark:prose-invert">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {post.content}
                      </ReactMarkdown>
                    </div>{" "}
                  </div>
                </motion.div> */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900/50 lg:p-12"
                >
                  {/* This is the only div that should have the prose classes */}
                  <div className="prose prose-lg prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h1:font-bold prose-h2:font-semibold prose-h3:font-semibold prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm dark:prose-code:bg-gray-800">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>

                <Separator className="my-12" />
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
