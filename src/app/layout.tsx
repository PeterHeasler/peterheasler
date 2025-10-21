import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@/lib/gtag";

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
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {/* Use a flex container to push the footer down */}
          <div className="flex min-h-screen flex-col">
            <Header />
            {/* The main content area grows to fill available space */}
            <main className="flex-grow p-14">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}