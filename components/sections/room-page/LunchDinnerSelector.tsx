"use client";

import { useState } from "react";
import { lunchDinnerPlan } from "@/data/lunch-dinner-plan";

type LunchDinnerSelectorProps = {
  roomTitle: string;
};

export function LunchDinnerSelector({ roomTitle }: LunchDinnerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
<div className="flex h-full min-h-[150px] min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md sm:p-6">

<button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
 className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
            Complimentary
          </p>

          <h3 className="mt-2 font-serif text-2xl text-white">
            Lunch / Dinner Plan
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Fixed meal box included with your {roomTitle}.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:border-[#d4af37] hover:text-[#d4af37]">
          {isOpen ? "Close" : "View"}
        </span>
      </button>
      
{isOpen && (
  <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-sm leading-6 text-white/60">
            {lunchDinnerPlan.subtitle}
          </p>

          <div className="mt-5 grid gap-3">
            {lunchDinnerPlan.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <p className="font-medium text-white">{item.name}</p>

                <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-xs font-medium text-[#d4af37]">
                  Included
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-4">
            <p className="text-sm font-medium text-white">
              Included Lunch / Dinner:
            </p>

            <p className="mt-2 text-sm leading-6 text-white/70">
              Paneer Dish, Vegetable, Dal, Rice, Naan / Roti / Parantha, Salad /
              Papad / Pickle
            </p>
          </div>
        </div>
      )}
    </div>
  );
}