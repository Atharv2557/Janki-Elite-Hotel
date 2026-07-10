"use client";

import { useState } from "react";
import Link from "next/link";

const initialRooms = [
  {
    id: 1,
    name: "Deluxe Room",
    category: "Comfort Stay",
    price: "3500",
  },
  {
    id: 2,
    name: "Premium Room",
    category: "Luxury Stay",
    price: "4500",
  },
  {
    id: 3,
    name: "Family Suite",
    category: "Spacious Stay",
    price: "6500",
  },
 
];

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState(initialRooms);
  const [saved, setSaved] = useState(false);

  function updateRoomPrice(roomId: number, value: string) {
    setSaved(false);

    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              price: value,
            }
          : room
      )
    );
  }

  function handleSave() {
    setSaved(true);

    console.log("Updated room prices:", rooms);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#120b07] pt-8 text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:py-16">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#c89b5f]/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-[#8b5e34]/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[#d4af7a]/10 blur-[90px]" />

        <div className="relative z-10">
          <Link
  href="/admin"
  className="
    mb-8
    inline-flex
    h-12
    items-center
    justify-center
    rounded-full
    border
    border-[#d4af7a]/25
    bg-[#d4af7a]/10
    px-6
    text-xs
    font-semibold
    uppercase
    tracking-[0.24em]
    text-[#f5d7a1]
    shadow-[0_14px_50px_rgba(212,175,122,0.10)]
    backdrop-blur-xl
    transition
    duration-300
    hover:-translate-y-1
    hover:border-[#d4af7a]/55
    hover:bg-[#d4af7a]
    hover:text-[#211711]
    hover:shadow-[0_18px_70px_rgba(212,175,122,0.25)]"> ← Back to Dashboard </Link>

          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af7a]/80">
                Room Management
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Update room prices.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/55">
                Change room prices from here. In the next step, these prices
                will be connected to the actual website data and database.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="
                inline-flex
                h-13
                items-center
                justify-center
                rounded-full
                bg-[#d4af7a]
                px-8
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#211711]
                shadow-[0_18px_60px_rgba(212,175,122,0.28)]
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-[#f5d7a1]
                hover:shadow-[0_22px_80px_rgba(212,175,122,0.4)]
              "
            >
              Save Changes
            </button>
          </div>

          {saved && (
            <div className="mb-8 rounded-[22px] border border-[#d4af7a]/25 bg-[#d4af7a]/10 px-5 py-4 text-sm text-[#f5d7a1]">
              Prices saved in frontend state. Database connection will be added later.
            </div>
          )}

          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.04] px-6 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
              <div className="col-span-5">Room</div>
              <div className="col-span-3 hidden md:block">Category</div>
              <div className="col-span-7 md:col-span-4">Price / Night</div>
            </div>

            <div className="divide-y divide-white/10">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="grid grid-cols-12 items-center gap-4 px-6 py-6 transition duration-300 hover:bg-white/[0.035]"
                >
                  <div className="col-span-5">
                    <h2 className="text-lg font-medium text-white">
                      {room.name}
                    </h2>

                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#d4af7a]/60 md:hidden">
                      {room.category}
                    </p>
                  </div>

                  <div className="col-span-3 hidden text-sm text-white/45 md:block">
                    {room.category}
                  </div>

                  <div className="col-span-7 md:col-span-4">
                    <div className="flex items-center rounded-2xl border border-white/10 bg-black/20 px-4 transition focus-within:border-[#d4af7a]/60">
                      <span className="text-sm text-[#d4af7a]">₹</span>

                      <input
                        type="number"
                        value={room.price}
                        onChange={(event) =>
                          updateRoomPrice(room.id, event.target.value)
                        }
                        className="
                          h-12
                          w-full
                          bg-transparent
                          px-3
                          text-sm
                          font-medium
                          text-white
                          outline-none
                          placeholder:text-white/25
                        "
                      />

                      <span className="text-xs uppercase tracking-[0.18em] text-white/30">
                        Night
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-white/50 backdrop-blur-xl">
            <span className="font-medium text-[#f5d7a1]">Developer note:</span>{" "}
            This page currently updates prices only inside React state. After
            this UI is ready, we will connect it with your actual room data,
            database, and protected admin login.
          </div>
        </div>
      </section>
    </main>
  );
}