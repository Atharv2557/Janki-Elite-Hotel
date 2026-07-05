"use client";

import { motion, useReducedMotion } from "framer-motion";

type RoomRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function RoomReveal({
  children,
  delay = 0,
  className = "",
}: RoomRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 26,
        filter: "blur(5px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.24,
      }}
      transition={{
        duration: 1.05,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </motion.div>
  );
}