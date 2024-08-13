import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { GlobalProvider } from "@/context/globalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Class Tag",
  description: "Record attendance with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {children}
          </div>
        </GlobalProvider>
        <Toaster />
      </body>
    </html>
  );
}
