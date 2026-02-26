// react 
import { Suspense } from "react";

// css
import "@/src/css/index.css";

// metadata 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
  description: "Save your favourite movies",
};

// Fonts 
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Toaster 
import { Toaster } from "react-hot-toast";

// components
import StoreUser from "../components/store-user/StoreUser";
import StoreUserLoader from "../components/store-user/StoreUserLoader";

// Providers
import Providers from "../providers/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>
          <Suspense fallback={<StoreUserLoader />}>
            <StoreUser />
          </Suspense>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
