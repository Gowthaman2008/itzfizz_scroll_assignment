import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"], variable: "--font-main", display: "swap" });

export const metadata = {
  title: "Itzfizz | Scroll-Driven Hero",
  description: "Scroll-driven hero section animation built with Next.js, GSAP and Tailwind.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
