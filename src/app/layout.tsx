import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

// Production domain; social share links resolve og-image.png against it.
const siteUrl = "https://grandslamlaundry.com";
const title = "Grand Slam Laundry | Coin Laundry in Fresno, CA";
const description =
  "Grand Slam Laundry is a baseball-themed coin laundromat in Fresno, CA. Self-serve wash & dry with big machines for bulky loads. Pay with quarters or the PayRange app.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Grand Slam Laundry",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId="GTM-MW8D3XVX" />
      <body className="min-h-full flex flex-col bg-cream text-navy">
        <SplashScreen />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
