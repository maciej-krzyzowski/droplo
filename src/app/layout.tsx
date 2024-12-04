import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "Droplo" };

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl">
      <body
        className={`${inter.className} min-h-screen bg-secondary-75 p-4 text-sm`}
      >
        <StoreProvider>
          <div className="mx-auto w-full max-w-[1168px]">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
