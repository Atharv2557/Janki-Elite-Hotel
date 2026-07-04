"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { dining } from "@/data/dining";
import { diningImageReveal } from "@/lib/animations/dining";

export default function DiningImage() {
  return (
    <motion.div
      variants={diningImageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="
        group
        relative
        h-[620px]
        overflow-hidden
        rounded-[32px]
        shadow-2xl
      "
    >
      <Image
        src={dining.image.src}
        alt={dining.image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="
          object-cover
          transition-transform
          duration-[3000ms]
          ease-out
          group-hover:scale-[1.03]
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </motion.div>
  );
}