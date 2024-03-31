import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'dotenv/config';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Planner",
  description: "Support tool for making travel plan | syou551",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
