import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "i-Spardha - Sports Management Platform",
  description: "i-Spardha is a comprehensive sports management platform designed to streamline the management of sports events, player data, and point tracking. Developed by Devansh Agrawal",
  keywords: "sports management, sports events, player management, point tracking, Next.js, MongoDB, user authentication, sports platform",
  author: "Devansh Agrawal",
  charset: "UTF-8",
  robots: "index, follow",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen ">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
