"use client";

import { useEffect } from "react";

import { Portal } from "@/components/ui/Portal";
import { breakfastCpPlan } from "@/data/breakfast-cp-plan";
import { lunchDinnerPlan } from "@/data/lunch-dinner-plan";

export type MealPlanType = "breakfast" | "lunch";

type MealPlanOverlayProps = {
  activePlan: MealPlanType | null;
  roomTitle: string;
  onClose: () => void;
};

export function MealPlanOverlay({
  activePlan,
  roomTitle,
  onClose,
}: MealPlanOverlayProps) {
  useEffect(() => {
    if (!activePlan) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePlan, onClose]);

  if (!activePlan) return null;

  const isBreakfast = activePlan === "breakfast";

  const title = isBreakfast
    ? "Complimentary Breakfast"
    : "Complimentary Lunch / Dinner";

  const subtitle = isBreakfast
    ? `Breakfast included with your ${roomTitle}.`
    : `Fixed meal included with your ${roomTitle}.`;

  const items = isBreakfast
    ? breakfastCpPlan.items
    : lunchDinnerPlan.items;

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="meal-plan-title"
        className="
          fixed inset-0 z-[1200]
          flex items-center justify-center
          bg-black/60 px-4 py-6
          backdrop-blur-md
        "
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="
            meal-plan-overlay-enter
            relative w-full max-w-2xl
            overflow-hidden rounded-[28px]
            border border-white/10
            bg-[#2B211B]
            shadow-[0_40px_120px_rgba(0,0,0,0.55)]
          "
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-5 border-b border-white/10 px-6 py-5 sm:px-8 sm:py-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                Complimentary
              </p>

              <h2
                id="meal-plan-title"
                className="mt-2 font-serif text-3xl text-white sm:text-4xl"
              >
                {title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/60">
                {subtitle}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close meal plan"
              onClick={onClose}
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-full border border-white/15
                bg-white/5 text-xl text-white
                transition-all duration-300
                hover:rotate-90 hover:border-[#d4af37]
                hover:bg-[#d4af37]/10 hover:text-[#d4af37]
              "
            >
              ×
            </button>
          </div>

          {/* List */}
          <div className="max-h-[65vh] overflow-y-auto px-6 py-6 sm:px-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="
                    flex items-center gap-4 rounded-2xl
                    border border-white/10
                    bg-white/[0.05] p-4
                    transition-all duration-300
                    hover:border-[#d4af37]/50
                    hover:bg-[#d4af37]/10
                  "
                >
                  <span
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full border border-[#d4af37]/35
                      bg-[#d4af37]/10
                      text-sm font-semibold text-[#d4af37]
                    "
                  >
                    {index + 1}
                  </span>

                  <p className="text-sm font-medium leading-6 text-white sm:text-base">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-4">
              <p className="text-sm leading-6 text-white/70">
                {isBreakfast
                  ? "Any 2 breakfast items from the list are included with your room plan."
                  : "The meal includes one item from every listed food section."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}