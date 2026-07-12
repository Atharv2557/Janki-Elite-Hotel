import {
  BedDouble,
  CalendarCheck,
  Car,
  ConciergeBell,
  Refrigerator,
  Utensils,
  Wifi,
} from "lucide-react";

type AmenityCardProps = {
  title: string;
  description: string;
  icon: string;
};

const icons = {
  Wifi,
  BedDouble,
  Utensils,
  Car,
  ConciergeBell,
  CalendarCheck,
  Refrigerator,
};

export function AmenityCard({ title, description, icon }: AmenityCardProps) {
  const Icon = icons[icon as keyof typeof icons];

  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[var(--primary)]/40 hover:shadow-xl">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f1ea] text-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
        {Icon && <Icon size={24} strokeWidth={1.8} />}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="min-h-[56px] text-xl font-semibold leading-snug text-[#211711]">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-black/55">
          {description}
        </p>
      </div>
    </article>
  );
}