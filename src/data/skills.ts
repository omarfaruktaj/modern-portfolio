import {
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaJsSquare,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiCypress,
  SiExpress,
  SiGraphql,
  SiJest,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

export const skills = [
  { name: "HTML5", icon: FaHtml5, level: "Advanced", color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, level: "Advanced", color: "#1572B6" },
  { name: "JavaScript", icon: FaJsSquare, level: "Advanced", color: "#F7DF1E" },
  {
    name: "TypeScript",
    icon: SiTypescript,
    level: "Intermediate",
    color: "#3178C6",
  },
  { name: "React", icon: FaReact, level: "Advanced", color: "#61DAFB" },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    level: "Intermediate",
    color: "#000000",
  },
  { name: "Redux", icon: SiRedux, level: "Intermediate", color: "#764ABC" },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    level: "Advanced",
    color: "#06B6D4",
  },
  { name: "Vite", icon: SiVite, level: "Intermediate", color: "#646CFF" },

  { name: "Node.js", icon: FaNodeJs, level: "Advanced", color: "#339933" },
  { name: "Express.js", icon: SiExpress, level: "Advanced", color: "#000000" },
  { name: "Prisma", icon: SiPrisma, level: "Intermediate", color: "#2D3748" },
  { name: "GraphQL", icon: SiGraphql, level: "Intermediate", color: "#E10098" },

  { name: "MongoDB", icon: SiMongodb, level: "Advanced", color: "#47A248" },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    level: "Intermediate",
    color: "#336791",
  },

  { name: "Redis", icon: SiRedis, level: "Beginner", color: "#DC382D" },

  { name: "Git", icon: FaGitAlt, level: "Advanced", color: "#F05032" },
  { name: "Docker", icon: FaDocker, level: "Intermediate", color: "#2496ED" },
  { name: "Nginx", icon: SiNginx, level: "Intermediate", color: "#009639" },

  { name: "Jest", icon: SiJest, level: "Intermediate", color: "#C21325" },
  { name: "Cypress", icon: SiCypress, level: "Beginner", color: "#17202C" },
];
