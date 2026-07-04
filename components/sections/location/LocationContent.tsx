"use client";

import { motion } from "framer-motion";

import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";
import Button from "@/components/ui/Button";

import { location } from "@/data/location";
import {
  locationContentContainer,
  locationFadeUp,
} from "@/lib/animations/location";

import LocationInfo from "./LocationInfo";

export default function LocationContent() {
  return (
    <motion.div
      variants={locationContentContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={locationFadeUp}>
        <Badge>{location.badge}</Badge>
      </motion.div>

      <motion.div variants={locationFadeUp}>
        <SectionHeading
          line1={location.title.line1}
          line2={location.title.line2}
        />
      </motion.div>

      <motion.p
        variants={locationFadeUp}
        className="mt-8 max-w-xl text-lg leading-8 text-gray-600"
      >
        {location.description}
      </motion.p>

      <motion.div variants={locationFadeUp}>
        <LocationInfo />
      </motion.div>

      <motion.div variants={locationFadeUp} className="mt-10">
        <Button href={location.button.href}>
          {location.button.text}
        </Button>
      </motion.div>
    </motion.div>
  );
}