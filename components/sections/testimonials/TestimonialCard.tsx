"use client";

import { motion } from "framer-motion";

import type { Testimonial } from "./types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <motion.article className="rounded-3xl border border-black/5 bg-white p-8">
      <div className="mb-5 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>

      <p className="leading-7 text-black/60">
        {testimonial.review}
      </p>

      <div className="mt-6">
        <h3 className="font-semibold text-[#211711]">
          {testimonial.name}
        </h3>

        <p className="mt-1 text-sm text-black/50">
          {testimonial.location}
        </p>
      </div>
    </motion.article>
  );
}