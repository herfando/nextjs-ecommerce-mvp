import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/query_provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/context/auth_context"; // pastikan path ini benar
import ReduxProvider from "@/app/reduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://herfando-store.vercel.app"),
  title: {
    default: "Herfando Store | Next.js E-Commerce MVP",
    template: "%s | Herfando Store",
  },
  description:
    "Herfando Store is a modern e-commerce MVP built with Next.js, TypeScript, and Shadcn UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <QueryProvider>
          <AuthProvider>
            <ReduxProvider>
              {children}
              <Toaster richColors position="top-right" />
            </ReduxProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
