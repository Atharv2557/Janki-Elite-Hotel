import type { Variants } from "framer-motion";

export const diningImageReveal: Variants = {
  hidden: {
    opacity: 0,
    x: -45,
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

export const diningContentContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

export const diningFadeUp: Variants = {
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