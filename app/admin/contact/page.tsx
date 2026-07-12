import { AlertCircle, Mail, MapPin, Phone } from "lucide-react";

import type { ReactNode } from "react";

import ContactSettingsForm from "@/components/admin/contact/ContactSettingsForm";
import { createClient } from "@/lib/supabase/server";
import type { ContactSettingsFormValues } from "@/lib/validations/contact-settings";

type ContactSettingsRow = {
  id: string;
  email: string;
  primary_phone: string;
  secondary_phone: string;
  whatsapp_number: string;
  address: string;
  map_url: string;
  working_hours: string;
};

export default async function AdminContactPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_settings")
    .select(
      `
        id,
        email,
        primary_phone,
        secondary_phone,
        whatsapp_number,
        address,
        map_url,
        working_hours
      `
    )
    .order("created_at", {
      ascending: true,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "Admin contact settings fetch error:",
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );
  }

  if (!data) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
            Contact Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
            Contact details
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
            Manage the hotel information shown on the public contact page.
          </p>
        </div>

        <div className="rounded-3xl border border-red-400/20 bg-red-400/[0.08] p-6">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-red-300"
            />

            <div>
              <h2 className="font-semibold text-red-200">
                Contact settings not found
              </h2>

              <p className="mt-2 text-sm leading-6 text-red-200/70">
                Open Supabase and confirm that the contact_settings table
                contains one settings row.
              </p>

              {error && (
                <p className="mt-3 rounded-xl bg-black/20 px-3 py-2 font-mono text-xs text-red-200/70">
                  {error.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const settings = data as ContactSettingsRow;

  const initialValues: ContactSettingsFormValues = {
    email: settings.email,
    primaryPhone: settings.primary_phone, 
    secondaryPhone:settings.secondary_phone,
    whatsappNumber: settings.whatsapp_number,
    address: settings.address,
    mapUrl: settings.map_url,
    workingHours: settings.working_hours,
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
          Contact Management
        </p>

        <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          Contact details
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
          Update the public email, phone number, WhatsApp number, hotel
          address and working hours.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <PreviewCard
          label="Public email"
          value={settings.email}
          icon={<Mail size={18} />}
        />

        <PreviewCard
          label="Primary phone"
          value={settings.primary_phone}
          icon={<Phone size={18} />}
        />

        <PreviewCard
          label="Hotel location"
          value={settings.address}
          icon={<MapPin size={18} />}
        />
      </section>

      <ContactSettingsForm
        settingsId={settings.id}
        initialValues={initialValues}
      />
    </div>
  );
}

type PreviewCardProps = {
  label: string;
  value: string;
icon: ReactNode;
};

function PreviewCard({
  label,
  value,
  icon,
}: PreviewCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#b9945a]/20 bg-[#b9945a]/10 text-[#c7a46d]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            {label}
          </p>

          <p className="mt-2 break-words text-sm leading-6 text-white/75">
            {value || "Not configured"}
          </p>
        </div>
      </div>
    </div>
  );
}