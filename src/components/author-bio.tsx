"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Author } from "@/types";

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    website: Globe,
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="flex gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
          />
          <AvatarFallback className="text-lg">
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {author.name}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {author.role}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {author.bio}
          </p>

          {/* Social Links */}
          <div className="flex gap-2">
            {Object.entries(author.social).map(([platform, url]) => {
              if (!url) return null;
              const Icon = socialIcons[platform as keyof typeof socialIcons];

              return (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-transparent"
                  >
                    <Icon size={14} />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
