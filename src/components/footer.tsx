"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Code,
  Globe,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface FooterProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const quickLinks = [
    { name: "Home", href: "#home", icon: <User className="h-4 w-4" /> },
    { name: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    {
      name: "Projects",
      href: "#projects",
      icon: <Briefcase className="h-4 w-4" />,
    },
    { name: "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
    {
      name: "Contact",
      href: "#contact",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Email",
      value: "omarabdullah1811@gmail.com",
      href: "mailto:omarabdullah1811@gmail.com",
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: "Phone",
      value: "+8801798642262",
      href: "tel:+8801798642262",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Location",
      value: "Cumillah,Bangladesh",
      href: "#",
    },
  ];

  return (
    <footer className="relative bg-gray-900 dark:bg-gray-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid
 grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Brand Section */}
            <motion.div variants={fadeIn} className="lg:col-span-4">
              <div className="mb-6">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      <span className="text-blue-400">{"<"}</span>
                      Omar Faruk
                      <span className="text-blue-400">{" />"}</span>
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Full-Stack Developer
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  Passionate full-stack developer crafting exceptional digital
                  experiences with modern technologies. Let&apos;s build
                  something amazing together.
                </p>

                {/* Availability Badge */}
                <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-medium">
                    Available for new projects
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeIn} className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        scrollToSection?.(link.href.replace("#", ""))
                      }
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group"
                    >
                      <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                        {link.icon}
                      </div>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div variants={fadeIn} className="lg:col-span-3">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                Get In Touch
              </h4>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{info.value}</p>
                      <p className="text-xs text-gray-500">{info.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-gray-800/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Omar Faruk. All rights
                  reserved.
                </p>
                <Badge
                  variant="outline"
                  className="border-gray-600 text-gray-400"
                >
                  Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by
                  Omar
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Privacy-First</span>
                </div>
                <Separator orientation="vertical" className="h-4 bg-gray-600" />
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Built with modern web standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
