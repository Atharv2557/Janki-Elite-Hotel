import { createClient } from "@/lib/supabase/server";

export type PublicContactSettings = {
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  address: string;
  mapUrl: string;
  workingHours: string;
};

export const fallbackContactSettings: PublicContactSettings = {
  email: "hoteljankielite@gmail.com",
  primaryPhone: "+91 9296909499",
  secondaryPhone: "",
  whatsappNumber: "919296909499",
  address:
    "Janak Puri 2nd, Plot No. 37, Sirsi Road, Jaipur, Rajasthan 302021",
  mapUrl: "",
  workingHours: "Open daily, 24 hours",
};

type ContactSettingsRow = {
  email: string;
  primary_phone: string;
  secondary_phone: string | null;
  whatsapp_number: string;
  address: string;
  map_url: string | null;
  working_hours: string | null;
};

export async function getContactSettings(): Promise<PublicContactSettings> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_settings")
    .select(
      `
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
      "Contact settings fetch error:",
      error
    );

    return fallbackContactSettings;
  }

  if (!data) {
    return fallbackContactSettings;
  }

  const settings = data as ContactSettingsRow;

  return {
    email:
      settings.email ||
      fallbackContactSettings.email,

    primaryPhone:
      settings.primary_phone ||
      fallbackContactSettings.primaryPhone,

    secondaryPhone:
      settings.secondary_phone || "",

    whatsappNumber:
      settings.whatsapp_number ||
      fallbackContactSettings.whatsappNumber,

    address:
      settings.address ||
      fallbackContactSettings.address,

    mapUrl:
      settings.map_url || "",

    workingHours:
      settings.working_hours || "",
  };
}