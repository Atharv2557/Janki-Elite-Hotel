"use client";

import { motion } from "framer-motion";

import { amenityCardReveal } from "@/lib/animations/amenities";
import type { Amenity } from "./types";

type AmenityCardProps = {
  amenity: Amenity;
};

export default function AmenityCard({ amenity }: AmenityCardProps) {
  const Icon = amenity.icon;

  return (
    <motion.article
      variants={amenityCardReveal}
      className="
        group
        premium-soft-card
        relative
        overflow-hidden
        border
        border-black/5
        bg-[#f8f5ef]
        p-6
        sm:p-7
        lg:p-8
      "
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary)]/10 blur-2xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-150" />

      <div className="relative z-10">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[var(--primary)]/10
            text-[var(--primary)]
            transition-all
            duration-[900ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:bg-[var(--primary)]
            group-hover:text-white
          "
        >
          <Icon size={26} strokeWidth={1.8} />
        </div>

        <h3 className="mt-7 text-2xl font-semibold leading-tight text-[#211711]">
          {amenity.title}
        </h3>

        <p className="mt-4 text-base leading-7 text-black/60">
          {amenity.description}
        </p>
      </div>
    </motion.article>
  );
}