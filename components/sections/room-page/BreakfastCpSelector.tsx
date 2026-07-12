"use client";

import { useState } from "react";
// import { breakfastCpPlan } from "@/data/meal-menu";

import { breakfastCpPlan } from "@/data/breakfast-cp-plan";

type BreakfastCpSelectorProps = {
  roomTitle: string;
  selectionLimit?: number;
};

export function BreakfastCpSelector({
  roomTitle,
  selectionLimit = breakfastCpPlan.selectionLimit,
}: BreakfastCpSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const maxSelection = selectionLimit;

  function handleToggleItem(itemId: string) {
    const isAlreadySelected = selectedItems.includes(itemId);

    if (isAlreadySelected) {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
      return;
    }

    if (selectedItems.length >= maxSelection) {
      return;
    }

    setSelectedItems((prev) => [...prev, itemId]);
  }

  const selectedMealNames = breakfastCpPlan.items
    .filter((item) => selectedItems.includes(item.id))
    .map((item) => item.name);

  return (
<div className="flex h-full min-h-[150px] min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md sm:p-6">
     <div className="flex w-full items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
            Complimentary
          </p>

          <h3 className="mt-2 font-serif text-2xl text-white">
            Breakfast CP Plan
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/60">
           Choose any {maxSelection} breakfast items with your {roomTitle}.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:border-[#d4af37] hover:text-[#d4af37]">
          {isOpen ? "Close" : "Choose"}
        </span>
      </div>

{isOpen && (
   <div className="mt-6 border-t border-white/10 pt-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm text-white/70">
              Selected {selectedItems.length}/{maxSelection}
            </p>

            {selectedItems.length === maxSelection && (
              <p className="text-xs font-medium text-[#d4af37]">
            Maximum {maxSelection} items selected
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {breakfastCpPlan.items.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              const isDisabled =
                !isSelected && selectedItems.length >= maxSelection;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleToggleItem(item.id)}
                  className={`
                    rounded-2xl border p-4 text-left transition-all duration-300
                    ${
                      isSelected
                        ? "border-[#d4af37] bg-[#d4af37]/15"
                        : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
                    }
                    ${
                      isDisabled
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer"
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-medium text-white">{item.name}</h4>

                    <span
                      className={`
                        h-5 w-5 rounded-full border transition-all duration-300
                        ${
                          isSelected
                            ? "border-[#d4af37] bg-[#d4af37]"
                            : "border-white/25"
                        }
                      `}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {selectedMealNames.length > 0 && (
            <div className="mt-5 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-4">
              <p className="text-sm font-medium text-white">
                Selected Breakfast:
              </p>

              <p className="mt-2 text-sm leading-6 text-white/70">
                {selectedMealNames.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}