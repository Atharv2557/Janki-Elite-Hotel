import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import {
  AmenitiesCTA,
  AmenitiesFeature,
  AmenitiesGrid,
  AmenitiesHero,
  AmenitiesOverview,
} from "@/components/sections/amenities-page";

export const metadata: Metadata = {
  title: "Amenities | Janki Elite Jaipur",
  description:
    "Explore premium hotel amenities at Janki Elite Jaipur including Wi-Fi, dining, parking, room service, and guest support.",
};

export default function AmenitiesPage() {
  return (
    <main>
        <Navbar/>
      <AmenitiesHero />
      <AmenitiesOverview />
      <AmenitiesGrid />
      <AmenitiesFeature/>
      <AmenitiesCTA />
    </main>
  );
}