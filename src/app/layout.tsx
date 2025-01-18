import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "@/app/globals.css";
import { AppHeader } from "@/components/app-header";
import { Suspense } from "react";
import Head from "next/head";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Artist Grid App",
  description: "An app for managing artist grids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fd9745" />
      </Head>
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
