"use client";

import { useMemo, useState } from "react";
import { diningMenuCategories } from "@/data/dining-menu";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function DiningMenuShowcase() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    diningMenuCategories[0]?.id ?? ""
  );

  const activeCategory = useMemo(() => {
    return diningMenuCategories.find(
      (category) => category.id === activeCategoryId
    );
  }, [activeCategoryId]);

  return (
    <section
      id="dining-menu"
      className="relative overflow-hidden bg-[#fbf7f0] px-6 py-20 text-[#211711] md:px-12 md:py-24 lg:px-20"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#c8a45d]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#8b5e34]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-[#c8a45d]">
            Restaurant Menu
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
            Explore Our Dining Selection
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5f5148] md:text-lg">
            Choose a category and view filtered dishes from the Janki Elite
            restaurant menu.
          </p>
        </div>

        <div className="mt-12 flex gap-3 overflow-x-auto pb-3">
          {diningMenuCategories.map((category) => {
            const isActive = activeCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`
                  shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "border-[#c8a45d] bg-[#211711] text-white shadow-[0_18px_45px_rgba(33,23,17,0.18)]"
                      : "border-[#eadfce] bg-white/70 text-[#5f5148] hover:border-[#c8a45d] hover:text-[#211711]"
                  }
                `}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        {activeCategory && (
          <div className="mt-10 rounded-[2rem] border border-[#eadfce] bg-white/80 p-6 shadow-[0_30px_90px_rgba(33,23,17,0.10)] backdrop-blur-md md:p-8">
            <div className="flex flex-col justify-between gap-5 border-b border-[#eadfce] pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#c8a45d]">
                  Selected Category
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#211711] md:text-4xl">
                  {activeCategory.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f5148]">
                  {activeCategory.description}
                </p>
              </div>

              <span className="rounded-full border border-[#eadfce] bg-[#fbf7f0] px-5 py-2 text-sm text-[#8b6b45]">
                {activeCategory.items.length} Items
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeCategory.items.map((item) => (
                <div
                  key={item.id}
                  id={slugify(item.name)}
                  className="group rounded-2xl border border-[#eadfce] bg-[#fbf7f0] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c8a45d]/70 hover:bg-white hover:shadow-[0_18px_50px_rgba(33,23,17,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-base font-semibold leading-6 text-[#211711]">
                      {item.name}
                    </h4>

                    {typeof item.price === "number" && (
                      <span className="shrink-0 rounded-full bg-[#211711] px-3 py-1 text-xs font-medium text-white">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}