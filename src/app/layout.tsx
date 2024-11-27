import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";

export const metadata: Metadata = { title: "Droplo" };

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
};

export default RootLayout;
