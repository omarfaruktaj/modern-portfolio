"use client";

import * as React from "react";
import { motion } from "motion/react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableOfContentsItem } from "@/types";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeId?: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-8">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-left font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white dark:hover:bg-gray-800/50 lg:hidden"
      >
        <List size={16} />
        Table of Contents
      </button>

      {/* Desktop/Mobile Content */}
      <motion.div
        className={cn(
          "mt-4 space-y-1 lg:mt-0",
          isOpen ? "block" : "hidden lg:block"
        )}
        initial={false}
        animate={{ height: isOpen ? "auto" : "auto" }}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
          <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
            Table of Contents
          </h4>
          <nav className="space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "block w-full text-left text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                  item.level === 1 && "font-medium",
                  item.level === 2 && "pl-3",
                  item.level === 3 && "pl-6",
                  item.level > 3 && "pl-9",
                  activeId === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>
    </div>
  );
}
