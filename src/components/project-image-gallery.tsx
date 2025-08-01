/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import * as React from "react";

interface ProjectImageGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectImageGallery({
  images,
  projectTitle,
}: ProjectImageGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handleLightboxPrev();
      if (e.key === "ArrowRight") handleLightboxNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="group relative aspect-video overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <motion.img
            key={activeIndex}
            src={
              images[activeIndex] ||
              "/placeholder.svg?height=400&width=700&query=project-main-image"
            }
            alt={`${projectTitle} screenshot ${activeIndex + 1}`}
            className="h-full w-full object-cover cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(activeIndex)}
          />

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <Button
                onClick={handlePrev}
                size="icon"
                variant="secondary"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
              >
                <ChevronLeft size={20} />
              </Button>

              <Button
                onClick={handleNext}
                size="icon"
                variant="secondary"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
              >
                <ChevronRight size={20} />
              </Button>
            </>
          )}

          {/* Zoom Button */}
          <Button
            onClick={() => openLightbox(activeIndex)}
            size="icon"
            variant="secondary"
            className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
          >
            <Maximize2 size={16} />
          </Button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative aspect-video overflow-hidden rounded-lg bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800",
                  activeIndex === index
                    ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900"
                    : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 dark:hover:ring-gray-600 dark:hover:ring-offset-gray-900"
                )}
              >
                <Image
                  src={
                    image ||
                    "/placeholder.svg?height=100&width=150&query=project-thumbnail"
                  }
                  alt={`${projectTitle} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                  height={500}
                  width={500}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <ZoomIn className="absolute inset-0 m-auto h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  images[lightboxIndex] ||
                  "/placeholder.svg?height=600&width=900&query=project-lightbox"
                }
                alt={`${projectTitle} full size ${lightboxIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                height={500}
                width={500}
              />

              {/* Close Button */}
              <Button
                onClick={closeLightbox}
                size="icon"
                variant="secondary"
                className="absolute -top-12 right-0 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X size={20} />
              </Button>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    onClick={handleLightboxPrev}
                    size="icon"
                    variant="secondary"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronLeft size={24} />
                  </Button>

                  <Button
                    onClick={handleLightboxNext}
                    size="icon"
                    variant="secondary"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronRight size={24} />
                  </Button>

                  {/* Counter */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm">
                    {lightboxIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
