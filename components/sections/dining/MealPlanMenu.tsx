"use client";

import { useState } from "react";
import { mealCategories } from "@/data/meal-menu";

export function MealPlanMenu() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const activeCategory = mealCategories.find(
    (category) => category.id === activeCategoryId
  );

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b58a2a]">
            Dining Selection
          </p>

          <h2 className="mt-4 font-serif text-4xl text-neutral-950 md:text-5xl">
            Choose Your Meal Plan
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-600">
            Select breakfast, lunch, or dinner options from our curated hotel
            menu.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {mealCategories.map((category) => {
            const isActive = activeCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`
                  group rounded-3xl border p-6 text-left transition-all duration-500
                  hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.10)]
                  ${
                    isActive
                      ? "border-[#b58a2a] bg-[#fff8e8]"
                      : "border-neutral-200 bg-white"
                  }
                `}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58a2a]">
                  Menu
                </p>

                <h3 className="mt-4 font-serif text-2xl text-neutral-950">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {category.subtitle}
                </p>

                <div className="mt-6 inline-flex rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-700 transition-colors duration-300 group-hover:border-[#b58a2a] group-hover:text-[#b58a2a]">
                  View Menu
                </div>
              </button>
            );
          })}
        </div>

        {activeCategory && (
          <div className="mt-10 rounded-[32px] border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b58a2a]">
                  Selected Menu
                </p>

                <h3 className="mt-3 font-serif text-3xl text-neutral-950">
                  {activeCategory.title}
                </h3>

                <p className="mt-2 text-sm text-neutral-600">
                  {activeCategory.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCategoryId(null)}
                className="rounded-full border border-neutral-200 px-5 py-2 text-sm text-neutral-700 transition-colors duration-300 hover:border-neutral-950 hover:text-neutral-950"
              >
                Close Menu
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {activeCategory.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
                >
                  <h4 className="font-medium text-neutral-950">{item.name}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}