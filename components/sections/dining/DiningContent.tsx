"use client";

import { motion } from "framer-motion";

import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/Button";

import { dining } from "@/data/dining";
import {
  diningContentContainer,
  diningFadeUp,
} from "@/lib/animations/dining";

import DiningHighlights from "./DiningHighlights";

export default function DiningContent() {
  return (
    <motion.div
      variants={diningContentContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="lg:pl-4"
    >
      <motion.div variants={diningFadeUp}>
        <Badge>{dining.badge}</Badge>
      </motion.div>

      <motion.h2
        variants={diningFadeUp}
        className="
          mt-6
          text-4xl
          font-semibold
          leading-tight
          text-[#211711]
          sm:text-5xl
          lg:text-6xl
        "
      >
        {dining.title.line1}
        <br />
        <span className="text-[var(--primary)]">
          {dining.title.line2}
        </span>
      </motion.h2>

      <motion.p
        variants={diningFadeUp}
        className="mt-6 max-w-xl text-base leading-8 text-black/60 sm:mt-8 sm:text-lg"
      >
        {dining.description}
      </motion.p>

      <motion.div variants={diningFadeUp}>
        <DiningHighlights />
      </motion.div>

      <motion.div variants={diningFadeUp} className="mt-9">
        <Button href={dining.button.href} variant="dark">
          {dining.button.text}
        </Button>
      </motion.div>
    </motion.div>
  );
}