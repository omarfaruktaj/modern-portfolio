"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Github,
  Play,
} from "lucide-react";
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
  viewMode?: "grid" | "list";
  onViewDetails?: () => void;
  index?: number;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewMode = "grid",
  onViewDetails,
  index = 0,
  className,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const totalImages = project.images.length;

  const handleImageChange = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    const next = (activeIndex + 1) % totalImages;
    handleImageChange(next);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    const prev = (activeIndex - 1 + totalImages) % totalImages;
    handleImageChange(prev);
  };

  if (viewMode === "list") {
    return (
      <Card
        className={cn(
          "group overflow-hidden border-0 bg-background/80 backdrop-blur-sm shadow-lg ",
          className
        )}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative md:w-1/2 aspect-video md:aspect-square overflow-hidden">
              <div className="relative h-full w-full">
                {project.images.map((img, imgIndex) => (
                  <div
                    key={img}
                    className={cn(
                      "absolute inset-0 transition-all duration-300 ease-out",
                      activeIndex === imgIndex
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-105 z-0"
                    )}
                  >
                    <Image
                      src={img || "/placeholder.svg?height=400&width=600"}
                      alt={`${project.title} - Image ${imgIndex + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 "
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>

              {/* Image Controls */}
              {totalImages > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Image Counter */}
              {totalImages > 1 && (
                <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {activeIndex + 1} / {totalImages}
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 6 && (
                    <Badge variant="outline" className="rounded-full">
                      +{project.techStack.length - 6}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.links.liveDemo && (
                    <Button asChild size="sm" className="rounded-full">
                      <Link
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}

                  {(project.links.frontendCode ||
                    project.links.backendCode) && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent"
                    >
                      <Link
                        href={
                          project.links.frontendCode ||
                          project.links.backendCode ||
                          "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onViewDetails}
                    className="rounded-full flex items-center gap-2 bg-transparent"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg  cursor-pointer animate-fade-in-up",
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onClick={onViewDetails}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <div className="relative h-full w-full">
            {project.images.map((img, imgIndex) => (
              <div
                key={img}
                className={cn(
                  "absolute inset-0 transition-all duration-300 ease-out",
                  activeIndex === imgIndex
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                )}
              >
                <Image
                  src={img || "/placeholder.svg?height=300&width=500"}
                  alt={`${project.title} - Image ${imgIndex + 1}`}
                  className="h-full w-full object-cover "
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Image Controls */}
          {totalImages > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Image Counter */}
          {totalImages > 1 && (
            <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {activeIndex + 1} / {totalImages}
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2">
              {project.links.liveDemo && (
                <Button
                  size="sm"
                  className="rounded-full bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.links.liveDemo, "_blank");
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="rounded-full bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm border-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails?.();
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
              {project.tagline}
            </p>
          </div>

          {/* <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {project.description}
          </p> */}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 text-xs transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="outline" className="rounded-full text-xs">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
