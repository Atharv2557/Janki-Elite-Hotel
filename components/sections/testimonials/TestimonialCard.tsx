import { Quote } from "lucide-react";

import type { Testimonial } from "./types";
import RatingStars from "./RatingStars";

type TestimonialCardProps = {
  review: Testimonial;
};

export default function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <article
      className="
        relative
        w-[320px]
        shrink-0
        overflow-hidden
        rounded-[30px]
        border
        border-black/5
        bg-white
        p-6
        shadow-[0_18px_50px_rgba(0,0,0,0.06)]
        sm:w-[380px]
        sm:p-7
        lg:w-[420px]
        lg:p-8
      "
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--primary)]/10 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <RatingStars rating={review.rating} />

          <Quote
            size={34}
            className="shrink-0 text-[var(--primary)]/30"
          />
        </div>

        <p className="min-h-[140px] text-base leading-8 text-black/65">
          “{review.review}”
        </p>

        <div className="mt-8 border-t border-black/10 pt-5">
          <h3 className="text-xl font-semibold text-[#211711]">
            {review.name}
          </h3>

          <p className="mt-1 text-sm text-black/45">
            {review.location}
          </p>
        </div>
      </div>
    </article>
  );
}