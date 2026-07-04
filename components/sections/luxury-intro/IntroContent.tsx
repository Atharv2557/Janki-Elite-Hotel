import { luxuryIntro } from "@/data/luxuaryIntro";
import IntroStats from "./IntroStats";
import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";
import Button from "@/components/ui/Button";

export default function IntroContent() {
  return (
    <div>
   
<Badge>
   {luxuryIntro.badge}
</Badge>

    
<SectionHeading
   line1={luxuryIntro.title.line1}
   line2={luxuryIntro.title.line2}
/>

      <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600 leading-8">
        {luxuryIntro.description}
      </p>

      <IntroStats />

      <div className="mt-10">
        <Button href={luxuryIntro.button.href}>
          {luxuryIntro.button.text}
        </Button>
      </div>
    </div>
  );
}