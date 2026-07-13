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
  title: "Janki Elite",
  description: "Luxury Hotel in Jaipur",
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