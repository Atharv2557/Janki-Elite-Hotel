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
      viewport={{ once: true, amount: 0.15 }}
      className="grid auto-rows-auto gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      {gallery.images.map((image, index) => (
        <GalleryCard
          key={image.id}
          image={image}
          large={index === 0}
        />
      ))}
    </motion.div>
  );
}