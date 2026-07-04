import { Mail, MapPin, Phone } from "lucide-react";
import { location } from "@/data/location";

export default function LocationInfo() {
  const items = [
    {
      icon: MapPin,
      label: "Address",
      value: location.address,
    },
    {
      icon: Phone,
      label: "Phone",
      value: location.phone,
    },
    {
      icon: Mail,
      label: "Email",
      value: location.email,
    },
  ];

  return (
    <div className="mt-10 grid gap-5">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
              group
              flex
              gap-4
              rounded-2xl
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]/10
                text-[var(--primary)]
                transition-all
                duration-500
                group-hover:bg-[var(--primary)]
                group-hover:text-white
              "
            >
              <Icon size={22} />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                {item.label}
              </p>

              <p className="mt-1 text-gray-700">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}