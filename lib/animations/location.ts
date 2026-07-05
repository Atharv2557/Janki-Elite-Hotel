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
    y: 32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

export const locationMapReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 45,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: "easeOut",
    },
  },
};