import type { Variants } from "framer-motion";

export const roomRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(6px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const roomRevealContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

export const roomRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};