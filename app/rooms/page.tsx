import { RoomPageHero } from "@/components/sections/room-page/RoomPageHero";
import { RoomShowcase } from "@/components/sections/room-page/RoomShowcase";
import { RoomBookingCTA } from "@/components/sections/room-page/RoomBookingCTA";
import { Navbar } from "@/components/layout/navbar";
import { FloatingWhatsAppCTA } from "@/components/sections/room-page/FloatingWhatsAppCTA";

import { createClient } from "@/lib/supabase/server";
import type { RoomPageItem } from "@/data/room-page";

type RoomDatabaseRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  description: string | null;
  price_per_night: number | string;
  capacity: number;
  room_size: string | null;
  hero_image: string | null;
  gallery_images: string[] | null;
  amenities: string[] | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
};

export default async function RoomsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
        id,
        slug,
        title,
        short_description,
        description,
        price_per_night,
        capacity,
        room_size,
        hero_image,
        gallery_images,
        amenities,
        is_featured,
        is_published,
        display_order
      `
    )
    .eq("is_published", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error("Public rooms fetch error:", error);
  }

  const rooms: RoomPageItem[] = (data ?? []).map(
    (room: RoomDatabaseRow) => {
      const heroImage =
        room.hero_image ||
        "/images/rooms/deluxe.jpg";

      const galleryImages =
        room.gallery_images?.length
          ? room.gallery_images
          : [heroImage];

      return {
        id: room.id,
        slug: room.slug,

        title: room.title,

        subtitle:
          room.room_size ||
          (room.is_featured
            ? "Featured Stay"
            : "Premium Comfort"),

        shortDescription:
          room.short_description ||
          "A thoughtfully designed room offering comfort, elegance and a relaxing hotel experience.",

        description:
          room.description ||
          room.short_description ||
          "Enjoy a comfortable stay with thoughtfully selected amenities and warm hospitality.",

        price: `Starting from ₹${Number(
          room.price_per_night
        ).toLocaleString("en-IN")} / Night`,

        heroImage,
        coverImage: heroImage,

        gallery: galleryImages.map(
          (image, index) => ({
            id: index + 1,
            src: image,
            alt: `${room.title} image ${index + 1}`,
          })
        ),

        featuresTitle: "Amenities",

        features: (room.amenities ?? []).map(
          (amenity, index) => ({
            id: index + 1,
            title: amenity,
          })
        ),

        complimentaryBreakfast: false,
        breakfastSelectionLimit: 0,
        complimentaryLunchDinner: false,
      };
    }
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f1e7] text-[#241a14]">
        <RoomPageHero />

        <RoomShowcase rooms={rooms} />

        <RoomBookingCTA />

        <FloatingWhatsAppCTA />
      </main>
    </>
  );
}



