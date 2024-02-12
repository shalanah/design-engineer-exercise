import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";

import "./globals.css";
const poppins = Poppins({ display: "swap", weight: "700", subsets: ["latin"] });
const roboto = Roboto({ display: "swap", weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buffer - Design Engineer Challenge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
