import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";
import {Reveal} from "@/components/ui/reveal/Reveal";

import { testimonials } from "@/data/testimonials";

export default function TestimonialsHeader() {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <Badge>{testimonials.badge}</Badge>

      <SectionHeading
        line1={testimonials.title.line1}
        line2={testimonials.title.line2}
        // align="center"
      />

      <p className="mx-auto mt-6 max-w-2xl px-1 text-base leading-8 text-black/60 sm:mt-8 sm:text-lg">
        {testimonials.description}
      </p>
    </Reveal>
  );
}