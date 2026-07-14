import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
} from "next/font/google";

import "./globals.css";

import ContactSettingsProvider from "@/components/providers/ContactSettingsProvider";
import { getContactSettings } from "@/lib/contact-settings/get-contact-settings";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hoteljankielite.com"),

  title: {
    default: "Janki Elite Hotel Jaipur | Luxury Rooms & Fine Dining",
    template: "%s | Janki Elite Hotel Jaipur",
  },

  description:
    "Experience comfortable rooms, fine dining and warm hospitality at Janki Elite Hotel in Jaipur. Explore rooms, amenities and contact us for bookings.",

  applicationName: "Janki Elite Hotel",

  authors: [
    {
      name: "Janki Elite Hotel",
    },
  ],

  creator: "Janki Elite Hotel",
  publisher: "Janki Elite Hotel",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactSettings =
    await getContactSettings();

  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable}`}
      >
        <ContactSettingsProvider
          settings={contactSettings}
        >
          {children}
        </ContactSettingsProvider>
      </body>
    </html>
  );
}