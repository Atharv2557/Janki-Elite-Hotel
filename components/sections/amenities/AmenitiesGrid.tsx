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
      className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {amenities.map((amenity) => (
        <AmenityCard key={amenity.id} amenity={amenity} />
      ))}
    </motion.div>
  );
}