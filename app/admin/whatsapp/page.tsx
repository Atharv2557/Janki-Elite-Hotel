import {
  CalendarDays,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

import type { ReactNode } from "react";

import { createClient } from "@/lib/supabase/server";

export default async function AdminWhatsAppPage() {
  const supabase = await createClient();

  const now = new Date();

  const startOfToday = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    )
  ).toISOString();

  const startOfMonth = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      1
    )
  ).toISOString();

  const [
    totalResult,
    todayResult,
    monthlyResult,
  ] = await Promise.all([
    supabase
      .from("contact_inquiries")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("contact_inquiries")
      .select("*", {
        count: "exact",
        head: true,
      })
      .gte("created_at", startOfToday),

    supabase
      .from("contact_inquiries")
      .select("*", {
        count: "exact",
        head: true,
      })
      .gte("created_at", startOfMonth),
  ]);

  const error =
    totalResult.error ||
    todayResult.error ||
    monthlyResult.error;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
          WhatsApp Management
        </p>

        <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          WhatsApp inquiries
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
          Track how many inquiries were submitted before visitors were
          redirected to WhatsApp.
        </p>
      </div>

    {error && (
  <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.08] px-5 py-4 text-sm text-red-300">
    Unable to load WhatsApp inquiry counts: {error.message}
  </div>
)}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <InquiryStatCard
          label="Total inquiries"
          value={totalResult.count ?? 0}
          description="All contact inquiries"
          icon={<MessageCircle size={21} />}
        />

        <InquiryStatCard
          label="Today"
          value={todayResult.count ?? 0}
          description="Inquiries received today"
          icon={<CalendarDays size={21} />}
        />

        <InquiryStatCard
          label="This month"
          value={monthlyResult.count ?? 0}
          description="Inquiries received this month"
          icon={<TrendingUp size={21} />}
        />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b9945a]">
          How tracking works
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          Inquiry tracking flow
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <FlowStep
            number="01"
            title="Form submitted"
            description="The guest completes the contact inquiry form."
          />

          <FlowStep
            number="02"
            title="Inquiry counted"
            description="The inquiry is saved securely in the database."
          />

          <FlowStep
            number="03"
            title="WhatsApp opens"
            description="The guest is redirected to the hotel WhatsApp number."
          />
        </div>
      </section>
    </div>
  );
}

type InquiryStatCardProps = {
  label: string;
  value: number;
  description: string;
 icon: ReactNode;
};

function InquiryStatCard({
  label,
  value,
  description,
  icon,
}: InquiryStatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm text-white/40">
            {label}
          </p>

          <p className="mt-3 text-5xl font-semibold text-white">
            {value}
          </p>

          <p className="mt-3 text-xs text-white/30">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#b9945a]/20 bg-[#b9945a]/10 text-[#c7a46d]">
          {icon}
        </div>
      </div>
    </div>
  );
}

type FlowStepProps = {
  number: string;
  title: string;
  description: string;
};

function FlowStep({
  number,
  title,
  description,
}: FlowStepProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#b9945a]">
        {number}
      </p>

      <h3 className="mt-3 font-semibold text-white/80">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-white/35">
        {description}
      </p>
    </div>
  );
}