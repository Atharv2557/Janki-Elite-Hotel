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
        relative
        h-[300px]
        overflow-hidden
        rounded-[30px]
        border
        border-black/5
        bg-black
        shadow-[0_18px_50px_rgba(0,0,0,0.08)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.14)]
        sm:h-[340px]
        lg:h-[380px]
      "
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="
          object-cover
          transition-transform
          duration-[1700ms]
          ease-out
          group-hover:scale-110
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />

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

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/15
            text-white
            backdrop-blur-xl
          "
        >
          <Eye size={22} />
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5">
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