"use client";

import { motion } from "framer-motion";

import { heroContent } from "@/data/hero";
import {
  heroFeatureItem,
  heroFeaturesContainer,
} from "@/lib/animations/hero";

export default function HeroFeatures() {
  return (
    <div className="absolute bottom-0 left-0 z-30 hidden w-full px-8 pb-5 lg:block">
      <motion.div
        variants={heroFeaturesContainer}
        initial="hidden"
        animate="visible"
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          gap-4
          rounded-full
          border
          border-white/15
          bg-white/10
          px-8
          py-4
          text-center
          backdrop-blur-xl
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
              px-4
              py-2
              text-[11px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/85
            "
          >
            {feature}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}