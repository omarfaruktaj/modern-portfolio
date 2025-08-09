"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Github,
  Palette,
  Play,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "./project-card";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-white dark:bg-gray-900">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </DialogTitle>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {project.tagline}
                </p>
              </div>
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-white/50"
              >
                <X className="h-4 w-4" />
              </Button> */}
            </div>
          </DialogHeader>

          <ScrollArea className=" h-96">
            <div className="p-6 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={
                      project.images[activeImageIndex] ||
                      "/placeholder.svg?height=400&width=700"
                    }
                    alt={`${project.title} - Image ${activeImageIndex + 1}`}
                    className="object-cover w-full h-full"
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                  />

                  {project.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
                        {activeImageIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {project.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === activeImageIndex
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg?height=48&width=80"}
                          alt={`Thumbnail ${index + 1}`}
                          className="object-cover w-full h-full"
                          fill
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.links.liveDemo && (
                  <Button asChild className="rounded-full">
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

                {project.links.frontendCode && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full bg-transparent"
                  >
                    <Link
                      href={project.links.frontendCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Frontend Code
                    </Link>
                  </Button>
                )}

                {project.links.backendCode && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full bg-transparent"
                  >
                    <Link
                      href={project.links.backendCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Code className="h-4 w-4" />
                      Backend Code
                    </Link>
                  </Button>
                )}
              </div>

              <Separator />

              {/* Project Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Palette className="h-5 w-5 text-blue-600" />
                  About This Project
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    Key Features
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 px-3 py-1 transition-all duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
