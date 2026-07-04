import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";

import { testimonials } from "@/data/testimonials";

export default function TestimonialsHeader() {
  return (
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <Badge>{testimonials.badge}</Badge>

      <SectionHeading
        line1={testimonials.title.line1}
        line2={testimonials.title.line2}
      />

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
        {testimonials.description}
      </p>
    </div>
  );
}