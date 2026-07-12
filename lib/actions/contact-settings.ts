"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import {
  contactSettingsSchema,
  type ContactSettingsFormValues,
} from "@/lib/validations/contact-settings";

type ContactSettingsFieldErrors = Partial<
  Record<keyof ContactSettingsFormValues, string>
>;

type ContactSettingsActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: ContactSettingsFieldErrors;
};

function getFieldErrors(
  issues: {
    path: PropertyKey[];
    message: string;
  }[]
): ContactSettingsFieldErrors {
  const fieldErrors: ContactSettingsFieldErrors = {};

  issues.forEach((issue) => {
    const fieldName =
      issue.path[0] as keyof ContactSettingsFormValues;

    if (fieldName && !fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message;
    }
  });

  return fieldErrors;
}

async function getAuthenticatedAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    supabase,
    user: error ? null : user,
  };
}

function revalidateContactSettingsPages() {
  revalidatePath("/admin/contact");
  revalidatePath("/contact");
  revalidatePath("/");
}

export async function updateContactSettingsAction(
  settingsId: string,
  values: ContactSettingsFormValues
): Promise<ContactSettingsActionResult> {
  if (!settingsId) {
    return {
      success: false,
      message: "Contact settings ID is missing.",
    };
  }

  const validationResult =
    contactSettingsSchema.safeParse(values);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "Please correct the highlighted contact fields.",
      fieldErrors: getFieldErrors(
        validationResult.error.issues
      ),
    };
  }

  const { supabase, user } =
    await getAuthenticatedAdmin();

  if (!user) {
    return {
      success: false,
      message:
        "Your session has expired. Please sign in again.",
    };
  }

  const { data, error } = await supabase
    .from("contact_settings")
    .update({
      email: validationResult.data.email,
      primary_phone:
        validationResult.data.primaryPhone,
        secondary_phone:
  validationResult.data.secondaryPhone,
      whatsapp_number:
        validationResult.data.whatsappNumber,
      address:
        validationResult.data.address,
      map_url:
        validationResult.data.mapUrl,
      working_hours:
        validationResult.data.workingHours,
    })
    .eq("id", settingsId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Update contact settings error:",
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Unable to update contact settings: ${error.message}`
          : "Unable to update contact settings. Please try again.",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "Contact settings were not found or could not be updated.",
    };
  }

  revalidateContactSettingsPages();

  return {
    success: true,
    message:
      "Contact information updated successfully.",
  };
}