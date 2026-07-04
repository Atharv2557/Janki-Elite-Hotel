"use client";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
} from "@/lib/animations/hero";

import { heroContent } from "@/data/hero";
import Container from "@/components/ui/Container";
import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (

    <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
    <Container>
      <div className="relative z-20 flex min-h-screen items-center">
        <div className="max-w-2xl">

          {/* Badge */}

<motion.span
  variants={fadeUp}
  className="
    inline-flex
    items-center
    rounded-full
    border
    border-white/20
    bg-white/10
    backdrop-blur-md
    px-5
    py-2
    text-xs
    uppercase
    tracking-[0.25em]
    text-[var(--primary)]
  "
>
  {heroContent.badge}
</motion.span>

          {/* Heading */}

       <motion.h1
  variants={fadeUp}
  className="
    mt-8
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
  {heroContent.title.line2}
</motion.h1>

          {/* Subtitle */}

        <motion.p
  variants={fadeUp}
  className="
    mt-8
    max-w-xl
    text-lg
    leading-8
    text-white/80
  "
>
  {heroContent.subtitle}
</motion.p>
          {/* CTA */}

         <motion.div variants={fadeUp}>
  <HeroButtons />
</motion.div>

        </div>
      </div>
    </Container>
    </motion.div>
  );
}