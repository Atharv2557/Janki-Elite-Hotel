import { RoomFeature } from "@/data/room-page";
import type { MealPlanType } from "./MealPlanOverlay";

type RoomAmenitiesProps = {
  features: RoomFeature[];
  activeMealPlan?: MealPlanType | null;
  onMealPlanClick?: (plan: MealPlanType) => void;
};

function getMealPlan(title: string): MealPlanType | null {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("complimentary breakfast")) {
    return "breakfast";
  }

  if (
    normalizedTitle.includes("complimentary lunch") ||
    normalizedTitle.includes("complimentary dinner")
  ) {
    return "lunch";
  }

  return null;
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function RoomAmenities({
  features,
  activeMealPlan = null,
  onMealPlanClick,
}: RoomAmenitiesProps) {
  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
        Amenities
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {features.map((feature) => {
          const mealPlan = getMealPlan(feature.title);
          const isMealPlan = mealPlan !== null;
          const isActive = mealPlan === activeMealPlan;

         if (isMealPlan) {
  return (
    <button
      key={feature.id}
      type="button"
      aria-expanded={isActive}
      onClick={() => onMealPlanClick?.(mealPlan)}
      className={`
        meal-amenity-card
        group relative flex min-h-[58px] w-full items-center
        overflow-hidden rounded-2xl border px-4 py-3 text-left
        transition-all duration-500
        hover:-translate-y-0.5
        ${
          isActive
            ? "border-[#d4af37] bg-[#d4af37]/12"
            : "border-[#d4af37]/35 bg-white/[0.05]"
        }
      `}
    >
      <div className="relative z-10 min-w-0 flex-1">
        <p className="text-sm font-semibold leading-5 text-white">
          {feature.title}
        </p>

        <p className="mt-0.5 text-[11px] leading-4 text-white/45">
          {mealPlan === "breakfast"
            ? "View complimentary breakfast"
            : "View complimentary lunch"}
        </p>
      </div>

      <span
        className={`
          relative z-10 ml-3 flex h-8 w-8 shrink-0 items-center
          justify-center rounded-full border
          transition-all duration-500
          ${
            isActive
              ? "border-[#d4af37] bg-[#d4af37]/20 text-[#f2ce52]"
              : "border-white/15 bg-white/[0.04] text-[#d4af37] group-hover:border-[#d4af37]/70 group-hover:bg-[#d4af37]/10"
          }
        `}
      >
        <EyeIcon />
      </span>
    </button>
  );
}
          return (
            <div
              key={feature.id}
              className="flex min-h-[58px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm text-[#d4af37]">
                ✓
              </span>

              <span className="min-w-0 flex-1 text-sm font-medium text-white">
                {feature.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}