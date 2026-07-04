"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

import { testimonialCardReveal } from "@/lib/animations/testimonials";

import type { Testimonial } from "./types";
import RatingStars from "./RatingStars";

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <motion.article
      variants={testimonialCardReveal}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-black/5
        bg-[#f8f5ef]
        p-8
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <Quote
        size={90}
        className="
          absolute
          right-6
          top-6
          text-[var(--primary)]/10
          transition-transform
          duration-500
          group-hover:scale-110
        "
        aria-hidden="true"
      />

      <div className="relative z-10">
        <RatingStars rating={testimonial.rating} />

        <p className="mt-6 text-lg leading-8 text-gray-700">
          “{testimonial.review}”
        </p>

        <div className="mt-8 border-t border-black/10 pt-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {testimonial.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {testimonial.location}
          </p>
        </div>
      </div>
    </motion.article>
  );
}