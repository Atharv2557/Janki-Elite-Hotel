import { CheckCircle2 } from "lucide-react";

import { dining } from "@/data/dining";

export default function DiningHighlights() {
  return (
    <div className="mt-8 grid gap-4 sm:mt-10">
      {dining.highlights.map((item) => (
        <div
          key={item}
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-black/5
            bg-white
            px-5
            py-4
            shadow-[0_12px_35px_rgba(0,0,0,0.04)]
          "
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
            <CheckCircle2 size={20} />
          </span>

          <span className="text-base font-medium text-[#211711]">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}