"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { roomCardReveal } from "@/lib/animations/rooms";
import type { Room } from "./types";

import RoomFeatures from "./RoomFeatures";
import RoomPrice from "./RoomPrice";

type RoomCardProps = {
  room: Room;
};

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <motion.article
      variants={roomCardReveal}
      className="
        group
        overflow-hidden
        rounded-[32px]
        border
        border-black/5
        bg-white
        shadow-[0_18px_50px_rgba(0,0,0,0.06)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
      "
    >
      <div className="relative h-[280px] overflow-hidden sm:h-[320px] lg:h-[300px]">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />

        {room.featured && (
          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
            Featured
          </div>
        )}
      </div>

      <div className="p-6 sm:p-7">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold leading-tight text-[#211711]">
            {room.name}
          </h3>

          <p className="mt-4 text-base leading-7 text-black/60">
            {room.description}
          </p>
        </div>

        <RoomFeatures room={room} />
        <RoomPrice room={room} />
      </div>
    </motion.article>
  );
}