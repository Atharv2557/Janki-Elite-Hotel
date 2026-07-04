"use client";

import { motion } from "framer-motion";

import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";
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
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={diningFadeUp}>
        <Badge>{dining.badge}</Badge>
      </motion.div>

      <motion.div variants={diningFadeUp}>
        <SectionHeading
          line1={dining.title.line1}
          line2={dining.title.line2}
        />
      </motion.div>

      <motion.p
        variants={diningFadeUp}
        className="mt-8 max-w-xl text-lg leading-8 text-gray-600"
      >
        {dining.description}
      </motion.p>

      <motion.div variants={diningFadeUp}>
        <DiningHighlights />
      </motion.div>

      <motion.div variants={diningFadeUp} className="mt-10">
        <Button href={dining.button.href}>
          {dining.button.text}
        </Button>
      </motion.div>
    </motion.div>
  );
}