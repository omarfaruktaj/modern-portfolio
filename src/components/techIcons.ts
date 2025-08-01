import { FaGithub, FaReact, FaStripe } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReacthookform,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { TbBrandReactNative, TbBrandRedux } from "react-icons/tb";

export const techLibrary = {
  React: { name: "React", Icon: FaReact, category: "frontend" },
  "React.js": { name: "React.js", Icon: FaReact, category: "frontend" },
  "React Native": {
    name: "React Native",
    Icon: TbBrandReactNative,
    category: "frontend",
  },
  Next: { name: "Next.js", Icon: SiNextdotjs, category: "frontend" },
  "Next.js": { name: "Next.js", Icon: SiNextdotjs, category: "frontend" },

  TypeScript: { name: "TypeScript", Icon: SiTypescript, category: "tools" },
  Vite: { name: "Vite", Icon: SiVite, category: "tools" },

  Redux: { name: "Redux", Icon: SiRedux, category: "tools" },
  "Redux Toolkit": {
    name: "Redux Toolkit",
    Icon: TbBrandRedux,
    category: "tools",
  },
  "Redux Toolkit Query": {
    name: "Redux Toolkit Query",
    Icon: TbBrandRedux,
    category: "tools",
  },
  "RTK Query": {
    name: "RTK Query",
    Icon: TbBrandRedux,
    category: "tools",
  },
  "Context API": {
    name: "Context API",
    Icon: FaReact,
    category: "tools",
  },

  "React Router": {
    name: "React Router",
    Icon: SiReactrouter,
    category: "frontend",
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    category: "frontend",
  },
  "React Hook Form": {
    name: "React Hook Form",
    Icon: SiReacthookform,
    category: "tools",
  },

  Stripe: { name: "Stripe", Icon: FaStripe, category: "backend" },
  Aamarpay: { name: "Aamarpay", Icon: null, category: "backend" },

  Quill: { name: "Quill", Icon: null, category: "tools" },
  Draft: { name: "Draft.js", Icon: FaGithub, category: "tools" },
  "Draft.js": { name: "Draft.js", Icon: FaGithub, category: "tools" },
  Slate: { name: "Slate", Icon: null, category: "tools" },

  "Lucide-react": { name: "Lucide-react", Icon: null, category: "tools" },
  "React Icons": { name: "React Icons", Icon: FaReact, category: "tools" },
};
