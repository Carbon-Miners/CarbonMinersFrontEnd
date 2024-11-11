import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import WagmiConfigProvider from "@/contexts/WagmiProvider";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carbon Trader",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`${inter.className}`, "dark h-screen")}
      >
        <WagmiConfigProvider>
          {children}
        </WagmiConfigProvider>
      </body>
    </html>
  );
}
