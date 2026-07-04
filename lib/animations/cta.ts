import type { Variants } from "framer-motion";

export const ctaContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

export const ctaFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
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

export const ctaCardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};