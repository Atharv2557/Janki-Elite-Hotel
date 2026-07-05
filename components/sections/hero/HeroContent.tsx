"use client";

import { motion } from "framer-motion";

import Container from "@/components/ui/Container";
import Badge from "@/components/ui/badge/Badge";

import { heroContent } from "@/data/hero";
import {
  heroContentContainer,
  heroFadeUp,
} from "@/lib/animations/hero";

import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
   <Container>
  <div className="relative z-20 flex min-h-screen items-center px-0 pb-44 pt-32 sm:pt-36 lg:pb-40">
        <motion.div
          variants={heroContentContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={heroFadeUp}>
            <Badge light>{heroContent.badge}</Badge>
          </motion.div>

          <motion.h1
            variants={heroFadeUp}
        className="
  mt-8
  max-w-4xl
  text-5xl
  font-semibold
  leading-tight
  text-white
  md:text-6xl
  lg:text-7xl
"
          >
            {heroContent.title.line1}
            <br />
            <span className="italic text-(--primary)">
              {heroContent.title.line2}
            </span>
          </motion.h1>

          <motion.p
            variants={heroFadeUp}
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-white/75
              md:text-xl
            "
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div variants={heroFadeUp}>
            <HeroButtons />
          </motion.div>
        </motion.div>
      </div>
    </Container>
  );
}