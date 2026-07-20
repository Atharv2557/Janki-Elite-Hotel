"use client";

import { motion } from "framer-motion";

import { heroContent } from "@/data/hero";
import {
  heroFeatureItem,
  heroFeaturesContainer,
} from "@/lib/animations/hero";

export default function HeroFeatures() {
  return (
    <div className="absolute bottom-0 left-0 z-30 w-full px-4 pb-4 sm:px-6 sm:pb-5 lg:px-8">
      <motion.div
        variants={heroFeaturesContainer}
        initial="hidden"
        animate="visible"
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-2
          gap-2
          rounded-[26px]
          border
          border-white/15
          bg-white/10
          p-3
          text-center
          backdrop-blur-xl
          sm:gap-3
          sm:rounded-[30px]
          sm:p-4
          lg:grid-cols-4
          lg:rounded-full
          lg:px-6
          lg:py-4
        "
      >
        {heroContent.features.map((feature) => (
          <motion.div
            key={feature}
            variants={heroFeatureItem}
            className="
              rounded-full
              border
              border-white/10
              bg-black/10
              px-3
              py-2
              text-[9px]
              font-semibold
              uppercase
              leading-none
              tracking-[0.16em]
              text-white/85
              sm:px-4
              sm:text-[10px]
              sm:tracking-[0.2em]
              lg:text-[11px]
              lg:tracking-[0.22em]
            "
          >
            {feature}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}