import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/hero/Hero";
import LuxuryIntro from "@/components/sections/luxury-intro";
import Rooms from "@/components/sections/rooms";
import Amenities from "@/components/sections/amenities";
import Dining from "@/components/sections/dining";
import Gallery from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import Location from "@/components/sections/location";
import CTA from "@/components/sections/cta";
import { FloatingWhatsAppCTA } from "@/components/sections/room-page/FloatingWhatsAppCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[var(--background)]">
        <Hero />
        <LuxuryIntro />
        <Rooms />
        <Amenities />
        <Dining />
        <Gallery />
        <Testimonials />
        <Location />
        <CTA />
        <FloatingWhatsAppCTA/>
      </main>

      <Footer />
    </>
  );
}