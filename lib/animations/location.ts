import type { Variants } from "framer-motion";

export const locationContentContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

export const locationFadeUp: Variants = {
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

export const locationMapReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};