"use client";
import { cn } from "@/lib/utils";
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
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ModernMobileNavProps {
  items?: NavItem[];
  className?: string;
}

const defaultItems: NavItem[] = [
  { label: "Home", href: "/#home", icon: Home },
  { label: "About", href: "/#about", icon: User },
  { label: "Skills", href: "/#skills", icon: Briefcase },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Blog", href: "/blogs", icon: BookOpen },
  { label: "Contact", href: "/#contact", icon: Mail },
];

const BottomNavigation: React.FC<ModernMobileNavProps> = ({
  items = defaultItems,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleItemClick = (index: number, href: string) => {
    setActiveIndex(index);
    setIsExpanded(false);

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

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 md:hidden",
          // "px-6 pb-6 pt-4",
          className
        )}
      >
        <div className="absolute inset-0 " />

        <div className="relative">
          <div
            className={cn(
              "mb-4 overflow-hidden transition-all duration-500 ease-out",
              isExpanded
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 translate-y-4"
            )}
          >
            <div className="bg-[var(--nav-glass)] backdrop-blur-xl border border-[var(--nav-border)] rounded-3xl p-3  shadow-[var(--nav-shadow)]">
              <div className="grid grid-cols-2 gap-3">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === index;

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => handleItemClick(index, item.href)}
                      className={cn(
                        "group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300",
                        "hover:scale-105 active:scale-95 transform-gpu",
                        isActive
                          ? "bg-[var(--nav-active)] text-[var(--nav-active-text)] shadow-lg"
                          : "text-[var(--nav-inactive)] hover:text-foreground hover:bg-accent/30"
                      )}
                    >
                      <div
                        className={cn(
                          "relative transition-all duration-300",
                          isActive && "scale-110"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                        {isActive && (
                          <div className="absolute -inset-1 bg-[var(--nav-active)] rounded-full opacity-20 animate-pulse" />
                        )}
                      </div>
                      <span className="text-sm font-semibold tracking-wide">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-[var(--nav-glass)] backdrop-blur-xl  rounded-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {items.slice(0, 3).map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === index;

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => handleItemClick(index, item.href)}
                      className={cn(
                        "group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300",
                        "hover:scale-105 active:scale-95 transform-gpu",

                        isActive
                          ? "bg-[var(--nav-active)]  text-primary"
                          : "text-[var(--nav-inactive)] hover:text-foreground hover:bg-accent/30"
                      )}
                    >
                      <div
                        className={cn(
                          "relative transition-all duration-300 ",
                          isActive && "scale-110"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {isActive && (
                          <div className="absolute -inset-1 bg-[var(--nav-active)] rounded-full opacity-20 animate-pulse" />
                        )}
                      </div>
                      <span className="text-xs font-semibold tracking-wide">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300",
                  "hover:scale-105 active:scale-95 transform-gpu",
                  isExpanded
                    ? "bg-[var(--nav-active)] text-[var(--nav-active-text)] "
                    : "text-[var(--nav-inactive)] hover:text-foreground hover:bg-accent/30"
                )}
                aria-label={isExpanded ? "Close menu" : "Open menu"}
              >
                <div
                  className={cn(
                    "relative transition-all duration-300",
                    isExpanded && "scale-110 rotate-180"
                  )}
                >
                  {isExpanded ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <div className="relative">
                      <Menu className="h-5 w-5" />
                      <Sparkles className="absolute -top-1 -right-1 h-3 w-3 opacity-60" />
                    </div>
                  )}
                  {isExpanded && (
                    <div className="absolute -inset-1 bg-[var(--nav-active)] rounded-full opacity-20 animate-pulse" />
                  )}
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  Menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-1 md:hidden transition-all duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};
export default BottomNavigation;
