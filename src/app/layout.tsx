// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/query_provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/context/auth_context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Global metadata for the whole website
export const metadata: Metadata = {
  title: {
    default: "Herfando Store | Next.js E-Commerce MVP",
    template: "%s | Herfando Store",
  },
  description:
    "Herfando Store is a modern e-commerce MVP built with Next.js, TypeScript, and Shadcn UI. Explore various products with seamless performance and clean design.",
  openGraph: {
    title: "Herfando Store | Next.js E-Commerce MVP",
    description:
      "Explore Herfando Store — a modern e-commerce MVP built using Next.js and React Query, featuring a smooth shopping experience and scalable architecture.",
    url: "https://github.com/herfando/nextjs-ecommerce-mvp",
    siteName: "Herfando Store",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Herfando Store Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Next.js",
    "E-commerce",
    "React Query",
    "Shadcn UI",
    "TypeScript",
    "Herfando",
    "MVP",
    "Online Store",
    "Frontend Project",
  ],
  authors: [{ name: "Herfando" }],
  creator: "Herfando",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
