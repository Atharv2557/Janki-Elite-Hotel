"use client";

import { testimonials } from "@/data/testimonials";

import TestimonialCard from "./TestimonialCard";

export default function TestimonialsMarquee() {
  const repeatedTestimonials = [
    ...testimonials.reviews,
    ...testimonials.reviews,
  ];

  return (
    <div className="relative mt-14 overflow-hidden sm:mt-16 lg:mt-20">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-32" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-32" />

      <div className="flex w-max animate-testimonial-marquee gap-5 px-5 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8">
        {repeatedTestimonials.map((review, index) => (
          <TestimonialCard
            key={`${review.name}-${index}`}
            review={review}
          />
        ))}
      </div>
    </div>
  );
}