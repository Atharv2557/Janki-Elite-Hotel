import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import ContactMap from "@/components/sections/contact/ContactMap";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import { createClient } from "@/lib/supabase/server";

type ContactSettingsRow = {
  email: string;
  primary_phone: string;
  secondary_phone: string;
  whatsapp_number: string;
  address: string;
  map_url: string;
  working_hours: string;
};

const fallbackSettings: ContactSettingsRow = {
  email: "hoteljankielite@gmail.com",
  primary_phone: "+91 9653730199",
  secondary_phone: "+91 89214 90491",
  whatsapp_number: "91 9653730199",
  address:
    "Janak puri 2nd, Plot no 37, Sirsi Rd, opposite 21 number bus stand, Prithviraj Nagar (B Sector), Jaipur, Rajasthan 302021",
  map_url: "",
  working_hours: "Open daily, 24 hours",
};

export default async function ContactPage() {
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
      "Public contact settings fetch error:",
      error
    );
  }

  const settings =
    (data as ContactSettingsRow | null) ??
    fallbackSettings;

  return (
    <>
      <main className="min-h-screen bg-[#fbf7f1]">
        <Navbar />

        <ContactHero />

        <ContactInfo
          email={settings.email}
          primaryPhone={
            settings.primary_phone
          }
            secondaryPhone={settings.secondary_phone}
          address={settings.address}
          workingHours={
            settings.working_hours
          }
        />

       <ContactFormSection
  whatsappNumber={
    settings.whatsapp_number
  }
/>

        <ContactMap />
      </main>

      <Footer />
    </>
  );
}