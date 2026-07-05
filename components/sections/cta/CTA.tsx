"use client";

import { motion } from "framer-motion";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import { ctaCardReveal } from "@/lib/animations/cta";
import CTAContent from "./CTAContent";

export default function CTA() {
  return (
    <Section className="bg-[var(--background)] pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <motion.div
          variants={ctaCardReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="
            relative
            overflow-hidden
            rounded-[34px]
            bg-[#211711]
            px-6
            py-16
            text-center
            shadow-[0_28px_90px_rgba(0,0,0,0.18)]
            sm:rounded-[40px]
            sm:px-10
            sm:py-20
            lg:px-16
            lg:py-28
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(176,141,87,0.28),transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.09),transparent_34%)]" />
          <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--primary)]/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <CTAContent />
        </motion.div>
      </Container>
    </Section>
  );
}