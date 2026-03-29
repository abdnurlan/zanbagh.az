import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zanbagh — Luxury Flower Boutique, Baku",
  description:
    "Award-winning luxury flower boutique in Baku. Bespoke bouquets, wedding florals, and premium gift boxes crafted with artisan precision.",
  keywords: "luxury flowers baku, bouquets azerbaijan, zanbagh, wedding flowers",
  openGraph: {
    title: "Zanbagh — Luxury Flower Boutique",
    description: "Every moment deserves a flower.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full overflow-x-hidden">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
