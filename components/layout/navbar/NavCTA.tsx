import Button from "@/components/ui/Button";

export default function NavCTA() {
  return (
    <div className="hidden lg:block">
      <Button
        href="/contact"
        variant="primary"
        className="px-6 py-3 text-xs uppercase tracking-[0.18em]"
        showArrow={false}
      >
        Book Now
      </Button>
      
      <Button
        href="/login"
        variant="primary"
        className="px-6 py-3 ml-2.5 text-xs uppercase tracking-[0.18em]"
        showArrow={false}>Login </Button>
    </div>
  );
}