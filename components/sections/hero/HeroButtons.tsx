import Button from "@/components/ui/Button";
import { heroContent } from "@/data/hero";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Button href={heroContent.primaryButton.href}>
        {heroContent.primaryButton.text}
      </Button>

      <Button
        href={heroContent.secondaryButton.href}
        variant="secondary"
      >
        {heroContent.secondaryButton.text}
      </Button>
    </div>
  );
}