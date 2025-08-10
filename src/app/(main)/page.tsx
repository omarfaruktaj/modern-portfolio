/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SmoothFollower from "@/components/ui/smooth-follower-cursor";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { About } from "./_components/about";
import BlogSection from "./_components/blogs";
import ContactSection from "./_components/contact";
import { Hero } from "./_components/hero";
import Projects from "./_components/projects";
import Skills from "./_components/skills";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const sections = gsap.utils.toArray(".animate-section");

    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effect for hero background
    gsap.to(".parallax-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div>
      <div className="hero-section ">
        <Hero />
      </div>
      <div className="animate-section">
        <About />
      </div>
      <div className="animate-section">
        <Skills />
      </div>
      <div className="animate-section">
        <Projects />
      </div>
      <div className="animate-section">
        <BlogSection />
      </div>
      <div className="animate-section">
        <ContactSection />
      </div>
      <SmoothFollower />
      <ScrollToTopButton />
    </div>
  );
}
