/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { skills } from "@/data/skills";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const getLevelInfo = (level: string) => {
  switch (level) {
    case "Advanced":
      return {
        color:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        percentage: 90,
        gradient: "from-emerald-500 to-emerald-600",
      };
    case "Intermediate":
      return {
        color:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        percentage: 70,
        gradient: "from-amber-500 to-amber-600",
      };
    case "Beginner":
      return {
        color:
          "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300",
        percentage: 40,
        gradient: "from-slate-500 to-slate-600",
      };
    default:
      return {
        color:
          "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300",
        percentage: 50,
        gradient: "from-gray-500 to-gray-600",
      };
  }
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
      }
    );
    skillRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <TooltipProvider>
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div ref={containerRef} className="text-center mb-20 opacity-0">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Technical Expertise
            </div> */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text ">
              Skills & Technologies
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical expertise across
              different domains, from frontend development to DevOps and
              database management.
            </p>
          </div>

          <div className="grid gap-2 sm:gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const levelInfo = getLevelInfo(skill.level);
              return (
                <div
                  key={skill.name}
                  ref={(el) => {
                    skillRefs.current[index] = el;
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="opacity-0 scale-90"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3">
                        <CardContent>
                          <div className="flex flex-col items-center space-y-2">
                            <div className="relative">
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${levelInfo.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                              />
                              <div className="relative p-3 rounded-full bg-slate-50 dark:bg-slate-700/50 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors duration-300">
                                <Icon
                                  style={{ color: skill.color }}
                                  className="transition-transform duration-300 group-hover:scale-110 h-6 w-6"
                                />
                              </div>
                            </div>
                            <div className="text-center space-y-0.5">
                              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight">
                                {skill.name}
                              </h4>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="font-medium">
                        {skill.name} — {skill.level} level proficiency
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
