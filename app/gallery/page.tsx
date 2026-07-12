import { Navbar } from "@/components/layout/navbar";
import {
  GalleryGrid,
  GalleryHero,
} from "@/components/sections/gallery-page";

import { createClient } from "@/lib/supabase/server";
import type {
  GalleryCategory,
  GalleryImage,
} from "@/data/gallery-page";

type GalleryDatabaseRow = {
  id: string;
  title: string | null;
  alt_text: string;
  category: string;
  image_url: string;
  display_order: number;
};

function formatCategory(
  category: string
): Exclude<GalleryCategory, "All"> {
  const categoryMap: Record<
    string,
    Exclude<GalleryCategory, "All">
  > = {
    rooms: "Rooms",
    dining: "Dining",
    amenities: "Amenities",
    hotel: "Hotel",
    events: "Events",
  };

  return categoryMap[category.toLowerCase()] ?? "Hotel";
}

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .select(
      `
        id,
        title,
        alt_text,
        category,
        image_url,
        display_order
      `
    )
    .eq("is_published", true)
    .order("display_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Public gallery fetch error:",
      error
    );
  }

  const images: GalleryImage[] = (
    (data ?? []) as GalleryDatabaseRow[]
  ).map((image) => ({
    id: image.id,
    title:
      image.title?.trim() ||
      image.alt_text,
    category: formatCategory(
      image.category
    ),
    image: image.image_url,
    alt: image.alt_text,
  }));

  return (
    <main>
      <Navbar />

      <GalleryHero />

      <GalleryGrid images={images} />
    </main>
  );
}