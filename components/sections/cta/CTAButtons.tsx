"use client";

import { useContactSettings } from "@/components/providers/ContactSettingsProvider";
import { createWhatsAppUrl } from "@/lib/utils/whatsapp";
import { cta } from "@/data/cta";

export default function CTASection() {
  const { whatsappNumber } =
    useContactSettings();

  const bookingUrl = createWhatsAppUrl({
    whatsappNumber,
    roomTitle: "Luxury Stay at Janki Elite",
    intent: "book",
  });

  const inquiryUrl = createWhatsAppUrl({
    whatsappNumber,
    roomTitle: "Janki Elite Hotel",
    intent: "inquiry",
  });

  return (
    <div>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cta.primaryButton.text}
      </a>

      <a
        href={inquiryUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cta.whatsappButton.text}
      </a>
    </div>
  );
}