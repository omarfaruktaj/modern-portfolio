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
import Link from "next/link";
import { useState } from "react";
import { ThemeToggleButton } from "./theme-effect";

export default function Header() {
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
  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = "/files/omarfaruk's_resume.pdf";
  //   link.download = "omarfaruk's_resume.pdf";
  //   link.click();
  // };

  const handleDownload = () => {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="top-2 hidden sm:block">
      <NavBody>
        <Logo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <ThemeToggleButton
            variant={"circle"}
            start={"center"}
            blur={false}
            gifUrl={
              "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
            }
            className="h-8 w-8 z-50"
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
            <ThemeToggleButton
              variant={"circle"}
              start={"center"}
              blur={false}
              gifUrl={
                "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              }
              className="h-8 w-8 z-50"
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
