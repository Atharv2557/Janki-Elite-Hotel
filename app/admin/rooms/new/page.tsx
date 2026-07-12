import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import RoomForm from "@/components/admin/rooms/RoomForm";

export default function NewRoomPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
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
            Add new room
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
            Add room information, pricing, images, amenities and publishing
            settings for the hotel website.
          </p>
        </div>
      </div>

      <RoomForm mode="create" />
    </div>
  );
}