"use client";

import { motion } from "framer-motion";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import { ctaCardReveal } from "@/lib/animations/cta";
import CTAContent from "./CTAContent";

export default function CTA() {
  return (
    <Section className="bg-white">
      <Container>
        <motion.div
          variants={ctaCardReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-[#2f2118]
            px-6
            py-20
            text-center
            shadow-2xl
            md:px-12
            lg:py-28
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(176,141,87,0.28),transparent_35%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%)]" />

          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[var(--primary)]/20 blur-3xl" />

          <CTAContent />
        </motion.div>
      </Container>
    </Section>
  );
}