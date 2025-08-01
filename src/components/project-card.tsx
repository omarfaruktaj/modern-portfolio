"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  images: string[];
  features: string[];
  techStack: string[];
  links: {
    liveDemo?: string;
    frontendCode?: string;
    backendCode?: string;
  };
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCardWithSlider: React.FC<ProjectCardProps> = ({
  project,
  className,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const totalImages = project.images.length;

  const handleImageChange = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    const next = (activeIndex + 1) % totalImages;
    handleImageChange(next);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    const prev = (activeIndex - 1 + totalImages) % totalImages;
    handleImageChange(prev);
  };
  console.log("image", project.images);
  return (
    <div
      className={cn(
        "w-full max-w-md space-y-4 rounded-lg border  p-4 shadow-sm ",
        className
      )}
    >
      {/* Image slider */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          {project.images.map((img, index) => (
            <div
              key={img}
              className={cn(
                "absolute inset-0 h-full w-full transition-all duration-500 ease-out",
                activeIndex === index
                  ? "opacity-100 transform-none z-10"
                  : "opacity-0 scale-95 z-0"
              )}
              style={{
                transform:
                  activeIndex === index
                    ? "none"
                    : index < activeIndex
                    ? "translateX(-100%)"
                    : "translateX(100%)",
              }}
            >
              <Image
                src={img || "https://placehold.co/600x400"}
                alt={`Project image ${index + 1}`}
                className="h-full w-full object-cover rounded-xl"
                loading="lazy"
                draggable={false}
                height={500}
                width={500}
              />
            </div>
          ))}
        </div>

        {totalImages > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 z-20 size-8 -translate-y-1/2 rounded-full bg-black/40 text-white shadow-md hover:bg-black/60"
              onClick={handlePrevious}
              disabled={isTransitioning}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 z-20 size-8 -translate-y-1/2 rounded-full bg-black/40 text-white shadow-md hover:bg-black/60"
              onClick={handleNext}
              disabled={isTransitioning}
            >
              <ChevronRight size={16} />
            </Button>
            <div className="absolute top-2 right-2 z-20 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm border border-white/20">
              {activeIndex + 1} / {totalImages}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* <h2 className="text-lg font-semibold">{project.title}</h2>
        <p className="text-sm text-gray-600">{project.tagline}</p> */}
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-muted-foreground">
          {project.tagline}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {tech}
          </Badge>
        ))}
        {project.techStack.length > 4 && (
          <Badge
            variant="secondary"
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          >
            +{project.techStack.length - 4}
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      {/* <div className="flex flex-col sm:flex-row gap-2 pt-2">
        {project.links.liveDemo && (
          <Button asChild variant="default" className="w-full sm:w-auto">
            <a
              href={project.links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          </Button>
        )}
        {project.links.frontendCode && (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a
              href={project.links.frontendCode}
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Code
            </a>
          </Button>
        )}
        {project.links.backendCode && (
          <Button asChild variant="ghost" className="w-full sm:w-auto">
            <a
              href={project.links.backendCode}
              target="_blank"
              rel="noopener noreferrer"
            >
              Backend Code
            </a>
          </Button>
        )}
      </div> */}

      <div className="flex flex-col gap-3 pt-2 lg:flex-row lg:items-center">
        {project.links.liveDemo && (
          <Button asChild className="w-full lg:w-auto">
            <Link
              href={project.links.liveDemo || "#"}
              // target="_blank"
              // rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              Live Demo
            </Link>
          </Button>
        )}
        <Button asChild variant="outline" className="w-full lg:w-auto">
          <Link
            href={`/projects/${project.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            More Details
          </Link>
        </Button>
      </div>
    </div>
  );
};
