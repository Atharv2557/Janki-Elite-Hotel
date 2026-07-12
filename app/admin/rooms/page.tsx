import Link from "next/link";

import DeleteRoomButton from "@/components/admin/rooms/DeleteRoomButton";

import type { ReactNode } from "react";

import {
  BedDouble,
  Eye,
  EyeOff,
  Plus,
  Star,
  Users,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

type RoomRow = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  price_per_night: number | string;
  capacity: number;
  room_size: string | null;
  hero_image: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
};

export default async function AdminRoomsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
        id,
        title,
        slug,
        short_description,
        price_per_night,
        capacity,
        room_size,
        hero_image,
        is_featured,
        is_published,
        display_order,
        created_at
      `
    )
    .order("display_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  const rooms = (data ?? []) as RoomRow[];

  if (error) {
    console.error("Rooms fetch error:", error);
  }

  const publishedRooms = rooms.filter(
    (room) => room.is_published
  ).length;

  const featuredRooms = rooms.filter(
    (room) => room.is_featured
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
            Room Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
            Rooms
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
            Create, update and control which rooms are displayed on the hotel
            website.
          </p>
        </div>

        <Link
          href="/admin/rooms/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b9945a] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:-translate-y-0.5 hover:bg-[#c7a46d]"
        >
          <Plus size={17} />
          Add new room
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-400/20 bg-red-400/[0.08] px-5 py-4 text-sm text-red-300"
        >
          Unable to load rooms. Please refresh the page and try again.
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total rooms"
          value={rooms.length}
          icon={<BedDouble size={19} />}
        />

        <StatCard
          label="Published"
          value={publishedRooms}
          icon={<Eye size={19} />}
        />

        <StatCard
          label="Featured"
          value={featuredRooms}
          icon={<Star size={19} />}
        />
      </section>

      {rooms.length === 0 && !error ? (
        <EmptyRoomsState />
      ) : (
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.025] text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Room
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Price
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Capacity
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Order
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b border-white/[0.07] transition last:border-b-0 hover:bg-white/[0.025]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/20">
                          {room.hero_image ? (
                            <img
                              src={room.hero_image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <BedDouble
                              size={20}
                              className="text-white/25"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-white/85">
                              {room.title}
                            </p>

                            {room.is_featured && (
                              <Star
                                size={14}
                                className="shrink-0 fill-[#b9945a] text-[#b9945a]"
                              />
                            )}
                          </div>

                          <p className="mt-1 truncate text-xs text-white/30">
                            /rooms/{room.slug}
                          </p>

                          {room.room_size && (
                            <p className="mt-1 text-xs text-white/35">
                              {room.room_size}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-white/80">
                        ₹
                        {Number(
                          room.price_per_night
                        ).toLocaleString("en-IN")}
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        per night
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 text-sm text-white/60">
                        <Users size={16} />
                        {room.capacity} guests
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {room.is_published ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-300">
                          <Eye size={13} />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/40">
                          <EyeOff size={13} />
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm text-white/50">
                        {room.display_order}
                      </span>
                    </td>

                   <td className="px-6 py-5">
  <div className="flex items-center justify-end gap-2">
    <Link
      href={`/admin/rooms/${room.id}/edit`}
      className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/55 transition hover:border-[#b9945a]/40 hover:bg-[#b9945a]/10 hover:text-[#c7a46d]"
    >
      Edit room
    </Link>

    <DeleteRoomButton
      roomId={room.id}
      roomTitle={room.title}
    />
  </div>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
icon: ReactNode;
};

function StatCard({
  label,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm text-white/35">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold text-white">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#b9945a]/20 bg-[#b9945a]/10 text-[#c7a46d]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function EmptyRoomsState() {
  return (
    <section className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#b9945a]">
        <BedDouble size={24} />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        No rooms found
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
        Add your first room to start managing room details, pricing and
        publishing.
      </p>

      <Link
        href="/admin/rooms/new"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#b9945a] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#c7a46d]"
      >
        <Plus size={17} />
        Add first room
      </Link>
    </section>
  );
}