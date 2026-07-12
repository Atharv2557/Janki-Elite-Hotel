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
      className="relative"
    >
      <div className="absolute -right-6 -top-6 hidden h-36 w-36 rounded-full bg-[var(--primary)]/15 blur-2xl sm:block" />

      <div
        className="
          group
          home-soft-card
          relative
          rounded-[34px]
          border
          border-black/5
          bg-white
          p-3
          shadow-[0_24px_70px_rgba(0,0,0,0.10)]
        "
      >
        <div className="relative h-[420px] overflow-hidden rounded-[26px] sm:h-[520px] lg:h-[620px]">
          <iframe
            src={location.mapEmbedUrl}
            title="Janki Elite Hotel Location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="
              h-full
              w-full
              border-0
              transition-transform
              duration-[1600ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-[1.035]
            "
          />
        </div>

        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
            rounded-[24px]
            border
            border-white/20
            bg-[#211711]/80
            p-5
            text-white
            shadow-xl
            backdrop-blur-xl
            transition-transform
            duration-[1000ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:-translate-y-2
          "
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--primary)]">
            Visit Us
          </p>

          <p className="mt-2 text-lg font-semibold leading-tight sm:text-xl">
            Conveniently located for stays, events, and celebrations.
          </p>
        </div>
      </div>
    </motion.div>
  );
}