import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import StickyCtaBar from "@/components/StickyCtaBar";
import Footer from "@/components/Footer";
import { siteInfo } from "@/lib/content";
import type { Restaurant, WithContext } from "schema-dts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theterotale.com"),
  title: "The Terotale | Pure Vegetarian Fine Dine, Nashik",
  description: "Experience a premium multi-cuisine fine dining experience in Nashik featuring a lush indoor plant setting and architectural rooftop dining.",
  keywords: [
    "vegetarian restaurant Nashik",
    "fine dining Nashik",
    "eco-conscious restaurant",
    "The Terotale",
    "garden restaurant Nashik",
    "pure veg restaurant Nashik",
    "best restaurant Nashik",
  ],
  openGraph: {
    title: "The Terotale | Pure Vegetarian Fine Dine, Nashik",
    description: "Experience a premium multi-cuisine fine dining experience in Nashik featuring a lush indoor plant setting and architectural rooftop dining.",
    url: "https://theterotale.com",
    siteName: siteInfo.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-background.png",
        width: 1200,
        height: 630,
        alt: siteInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Terotale | Pure Vegetarian Fine Dine, Nashik",
    description: "Experience a premium multi-cuisine fine dining experience in Nashik featuring a lush indoor plant setting and architectural rooftop dining.",
    images: ["/images/hero-background.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const restaurantSchema: WithContext<Restaurant> = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteInfo.name,
  description: "Experience a premium multi-cuisine fine dining experience in Nashik featuring a lush indoor plant setting and architectural rooftop dining.",
  image: "/images/hero-background.png",
  telephone: siteInfo.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteInfo.address.street,
    addressLocality: siteInfo.address.city,
    addressRegion: siteInfo.address.state,
    postalCode: siteInfo.address.zip,
    addressCountry: siteInfo.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteInfo.coordinates.lat,
    longitude: siteInfo.coordinates.lng,
  },
  servesCuisine: ["Indian", "Continental", "Chinese"],
  priceRange: "₹₹",
  acceptsReservations: true,
  url: "https://theterotale.com",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "6362",
    bestRating: "5",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
      ],
      opens: "12:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Saturday",
        "https://schema.org/Sunday",
      ],
      opens: "11:00",
      closes: "23:30",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased"
    >
      <head>
        <meta name="theme-color" content="#2F3E2E" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-[#FAF9F6] text-stone-800 antialiased min-h-screen flex flex-col relative">
        <div className="noise-overlay" />
        <JsonLd data={restaurantSchema} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
