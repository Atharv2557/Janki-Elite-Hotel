"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

import { galleryCardReveal } from "@/lib/animations/gallery";
import type { GalleryImage } from "./types";

type Props = {
  image: GalleryImage;
  large?: boolean;
};

export default function GalleryCard({ image, large = false }: Props) {
  return (
    <motion.article
      variants={galleryCardReveal}
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        shadow-lg
        ${large ? "md:col-span-2 md:row-span-2" : ""}
      `}
    >
      <div className={large ? "relative h-[520px]" : "relative h-[250px]"}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={
            large
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="
            object-cover
            transition-transform
            duration-[3000ms]
            ease-out
            group-hover:scale-[1.04]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        <div
          className="
            absolute
            right-5
            top-5
            flex
            h-11
            w-11
            translate-y-2
            items-center
            justify-center
            rounded-full
            bg-white/15
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
          aria-hidden="true"
        >
          <Eye size={18} />
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)]">
            {image.category}
          </p>

          <h3 className="mt-2 max-h-[68px] overflow-hidden text-2xl font-semibold text-white">
            {image.alt}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}