/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FeaturesSection } from "@/components/features-section";
import { ProjectImageGallery } from "@/components/project-image-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
type ProjectStatus = "completed" | "in-progress" | "planned";

interface Project {
  // status: ProjectStatus;
  title: string;
  tagline: string;
  description: string;
  images: string[];
  features: any[];
  techStack: any[];
  links: {
    liveDemo: string;
    frontendCode: string;
    backendCode?: string;
  };
}

export default function ProjectDetails({ project }: { project: Project }) {
  const statusConfig: Record<ProjectStatus, { color: string; label: string }> =
    {
      completed: {
        color: "bg-green-500/10 text-green-700 dark:text-green-300",
        label: "Completed",
      },
      "in-progress": {
        color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
        label: "In Progress",
      },
      planned: {
        color: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
        label: "Planned",
      },
    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft size={16} />
              Back to Projects
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          {/* <div className="flex flex-wrap items-center gap-3">
            <Badge className={statusConfig[project.status].color}>
              <CheckCircle2 size={14} className="mr-1" />
              {statusConfig[project.status].label}
            </Badge>
          </div> */}

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground font-medium">
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={project.links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2">
                <ExternalLink size={16} />
                Live Demo
              </Button>
            </Link>
            <Link
              href={project.links.frontendCode}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2 bg-transparent">
                <Github size={16} />
                Frontend Code
              </Button>
            </Link>
            {project.links.backendCode && (
              <Link
                href={project.links.backendCode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Github size={16} />
                  Backend Code
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <ProjectImageGallery
            images={project.images}
            projectTitle={project.title}
          />
        </motion.section>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900/50">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              About This Project
            </h2>
            <div className="prose prose-gray max-w-none dark:prose-invert">
              {project.description.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Key Features
          </h2>
          <FeaturesSection features={project.features} />
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Technology Stack
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex items-center gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
