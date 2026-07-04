import { Check } from "lucide-react";
import { dining } from "@/data/dining";

export default function DiningHighlights() {
  return (
    <div className="mt-8 grid gap-4">
      {dining.highlights.map((item) => (
        <div
          key={item}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-[#f8f5ef]
            px-5
            py-4
            text-gray-700
          "
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
            <Check size={18} />
          </span>

          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}