"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavBody,
  NavItems,
} from "@/components/ui/navbar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTheme } from "next-themes";
import Link from "next/link";
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
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/omarfaruk's_resume.pdf";
    link.download = "omarfaruk's_resume.pdf";
    link.click();
  };
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
          <Button onClick={handleDownload} className="z-50">
            Resume
          </Button>
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
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4">
            <Button
              onClick={() => {
                handleDownload();
                setIsMobileMenuOpen(false);
              }}
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
