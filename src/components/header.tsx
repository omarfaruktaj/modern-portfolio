"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/navbar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const navItems = [
    {
      name: "Home",
      link: "/#home",
    },

    {
      name: "About",
      link: "/#about",
    },

    {
      name: "Skills",
      link: "/#skills",
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
    {
      name: "Contact",
      link: "/#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="top-2">
      <NavBody>
        <Logo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <ThemeSwitcher
            defaultValue="system"
            value={theme as "light" | "dark" | "system" | undefined}
            onChange={setTheme as (theme: "light" | "dark" | "system") => void}
          />
          <Button>Resume</Button>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeSwitcher
              className="w-22"
              defaultValue="system"
              value={theme as "light" | "dark" | "system" | undefined}
              onChange={
                setTheme as (theme: "light" | "dark" | "system") => void
              }
            />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full"
            >
              Download Resume
            </Button>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
