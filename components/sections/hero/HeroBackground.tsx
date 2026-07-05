"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { heroBackgroundZoom } from "@/lib/animations/hero";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        variants={heroBackgroundZoom}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/main-image.jpg"
          alt="Luxury stay experience at Janki Elite"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}