import { luxuryIntro } from "@/data/luxuaryIntro";
import StatCard from "@/components/ui/cards/StatCard";

export default function IntroStats() {
  return (
    <div className="mt-12 grid grid-cols-3 gap-6">
      {luxuryIntro.stats.map((item) => (
       
<StatCard
   key={item.label}
   value={item.value}
   label={item.label}
/>
      ))}
    </div>
  );
}