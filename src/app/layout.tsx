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
  title: "Omar Faruk - Full-Stack JavaScript Developer",
  description:
    "Portfolio of Omar Faruk, a passionate full-stack JavaScript developer specializing in modern web applications using React, Next.js, Node.js, and more.",
  keywords:
    "full-stack developer, JavaScript, React, Next.js, Node.js, web development, portfolio",
  authors: [{ name: "Omar Faruk" }],
  openGraph: {
    title: "Omar Faruk - Full-Stack JavaScript Developer",
    description:
      "Portfolio showcasing modern web applications and development expertise",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
