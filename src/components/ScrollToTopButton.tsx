"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        size="icon"
        className={cn(
          "rounded-full p-2 shadow-lg backdrop-blur-md bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700",
          "hover:shadow-xl hover:bg-white/80 dark:hover:bg-zinc-700/80 transition-all",
          "group"
        )}
      >
        <ChevronUp className="h-5 w-5 text-zinc-800 dark:text-zinc-100 transition-transform group-hover:-translate-y-1 group-hover:scale-110" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
