"use client";
import { cn } from "@/lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  BookOpen,
  Briefcase,
  FolderOpen,
  Home,
  Mail,
  Menu,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface ModernMobileNavProps {
  items?: NavItem[];
  className?: string;
  variant?: "default" | "floating" | "minimal";
  showLabels?: boolean;
}

const defaultItems: NavItem[] = [
  { label: "Home", href: "/#home", icon: Home },
  { label: "About", href: "/#about", icon: User },
  { label: "Skills", href: "/#skills", icon: Briefcase },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Blog", href: "/blogs", icon: BookOpen },
  { label: "Contact", href: "/#contact", icon: Mail },
];

const MobileNavigation: React.FC<ModernMobileNavProps> = ({
  items = defaultItems,
  className,
  variant = "default",
  showLabels = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rippleOrigin, setRippleOrigin] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Handle active state based on current path
  useEffect(() => {
    const currentPath = window.location.pathname + window.location.hash;
    const activeIdx = items.findIndex(
      (item) =>
        currentPath === item.href ||
        (item.href !== "/" && currentPath.startsWith(item.href))
    );
    if (activeIdx !== -1) {
      setActiveIndex(activeIdx);
    }
  }, [items]);

  // Simulate haptic feedback
  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleItemClick = (
    index: number,
    href: string,
    event: React.MouseEvent
  ) => {
    setIsExpanded(false);

    setActiveIndex(index);
    triggerHapticFeedback();

    // Set ripple origin for animation
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setRippleOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });

    // Clear ripple after animation
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setRippleOrigin(null), 600);

    // Smooth scroll for hash links
    if (href.includes("#")) {
      const element = document.querySelector(
        href.split("#")[1] ? `#${href.split("#")[1]}` : ""
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    triggerHapticFeedback();
  };
  const handleDownload = () => {
    sendGTMEvent({ event: "button_clicked", label: "Resume" });
    const fileUrl = "/files/omarfaruk's_resume.pdf";

    // ✅ 1. Trigger file download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "omarfaruk's_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // ✅ 2. Open in new tab
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };
  const getVariantStyles = () => {
    switch (variant) {
      case "floating":
        return {
          container: "mx-6 mb-6",
          nav: "bg-background/95 backdrop-blur-2xl border-0 shadow-2xl rounded-3xl",
          expanded: "bottom-full mb-4",
        };
      case "minimal":
        return {
          container: "mx-4 mb-4",
          nav: "bg-background/80 backdrop-blur-lg border border-border/30 shadow-sm rounded-2xl",
          expanded: "bottom-full mb-3",
        };
      default:
        return {
          container: "mx-4 mb-4",
          nav: "bg-background/90 backdrop-blur-xl border border-border/50 shadow-lg rounded-3xl",
          expanded: "bottom-full mb-4",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <>
      {/* Ripple effect */}
      {rippleOrigin && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: rippleOrigin.x,
            top: rippleOrigin.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-8 h-8 bg-primary/30 rounded-full animate-ping" />
        </div>
      )}

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 md:hidden",
          styles.container,
          className
        )}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

        <div className="relative">
          {/* Expanded menu */}
          <div
            className={cn(
              "absolute left-0 right-0 transition-all duration-500 ease-out",
              styles.expanded,
              isExpanded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            <div
              className={cn(
                "bg-background/95 backdrop-blur-2xl border border-border/50 rounded-3xl p-4 shadow-2xl",
                variant === "floating" && "shadow-2xl border-0"
              )}
            >
              <div className="grid grid-cols-2 gap-3">
                {items.slice(4).map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === index;
                  const isHovered = hoveredIndex === index;

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={(e) => handleItemClick(index, item.href, e)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={cn(
                        "group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
                        "hover:scale-105 active:scale-95 transform-gpu",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Icon container */}
                      <div className="relative">
                        <Icon className="h-6 w-6" />
                        {isActive && (
                          <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
                        )}
                        {item.badge && (
                          <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                            {item.badge}
                          </div>
                        )}
                      </div>

                      <span className="text-sm font-medium">{item.label}</span>

                      {/* Hover effect */}
                      {isHovered && !isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                      )}
                    </Link>
                  );
                })}
              </div>
              <Button onClick={handleDownload} className="z-50 my-3 w-full">
                Resume
              </Button>
            </div>
          </div>

          {/* Main navigation bar */}
          <div className={cn("relative", styles.nav)}>
            {/* Inner content */}
            <div className="flex items-center justify-between p-2">
              {/* Left section - First 3 items */}
              <div className="flex items-center gap-1 flex-1">
                {items.slice(0, 4).map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === index;
                  const isHovered = hoveredIndex === index;

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={(e) => handleItemClick(index, item.href, e)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={cn(
                        "group flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300 relative min-w-0 flex-1",
                        "hover:scale-105 active:scale-95 transform-gpu",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {/* Active indicator line */}
                      {isActive && (
                        <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2">
                          <div className="w-6 h-0.5 bg-primary rounded-full" />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="relative transition-all duration-300">
                        <Icon className="h-5 w-5" />
                        {isActive && (
                          <div className="absolute -inset-1.5 bg-primary/10 rounded-full animate-pulse" />
                        )}
                        {item.badge && (
                          <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-3 w-3 flex items-center justify-center font-medium text-[10px]">
                            {item.badge}
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      {showLabels && (
                        <span className="text-xs font-medium truncate max-w-full">
                          {item.label}
                        </span>
                      )}

                      {/* Hover effect */}
                      {isHovered && !isActive && (
                        <div className="absolute inset-0 bg-muted/30 rounded-2xl" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-border/30 mx-2" />

              {/* Menu button */}
              <button
                onClick={toggleExpanded}
                className={cn(
                  "group flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300 relative",
                  "hover:scale-105 active:scale-95 transform-gpu min-w-[60px]",
                  isExpanded
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={isExpanded ? "Close menu" : "Open menu"}
              >
                {/* Active indicator */}
                {isExpanded && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-0.5 bg-primary rounded-full" />
                  </div>
                )}

                <div className="relative transition-all duration-300">
                  {isExpanded ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <div className="relative">
                      <Menu className="h-5 w-5" />
                      <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary animate-pulse" />
                    </div>
                  )}
                  {isExpanded && (
                    <div className="absolute -inset-1.5 bg-primary/10 rounded-full animate-pulse" />
                  )}
                </div>

                {showLabels && (
                  <span className="text-xs font-medium">
                    {isExpanded ? "Close" : "Menu"}
                  </span>
                )}
              </button>
            </div>

            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default MobileNavigation;
