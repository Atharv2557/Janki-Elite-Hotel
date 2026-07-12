"use client";

import { useEffect } from "react";

import { Portal } from "@/components/ui/Portal";
import type { FeaturedDiningCategory } from "@/data/dining-featured-categories";
import { diningMenuCategories } from "@/data/dining-menu";

type DiningMenuOverlayProps = {
  category: FeaturedDiningCategory | null;
  onClose: () => void;
};

export default function DiningMenuOverlay({
  category,
  onClose,
}: DiningMenuOverlayProps) {
  useEffect(() => {
    if (!category) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [category, onClose]);

  if (!category) return null;

  const filteredCategories = diningMenuCategories.filter((menuCategory) =>
    category.menuCategoryIds.includes(menuCategory.id)
  );

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dining-menu-title"
        className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-md"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="dining-overlay-enter relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#2B211B] shadow-[0_50px_140px_rgba(0,0,0,0.55)]"
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-5 border-b border-white/10 px-6 py-5 sm:px-8 sm:py-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#d4af37]">
                Dining Menu
              </p>

              <h2
                id="dining-menu-title"
                className="mt-2 font-serif text-3xl text-white sm:text-4xl"
              >
                {category.title}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                {category.subtitle}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close dining menu"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition-all duration-300 hover:rotate-90 hover:border-[#d4af37] hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
            >
              ×
            </button>
          </div>

          {/* Menu content */}
          <div className="max-h-[72vh] overflow-y-auto px-6 py-6 sm:px-8">
            <div className="space-y-8">
              {filteredCategories.map((menuCategory) => (
                <section key={menuCategory.id}>
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl text-white">
                      {menuCategory.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      {menuCategory.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {menuCategory.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="group flex min-h-[72px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 text-sm font-semibold text-[#d4af37]">
                          {index + 1}
                        </span>

                        <p className="text-sm font-medium leading-6 text-white sm:text-base">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {filteredCategories.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
                  <p className="text-sm text-white/55">
                    No menu items are connected to this category yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}