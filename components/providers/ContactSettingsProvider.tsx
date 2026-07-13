"use client";

import {
  createContext,
  type ReactNode,
  useContext,
} from "react";

import type { PublicContactSettings } from "@/lib/contact-settings/get-contact-settings";

const ContactSettingsContext =
  createContext<PublicContactSettings | null>(
    null
  );

type ContactSettingsProviderProps = {
  settings: PublicContactSettings;
  children: ReactNode;
};

export default function ContactSettingsProvider({
  settings,
  children,
}: ContactSettingsProviderProps) {
  return (
    <ContactSettingsContext.Provider
      value={settings}
    >
      {children}
    </ContactSettingsContext.Provider>
  );
}

export function useContactSettings() {
  const settings = useContext(
    ContactSettingsContext
  );

  if (!settings) {
    throw new Error(
      "useContactSettings must be used inside ContactSettingsProvider."
    );
  }

  return settings;
}