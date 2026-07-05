"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";

import { createWhatsAppUrl } from "@/lib/utils/whatsapp";
import { roomPageData, type RoomPageItem } from "@/data/room-page";
import { RoomReveal } from "./RoomReveal";
import { RoomDetailOverlay } from "./RoomDetailOverlay";

const roomContentContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const roomContentItem: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
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

export function RoomShowcase() {
  const [selectedRoom, setSelectedRoom] = useState<RoomPageItem | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenRoom = (room: RoomPageItem) => {
    setSelectedRoom(room);
    setIsOverlayOpen(true);
  };

  const handleCloseRoom = () => {
    setIsOverlayOpen(false);

    setTimeout(() => {
      setSelectedRoom(null);
    }, 250);
  };

  return (
    <>
      <section id="rooms" className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <RoomReveal delay={0.08}>
            <div className="mx-auto mb-20 max-w-3xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#9b7534]">
                Our Rooms
              </p>

              <h2 className="font-serif text-4xl font-light leading-tight text-[#241a14] sm:text-5xl lg:text-6xl">
                Suites crafted for{" "}
                <span className="italic text-[#9b7534]">
                  slow, elegant stays.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6f6257]">
                Choose from thoughtfully designed rooms with premium comfort,
                warm interiors, and a peaceful atmosphere made for relaxation.
              </p>
            </div>
          </RoomReveal>

          <div className="space-y-24 lg:space-y-32">
            {roomPageData.map((room, index) => {
              const isReverse = index % 2 === 1;

              const bookingUrl = createWhatsAppUrl({
                roomTitle: room.title,
                price: room.price,
                intent: "book",
              });

              return (
                <article
                  key={room.id}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Image */}
                  <RoomReveal
                    delay={0.12}
                    className={isReverse ? "lg:order-2" : ""}
                  >
                    <div className="group relative h-[380px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(36,26,20,0.18)] sm:h-[500px] lg:h-[560px]">
                      <Image
                        src={room.coverImage}
                        alt={room.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-[1200ms] ease-out group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />

                      <div className="absolute bottom-5 left-5 rounded-full bg-white/85 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#241a14] backdrop-blur-md">
                        {room.subtitle}
                      </div>
                    </div>
                  </RoomReveal>

                  {/* Content */}
                  <RoomReveal
                    delay={0.24}
                    className={isReverse ? "lg:order-1" : ""}
                  >
                    <motion.div
                      variants={roomContentContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.28 }}
                      className="relative"
                    >
                      <motion.div
                        variants={roomContentItem}
                        className="mb-6 h-px w-20 bg-[#9b7534]"
                      />

                      <motion.p
                        variants={roomContentItem}
                        className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#9b7534]"
                      >
                        {room.subtitle}
                      </motion.p>

                      <motion.h3
                        variants={roomContentItem}
                        className="font-serif text-4xl font-light leading-tight text-[#241a14] sm:text-5xl"
                      >
                        {room.title}
                      </motion.h3>

                      <motion.p
                        variants={roomContentItem}
                        className="mt-6 max-w-xl text-base leading-8 text-[#6f6257]"
                      >
                        {room.shortDescription}
                      </motion.p>

                      <motion.div
                        variants={roomContentItem}
                        className="mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 border-y border-[#241a14]/10 py-7 sm:grid-cols-2"
                      >
                        {room.features.slice(0, 4).map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#3b3028]"
                          >
                            <span className="h-px w-5 bg-[#9b7534]" />
                            {feature.title}
                          </div>
                        ))}
                      </motion.div>

                      <motion.p
                        variants={roomContentItem}
                        className="mt-7 text-sm font-semibold uppercase tracking-[0.25em] text-[#9b7534]"
                      >
                        {room.price}
                      </motion.p>

                      <motion.div
                        variants={roomContentItem}
                        className="mt-8 flex flex-col gap-4 sm:flex-row"
                      >
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Book ${room.title} on WhatsApp`}
                          className="inline-flex items-center justify-center rounded-full bg-[#241a14] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#9b7534]"
                        >
                          Book Now
                        </a>

                        <button
                          type="button"
                          onClick={() => handleOpenRoom(room)}
                          className="inline-flex items-center justify-center rounded-full border border-[#241a14]/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#241a14] transition duration-300 hover:-translate-y-1 hover:border-[#9b7534] hover:bg-[#eadcc6]"
                        >
                          View Details
                        </button>
                      </motion.div>
                    </motion.div>
                  </RoomReveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <RoomDetailOverlay
        room={selectedRoom}
        isOpen={isOverlayOpen}
        onClose={handleCloseRoom}
      />
    </>
  );
}