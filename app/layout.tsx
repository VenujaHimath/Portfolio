import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venuja Himath Ranasinghe | Data Science Portfolio",
  description:
    "Portfolio of R.A. Venuja Himath Ranasinghe — Data Science undergraduate building real-world AI systems in Sri Lanka.",
  keywords: [
    "Data Science",
    "Machine Learning",
    "Portfolio",
    "SLIIT",
    "Sri Lanka",
  ],
  authors: [{ name: "R.A. Venuja Himath Ranasinghe" }],
  openGraph: {
    title: "Venuja Himath Ranasinghe | Data Science Portfolio",
    description:
      "Data Science undergrad building ML systems — from chess strategy to predictive models.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
