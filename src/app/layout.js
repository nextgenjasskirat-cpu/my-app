import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/app/components/extres/scrollToTop";
import Navbar from "@/app/components/ui/genral/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:"Next Gen Truck Driving School",
  description: "Best truck driving school in Sydney, Australia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollToTop />
        <Navbar />
         <main className="md:pt-[35px]">{children}</main>
      </body>
    </html>
  );
}
