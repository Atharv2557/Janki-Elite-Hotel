import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import RoomForm from "@/components/admin/rooms/RoomForm";
import { createClient } from "@/lib/supabase/server";
import type { RoomFormValues } from "@/lib/validations/room";

type EditRoomPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type RoomDatabaseRow = {
  id: string;
  title: string;
  slug: string;
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

export default async function EditRoomPage({
  params,
}: EditRoomPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
        id,
        title,
        slug,
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
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Room fetch error:", error);
  }

  if (error || !data) {
    notFound();
  }

  const room = data as RoomDatabaseRow;

  const initialValues: RoomFormValues = {
    title: room.title,
    slug: room.slug,
    shortDescription:
      room.short_description ?? "",
    description: room.description ?? "",
    pricePerNight: Number(
      room.price_per_night
    ),
    capacity: room.capacity,
    roomSize: room.room_size ?? "",
    heroImage: room.hero_image ?? "",
    galleryImages:
      room.gallery_images ?? [],
    amenities: room.amenities ?? [],
    isFeatured: room.is_featured,
    isPublished: room.is_published,
    displayOrder: room.display_order,
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/rooms"
          className="mb-4 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-[#b9945a]"
        >
          <ArrowLeft size={16} />
          Back to rooms
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
          Room Management
        </p>

        <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          Edit room
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
          Update the details, pricing, images,
          amenities and visibility of{" "}
          <span className="text-white/70">
            {room.title}
          </span>
          .
        </p>
      </div>

      <RoomForm
        mode="edit"
        roomId={room.id}
        initialValues={initialValues}
      />
    </div>
  );
}