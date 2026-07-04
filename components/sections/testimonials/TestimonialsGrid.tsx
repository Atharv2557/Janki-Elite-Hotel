"use client";

import { motion } from "framer-motion";

import { testimonials } from "@/data/testimonials";
import { testimonialsContainer } from "@/lib/animations/testimonials";

import TestimonialCard from "./TestimonialCard";

export default function TestimonialsGrid() {
  return (
    <motion.div
      variants={testimonialsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {testimonials.reviews.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
        />
      ))}
    </motion.div>
  );
}