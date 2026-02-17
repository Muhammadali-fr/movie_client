import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Toaster 
import { Toaster } from "react-hot-toast";

// components and providers
import TanstackQueryProvider from "../providers/tanstack-query-provider";
import StoreUser from "../components/store-user/StoreUser";
import { Suspense } from "react";
import StoreUserLoader from "../components/store-user/StoreUserLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movies",
  description: "Save your favourite movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackQueryProvider>
          <Suspense fallback={<StoreUserLoader />}>
            <StoreUser />
          </Suspense>
          <Toaster />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
