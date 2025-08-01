// components/AnimatedSection.tsx
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export const AnimatedSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={ref} className="section">
      {children}
    </section>
  );
};
