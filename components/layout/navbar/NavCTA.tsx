"use client";

import Button from "@/components/ui/Button";
import { useContactSettings } from "@/components/providers/ContactSettingsProvider";
import { createWhatsAppUrl } from "@/lib/utils/whatsapp";

export default function NavCTA() {
  const { whatsappNumber } =
    useContactSettings();

  const bookingUrl = createWhatsAppUrl({
    whatsappNumber,
    roomTitle: "Hotel Stay",
    intent: "book",
  });

  return (
    <div className="hidden items-center gap-4 lg:flex">
      <Button
        href={bookingUrl}
        variant="primary"
        className="px-6 py-3 text-xs uppercase tracking-[0.18em]"
        showArrow={false}
      >
        Book Now
      </Button>

      <Button
        href="/login"
        variant="primary"
        className="px-6 py-3 text-xs uppercase tracking-[0.18em]"
        showArrow={false}
      >
        Login
      </Button>
    </div>
  );
}