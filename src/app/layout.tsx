import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { AppHeader } from "@/components/app-header";
import { THEME_COLOUR } from "@/lib/constants";
import "@/app/globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Artist Grid App",
  description: "An app for managing artist grids",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOUR,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} font-sans antialiased bg-bg bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] min-h-screen flex flex-col`}
      >
        <AppHeader />
        <main className="flex flex-1">
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
