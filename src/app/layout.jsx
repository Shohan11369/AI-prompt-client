import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "AI Prompt | Premium Event Discovery & Ticket Booking Platform",
  description:
    "Browse, discover, and purchase tickets for the finest premium events near you. Or create your own  account and host events seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-brand-background bg-gradient-to-r from-pink-900/10 via-brand-secondary/10 to-transparent text-brand-text">
        <main className="flex-grow flex flex-col">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

