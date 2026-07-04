"use client";

import { motion } from "framer-motion";

import { location } from "@/data/location";
import { locationMapReveal } from "@/lib/animations/location";

export default function LocationMap() {
  return (
    <motion.div
      variants={locationMapReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-black/5
        bg-white
        p-3
        shadow-2xl
      "
    >
      <div className="relative h-[560px] overflow-hidden rounded-[24px]">
        <iframe
          src={location.mapEmbedUrl}
          title="Janki Elite Google Map Location"
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
}