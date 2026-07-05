"use client";

import { motion } from "framer-motion";

import { rooms } from "@/data/rooms";
import { roomsContainer } from "@/lib/animations/rooms";

import RoomCard from "./RoomCard";

export default function RoomsGrid() {
  return (
    <motion.div
      variants={roomsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-6 sm:gap-8 lg:grid-cols-3"
    >
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </motion.div>
  );
}