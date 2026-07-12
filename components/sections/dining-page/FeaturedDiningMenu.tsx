"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import {
  featuredDiningCategories,
  type FeaturedDiningCategory,
} from "@/data/dining-featured-categories";

import DiningMenuOverlay from "./DiningMenuOverlay";

export default function FeaturedDiningMenu() {
  const [activeCategory, setActiveCategory] =
    useState<FeaturedDiningCategory | null>(null);

  const handleOpenMenu = useCallback(
    (category: FeaturedDiningCategory) => {
      setActiveCategory(category);
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setActiveCategory(null);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#fbf7f0] px-5 py-20 text-[#211711] sm:px-8 lg:px-20 lg:py-2">
        <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-[#c8a45d]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#b58a2a]">
              Curated Dining
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
              Explore Our Signature Menus
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#66584e]">
              Select a cuisine to view its complete menu.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDiningCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleOpenMenu(category)}
                className="
                  dining-premium-card
                  group
                  relative
                  min-h-[310px]
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/20
                  bg-white
                  text-left
                  shadow-[0_18px_50px_rgba(33,23,17,0.12)]
                "
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="dining-premium-image"
                />

                <div className="dining-premium-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                  <h3 className="font-serif text-2xl leading-tight text-white">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/80">
                    {category.subtitle}
                  </p>

                  <div
                    className="
                      mt-5
                      inline-flex
                      translate-y-0
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/25
                      bg-black/50
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-white
                      opacity-100
                      backdrop-blur-md

                      transition-all
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      md:translate-y-3
                      md:opacity-0

                      md:group-hover:translate-y-0
                      md:group-hover:opacity-100

                      md:group-focus-visible:translate-y-0
                      md:group-focus-visible:opacity-100
                    "
                  >
                    View Menu

                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DiningMenuOverlay
        category={activeCategory}
        onClose={handleCloseMenu}
      />
    </>
  );
}