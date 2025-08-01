"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Server, Wrench } from "lucide-react";

interface TechStackItem {
  name: string;
  description: string;
  category: "frontend" | "backend" | "database" | "tools";
}

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

const categoryConfig = {
  frontend: {
    title: "Frontend",
    icon: Code2,
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  backend: {
    title: "Backend",
    icon: Server,
    color: "bg-green-500/10 text-green-700 dark:text-green-300",
    borderColor: "border-green-200 dark:border-green-800",
  },
  database: {
    title: "Database",
    icon: Database,
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  tools: {
    title: "Tools & Services",
    icon: Wrench,
    color: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
};

export function TechStackSection({ techStack }: TechStackSectionProps) {
  const groupedTech = React.useMemo(() => {
    return techStack.reduce((acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    }, {} as Record<string, TechStackItem[]>);
  }, [techStack]);

  return (
    <div className="space-y-6">
      {Object.entries(groupedTech).map(([category, items]) => {
        const config = categoryConfig[category as keyof typeof categoryConfig];
        const Icon = config.icon;

        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`rounded-lg p-2 ${config.color}`}>
                <Icon size={20} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {config.title}
              </h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((tech) => (
                <div
                  key={tech.name}
                  className={`rounded-xl border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${config.borderColor}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <Badge variant="secondary" className="font-medium">
                        {tech.name}
                      </Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
