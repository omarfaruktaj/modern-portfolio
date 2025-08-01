"use client";

import { BlogCard } from "@/app/(main)/blogs/_components/blog-card";
import { BlogPost } from "@/types";

interface RelatedArticlesProps {
  articles: BlogPost[];
  currentPostId: string;
}

export function RelatedArticles({
  articles,
  currentPostId,
}: RelatedArticlesProps) {
  const relatedArticles = articles
    .filter((article) => article.id !== currentPostId)
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Related Articles
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <BlogCard key={article.id} post={article} variant="compact" />
        ))}
      </div>
    </section>
  );
}
