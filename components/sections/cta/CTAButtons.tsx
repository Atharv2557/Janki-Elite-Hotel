import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { cta } from "@/data/cta";
import Button from "@/components/ui/Button";

export default function CTAButtons() {
  return (
    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
      <Button
        href={cta.primaryButton.href}
        className="w-full sm:w-auto"
      >
        {cta.primaryButton.text}
      </Button>

      <Link
        href={cta.whatsappButton.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp inquiry for Janki Elite"
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-full
          border
          border-white/25
          px-8
          py-4
          text-sm
          font-medium
          text-white
          transition-all
          duration-500
          hover:-translate-y-1
          hover:bg-white
          hover:text-black
          focus:outline-none
          focus:ring-2
          focus:ring-white/50
          sm:w-auto
        "
      >
        <MessageCircle size={18} />
        {cta.whatsappButton.text}
      </Link>
    </div>
  );
}