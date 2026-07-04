"use client";

import { motion } from "framer-motion";

import { cta } from "@/data/cta";
import {
  ctaContainer,
  ctaFadeUp,
} from "@/lib/animations/cta";

import CTAButtons from "./CTAButtons";

export default function CTAContent() {
  return (
    <motion.div
      variants={ctaContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="relative z-10 mx-auto max-w-3xl"
    >
      <motion.span
        variants={ctaFadeUp}
        className="
          inline-flex
          rounded-full
          border
          border-white/20
          bg-white/10
          px-5
          py-2
          text-xs
          font-medium
          uppercase
          tracking-[0.3em]
          text-[var(--primary)]
          backdrop-blur-md
        "
      >
        {cta.badge}
      </motion.span>

      <motion.h2
        variants={ctaFadeUp}
        className="
          mt-8
          text-4xl
          font-semibold
          leading-tight
          text-white
          md:text-5xl
          lg:text-6xl
        "
      >
        {cta.title.line1}
        <br />
        {cta.title.line2}
      </motion.h2>

      <motion.p
        variants={ctaFadeUp}
        className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/75"
      >
        {cta.description}
      </motion.p>

      <motion.div variants={ctaFadeUp}>
        <CTAButtons />
      </motion.div>
    </motion.div>
  );
}