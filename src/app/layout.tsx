import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Perchick Store - Olahan Ayam Pilihan & Lezat",
  description: "Toko online produk olahan daging ayam segar, higienis, halal, dan praktis siap saji.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#faf9f6] text-neutral-900 selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
