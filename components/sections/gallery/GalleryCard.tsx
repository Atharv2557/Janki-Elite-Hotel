"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

import { galleryCardReveal } from "@/lib/animations/gallery";
import type { GalleryImage } from "./types";

type GalleryCardProps = {
  image: GalleryImage;
};

export default function GalleryCard({ image }: GalleryCardProps) {
  return (
    <motion.article
      variants={galleryCardReveal}
      className="
        group
        home-premium-card
        relative
        h-[300px]
        rounded-[30px]
        border
        border-black/5
        bg-black
        shadow-[0_18px_50px_rgba(0,0,0,0.08)]
        sm:h-[340px]
        lg:h-[380px]
      "
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="home-premium-image"
      />

      <div className="home-premium-overlay absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <div
        className="
          absolute
          left-5
          top-5
          rounded-full
          border
          border-white/20
          bg-white/12
          px-4
          py-2
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-white
          backdrop-blur-md
        "
      >
        {image.category}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* <div
          className="
            home-premium-icon
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-white/15
            text-white
            shadow-[0_18px_50px_rgba(0,0,0,0.25)]
            backdrop-blur-xl
          "
        >
          <Eye size={22}   />
        </div> */}
      </div>

      <div className="home-premium-content absolute bottom-5 left-5 right-5">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/70">
          Janki Elite
        </p>

        <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
          {image.alt}
        </h3>
      </div>
    </motion.article>
  );
}