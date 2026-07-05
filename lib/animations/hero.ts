import type { Variants } from "framer-motion";

export const heroContentContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

export const heroFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: "easeOut",
    },
  },
};

export const heroBackgroundZoom: Variants = {
  hidden: {
    scale: 1,
  },
  visible: {
    scale: 1.08,
    transition: {
      duration: 18,
      ease: "linear",
    },
  },
};

export const heroFeaturesContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.1,
    },
  },
};

export const heroFeatureItem: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};