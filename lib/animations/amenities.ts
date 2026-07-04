import type { Variants } from "framer-motion";

export const amenitiesContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

export const amenityCardReveal: Variants = {
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