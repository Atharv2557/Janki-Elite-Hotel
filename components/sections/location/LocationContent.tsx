"use client";

import { motion } from "framer-motion";

import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/Button";
import { useContactSettings } from "@/components/providers/ContactSettingsProvider";

import { location } from "@/data/location";
import {
  locationContentContainer,
  locationFadeUp,
} from "@/lib/animations/location";

import LocationInfo from "./LocationInfo";

export default function LocationContent() {
  const { mapUrl } = useContactSettings();

  return (
    <motion.div
      variants={locationContentContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={locationFadeUp}>
        <Badge>{location.badge}</Badge>
      </motion.div>

      <motion.h2
        variants={locationFadeUp}
        className="
          mt-6
          text-4xl
          font-semibold
          leading-tight
          text-[#211711]
          sm:text-5xl
          lg:text-6xl
        "
      >
        {location.title.line1}
        <br />
        <span className="text-[var(--primary)]">
          {location.title.line2}
        </span>
      </motion.h2>

      <motion.p
        variants={locationFadeUp}
        className="mt-6 max-w-xl text-base leading-8 text-black/60 sm:mt-8 sm:text-lg"
      >
        {location.description}
      </motion.p>

      <motion.div variants={locationFadeUp}>
        <LocationInfo />
      </motion.div>

      {mapUrl && (
        <motion.div
          variants={locationFadeUp}
          className="mt-9"
        >
          <Button
            href={mapUrl}
            variant="dark"
          >
            {location.button.text}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}