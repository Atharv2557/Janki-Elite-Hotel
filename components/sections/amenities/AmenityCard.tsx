"use client";

import { motion } from "framer-motion";

import { amenityCardReveal } from "@/lib/animations/amenities";
import type { Amenity } from "./types";

type Props = {
  amenity: Amenity;
};

export default function AmenityCard({ amenity }: Props) {
  const Icon = amenity.icon;

  return (
    <motion.article
      variants={amenityCardReveal}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-black/5
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[var(--primary)]/5 transition-all duration-500 group-hover:bg-[var(--primary)]/10" />

      <div
        className="
          relative
          z-10
          mb-8
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-[var(--primary)]/10
          text-[var(--primary)]
          transition-all
          duration-500
          group-hover:bg-[var(--primary)]
          group-hover:text-white
        "
      >
        <Icon size={30} strokeWidth={1.8} />
      </div>

      <h3 className="relative z-10 text-2xl font-semibold text-gray-900">
        {amenity.title}
      </h3>

      <p className="relative z-10 mt-4 leading-7 text-gray-600">
        {amenity.description}
      </p>
    </motion.article>
  );
}