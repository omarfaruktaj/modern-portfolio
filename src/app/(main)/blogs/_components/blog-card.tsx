"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  variant?: "default" | "featured" | "compact";
}

export function BlogCard({
  post,
  className,
  variant = "default",
}: BlogCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatViews = (views = 0) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  if (variant === "featured") {
    return (
      <motion.article
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:ring-gray-300/50 dark:bg-gray-900/50 dark:ring-gray-800/50 dark:hover:ring-gray-700/50",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" /> */}

        <div className="grid lg:grid-cols-2">
          {/* Featured Image */}
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <motion.img
              src={
                post.featuredImage ||
                "/placeholder.svg?height=300&width=400&query=blog-featured"
              }
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Category Badge */}
            <Badge className="absolute left-4 top-4 bg-white/90 text-gray-900 hover:bg-white dark:bg-gray-900/90 dark:text-white">
              {post.category}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-8 lg:p-10">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Link href={`/blogs/${post.slug}`} className="group/title">
                <h2 className="text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover/title:text-blue-600 dark:text-white dark:group-hover/title:text-blue-400 lg:text-3xl">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {/* Author & Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                    />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readingTime} min
                  </div>
                </div>
              </div>

              {/* Read More Link */}
              <Link
                href={`/blogs/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 font-medium transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read Full Article
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <motion.article
        className={cn(
          "group flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50",
          className
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={
              post.featuredImage ||
              "/placeholder.svg?height=80&width=80&query=blog-compact"
            }
            height={500}
            width={500}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-2">
          <Link href={`/blogs/${post.slug}`} className="group/title">
            <h3 className="font-semibold text-gray-900 transition-colors group-hover/title:text-blue-600 dark:text-white dark:group-hover/title:text-blue-400 line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
            {post.views && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  {formatViews(post.views)}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:ring-gray-300/50 dark:bg-gray-900/50 dark:ring-gray-800/50 dark:hover:ring-gray-700/50",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" /> */}

      {/* Featured Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={
            post.featuredImage ||
            "/placeholder.svg?height=250&width=400&query=blog-post"
          }
          alt={post.title}
          className="h-full w-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Category Badge */}
        <Badge className="absolute left-4 top-4 bg-white/90 text-gray-900 hover:bg-white dark:bg-gray-900/90 dark:text-white">
          {post.category}
        </Badge>

        {/* Stats Overlay */}
        {/* <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {post.views && (
            <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Eye size={12} />
              {formatViews(post.views)}
            </div>
          )}
          {post.likes && (
            <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Heart size={12} />
              {post.likes}
            </div>
          )}
        </div> */}
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs text-gray-500">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Title & Excerpt */}
        <div className="space-y-2">
          <Link href={`/blogs/${post.slug}`} className="group/title">
            <h3 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover/title:text-blue-600 dark:text-white dark:group-hover/title:text-blue-400">
              {post.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        {/* Author & Meta */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
              />
              <AvatarFallback className="text-xs">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime} min
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      {/* <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100 -z-10" /> */}
    </motion.article>
  );
}
