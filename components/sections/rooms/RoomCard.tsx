"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { roomCardReveal } from "@/lib/animations/rooms";

import { Room } from "./types";
import RoomFeatures from "./RoomFeatures";
import RoomPrice from "./RoomPrice";

type Props = {
  room: Room;
};

export default function RoomCard({ room }: Props) {
  return (
    <motion.article
      variants={roomCardReveal}
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-gray-100
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="group relative h-72 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-[3000ms]
            ease-out
            group-hover:scale-[1.04]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-70" />

        {room.featured && (
          <div
            className="
              absolute
              left-5
              top-5
              rounded-full
              bg-[var(--primary)]
              px-4
              py-2
              text-xs
              uppercase
              tracking-[0.2em]
              text-white
            "
          >
            Featured
          </div>
        )}
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-semibold text-gray-900">
          {room.name}
        </h3>

        <p className="mt-4 leading-7 text-gray-600">
          {room.description}
        </p>

        <RoomFeatures room={room} />

        <RoomPrice room={room} />
      </div>
    </motion.article>
  );
}