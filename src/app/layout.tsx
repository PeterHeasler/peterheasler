import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peter's Blog",
  description: "Old Dog New Tricks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <body className={`${inter.className}`}>
          <div className="min-h-screen flex flex-col border-border">
            <Header />
            <main className="flex-grow p-12">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
