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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const skillCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const skillCards = skillCardRefs.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".skills-header",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
      skillCards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: "back.out(1.2)",
      },
      "-=0.5"
    );

    return () => {
      if (tl && tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <TooltipProvider>
      <section
        ref={sectionRef}
        className="flex items-center justify-center min-h-screen py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
        id="skills"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="skills-header text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text">
              Skills & Technologies
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical expertise across
              different domains, from frontend development to DevOps and
              database management.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const levelInfo = getLevelInfo(skill.level);
              return (
                <div
                  key={skill.name}
                  ref={(el) => {
                    skillCardRefs.current[index] = el;
                  }}
                  className="opacity-0"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-lg">
                        <CardContent>
                          <div className="flex flex-col items-center space-y-2">
                            <div className="relative">
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${levelInfo.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-400`}
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
                      <p className="font-medium text-sm">
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
