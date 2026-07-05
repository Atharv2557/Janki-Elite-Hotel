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
      className="relative"
    >
      <div className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-full bg-[var(--primary)]/15 blur-2xl sm:block" />

      <div
        className="
          group
          relative
          h-[420px]
          overflow-hidden
          rounded-[34px]
          border
          border-black/5
          bg-white
          shadow-[0_24px_70px_rgba(0,0,0,0.10)]
          sm:h-[520px]
          lg:h-[620px]
        "
      >
        <Image
          src={dining.image.src}
          alt={dining.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            rounded-[24px]
            border
            border-white/15
            bg-white/12
            p-5
            text-white
            backdrop-blur-xl
            sm:bottom-6
            sm:left-6
            sm:right-6
            sm:p-6
          "
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            Dining Experience
          </p>

          <p className="mt-3 text-2xl font-semibold leading-tight">
            Fresh Meals, Elegant Ambience
          </p>
        </div>
      </div>
    </motion.div>
  );
}