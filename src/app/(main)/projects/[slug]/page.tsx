import projects from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetails from "../_components/projectDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find((project) => project.id == Number(slug));
  if (!project) return notFound();

  return {
    title: `${project?.title} | Omar Faruk Portfolio Project`,
    description: project?.tagline,
    openGraph: {
      title: project?.title,
      description: project?.tagline,
      url: `https://omarfarukpro.vercel.app/projects/${slug}`,
      images: [
        {
          url: project?.images[0],
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((project) => project.id == Number(slug));

  if (!project) return <p>No project found</p>;

  return <ProjectDetails project={project} />;
}
