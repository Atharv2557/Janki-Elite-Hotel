"use client";

import { motion } from "framer-motion";

import { amenities } from "@/data/amenities";
import { amenitiesContainer } from "@/lib/animations/amenities";

import AmenityCard from "./AmenityCard";

export default function AmenitiesGrid() {
  return (
    <motion.div
      variants={amenitiesContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
    >
      {amenities.map((amenity) => (
        <AmenityCard key={amenity.id} amenity={amenity} />
      ))}
    </motion.div>
  );
}