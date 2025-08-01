export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  images: string[];
  features: string[];
  techStack: string[];
  links: {
    liveDemo: string;
    frontendCode: string;
    backendCode: string;
  };
}
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: Author;
  publishedAt: Date;
  updatedAt?: Date;
  readingTime: number;
  tags: string[];
  category: string;
  slug: string;
  isPublished: boolean;
  views?: number;
  likes?: number;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
