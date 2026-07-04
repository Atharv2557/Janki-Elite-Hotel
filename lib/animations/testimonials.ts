import type { Variants } from "framer-motion";

export const testimonialsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

export const testimonialCardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};