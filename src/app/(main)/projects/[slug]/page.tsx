import projects from "@/data/projects";
import ProjectDetails from "../_components/projectDetails";

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
