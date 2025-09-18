import BottomNavigation from "@/components/bottom-navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LenisProvider from "@/components/LenisProvider";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothFollower from "@/components/ui/smooth-follower-cursor";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Omar Faruk - Full-Stack Developer",
    default: "Omar Faruk - Full-Stack Developer",
  },
  description:
    "Portfolio of Omar Faruk, a passionate full-stack developer specializing in modern web applications using React, Next.js, Node.js, and more.",
  keywords: [
    "Omar Faruk",
    "full-stack developer",
    "frontend developer",
    "Backend developer",
    "Nodejs Developer",
    "React Developer",
    "Nextjs Developer",
    "Web Developer",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "web development",
    "developer portfolio",
  ],
  authors: [{ name: "Omar Faruk", url: "https://omarfarukpro.vercel.app" }],
  creator: "Omar Faruk",
  publisher: "Omar Faruk",
  metadataBase: new URL("https://omarfarukpro.vercel.app"),

  openGraph: {
    title: "Omar Faruk - Full-Stack Developer",
    description:
      "Explore the portfolio of Omar Faruk, showcasing modern full-stack web applications and development skills in React, Next.js, and Node.js.",
    url: "https://omarfarukpro.vercel.app",
    siteName: "Omar Faruk Portfolio",
    images: [
      {
        url: "https://omarfarukpro.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Omar Faruk Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "Omar Faruk - Full-Stack Developer",
    description:
      "Portfolio showcasing Omar Faruk's expertise in React, Next.js, and full-stack web development.",
    images: ["https://omarfarukpro.vercel.app/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

  alternates: {
    canonical: "https://omarfarukpro.vercel.app",
    languages: {
      "en-US": "https://omarfarukpro.vercel.app",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Omar Faruk",
              url: "https://omarfarukpro.vercel.app",
              jobTitle: "Full-Stack Developer",
            }),
          }}
        />
      </head>
      <body className={`${roboto.className}  antialiased`}>
        {" "}
        <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
            <BottomNavigation />
            <SmoothFollower />
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
