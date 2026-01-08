import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contexta | AI Development Playbook",
  description: "Centralized playbook for AI-assisted software development. Browse agents, skills, and workflows to supercharge your development workflow.",
  keywords: ["AI", "development", "playbook", "agents", "skills", "workflows", "coding assistant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#1c1c1e]`}
      >
        {children}
      </body>
    </html>
  );
}
