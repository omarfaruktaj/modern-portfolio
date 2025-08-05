"use client";

import { blogs } from "@/data/blogs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { BlogCard } from "../blogs/_components/blog-card";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blogCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const regularPosts = blogs.slice(1, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".blog-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        blogCardsRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex items-center justify-center min-h-[80vh] py-24 
             bg-gradient-to-b from-gray-50 to-gray-100 
             dark:from-slate-900 dark:to-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="blog-header mb-12 text-center opacity-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Insights, tutorials, and thoughts on modern web development
          </p>
        </div>

        {/* Regular Posts */}
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post, index) => (
              <div
                key={post.id}
                ref={(el) => {
                  blogCardsRef.current[index] = el;
                }}
                className="opacity-0"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
