/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Cursor, CursorFollow, CursorProvider } from "@/components/ui/cursor";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timelineItems = gsap.utils.toArray(".timeline-item");

      timelineItems.forEach((item: any, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });

      // Animate profile image
      gsap.fromTo(
        ".profile-image",
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".profile-image",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={aboutRef}
      id="about"
      className="flex items-center justify-center min-h-screen py-20 px-4 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="profile-image">
              <Image
                src="/images/omar.png"
                alt="Alex Johnson"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl mx-auto lg:mx-0"
              />
              <CursorProvider>
                <Cursor>
                  <svg
                    className="size-6 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                  >
                    <path
                      fill="currentColor"
                      d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                    />
                  </svg>
                </Cursor>
                <CursorFollow>
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-2 py-1 rounded-lg text-sm shadow-lg">
                    Developer
                  </div>
                </CursorFollow>
              </CursorProvider>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m Omar Faruk, a Full-Stack Web Developer focused on
              creating innovative, scalable, and user-centric solutions. With
              expertise in modern web technologies, I specialize in building
              seamless digital experiences, from efficient backends to engaging
              front-end designs. I’m committed to delivering high-quality
              results with precision and creativity.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Problem Solver</Badge>
              <Badge variant="secondary">Team Player</Badge>
              <Badge variant="secondary">Continuous Learner</Badge>
              <Badge variant="secondary">Open Source Contributor</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
