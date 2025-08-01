import { ProjectCardWithSlider } from "@/components/project-card";
import projects from "@/data/projects";

export default function Projects() {
  const projectsData = projects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Projects
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            A showcase of my recent work, featuring innovative solutions and
            cutting-edge technologies{" "}
          </p>
        </div>

        {/* Regular Posts */}
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <ProjectCardWithSlider key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
