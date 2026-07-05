"use client";

import { motion } from "framer-motion";

import Badge from "@/components/ui/badge/Badge";
import { cta } from "@/data/cta";
import { ctaContainer, ctaFadeUp } from "@/lib/animations/cta";

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
      <motion.div variants={ctaFadeUp}>
        <Badge light>{cta.badge}</Badge>
      </motion.div>

      <motion.h2
        variants={ctaFadeUp}
        className="
          mt-7
          text-4xl
          font-semibold
          leading-tight
          text-white
          sm:text-5xl
          lg:text-6xl
        "
      >
        {cta.title.line1}
        <br />
        <span className="text-[var(--primary)]">
          {cta.title.line2}
        </span>
      </motion.h2>

      <motion.p
        variants={ctaFadeUp}
        className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:mt-8 sm:text-lg"
      >
        {cta.description}
      </motion.p>

      <motion.div variants={ctaFadeUp}>
        <CTAButtons />
      </motion.div>
    </motion.div>
  );
}