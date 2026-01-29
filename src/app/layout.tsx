import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ansh | Full Stack Web Developer",
  description: "Freelance Full Stack Web Developer based in India. Specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.",
  keywords: ["Ansh", "Full Stack Developer", "Web Developer", "React", "Next.js", "TypeScript", "Node.js", "Freelance", "India"],
  authors: [{ name: "Ansh" }],
  openGraph: {
    title: "Ansh | Full Stack Web Developer",
    description: "Freelance Full Stack Web Developer based in India. Specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.",
    type: "website",
    url: "https://ansh-resume-sable.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh | Full Stack Web Developer",
    description: "Freelance Full Stack Web Developer based in India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased bg-[#0a0a0a]" suppressHydrationWarning>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
