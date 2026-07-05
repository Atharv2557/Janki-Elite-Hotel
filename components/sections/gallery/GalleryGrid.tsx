"use client";

import { motion } from "framer-motion";

import { gallery } from "@/data/gallery";
import { galleryContainer } from "@/lib/animations/gallery";

import GalleryCard from "./GalleryCard";

export default function GalleryGrid() {
  return (
    <motion.div
      variants={galleryContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="
        grid
        gap-5
        sm:grid-cols-2
        sm:gap-6
        lg:grid-cols-3
        lg:gap-8
      "
    >
      {gallery.images.slice(0, 6).map((image) => (
        <GalleryCard key={image.id} image={image} />
      ))}
    </motion.div>
  );
}