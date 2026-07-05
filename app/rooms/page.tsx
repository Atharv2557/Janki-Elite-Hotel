import { RoomPageHero } from "@/components/sections/room-page/RoomPageHero";
import { RoomShowcase } from "@/components/sections/room-page/RoomShowcase";
import { RoomBookingCTA } from "@/components/sections/room-page/RoomBookingCTA";
import { Navbar } from "@/components/layout/navbar";
import { FloatingWhatsAppCTA } from "@/components/sections/room-page/FloatingWhatsAppCTA";

export default function RoomsPage() {
  return (<>
     <Navbar />

    <main className="min-h-screen bg-[#f7f1e7] text-[#241a14]">
      <RoomPageHero />
      <RoomShowcase />
      <RoomBookingCTA />
      <FloatingWhatsAppCTA />
    </main>
    </>
  );
}