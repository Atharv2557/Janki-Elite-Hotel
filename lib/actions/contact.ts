"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import {
  contactInquirySchema,
  contactInquiryStatusSchema,
  type ContactInquiryFormValues,
  type ContactInquiryStatus,
} from "@/lib/validations/contact";

type ContactFieldErrors = Partial<
  Record<keyof ContactInquiryFormValues, string>
>;

type ContactActionResult = {
  success: boolean;
  message: string;
  inquiryId?: string;
  fieldErrors?: ContactFieldErrors;
};

function getFieldErrors(
  issues: {
    path: PropertyKey[];
    message: string;
  }[]
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  issues.forEach((issue) => {
    const fieldName =
      issue.path[0] as keyof ContactInquiryFormValues;

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

function revalidateContactPages() {
  revalidatePath("/admin/contact");
  revalidatePath("/contact");
}
export async function createContactInquiryAction(
  values: ContactInquiryFormValues
): Promise<ContactActionResult> {
  const validationResult =
    contactInquirySchema.safeParse(values);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "Please correct the highlighted contact form fields.",
      fieldErrors: getFieldErrors(
        validationResult.error.issues
      ),
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_inquiries")
    .insert({
      name: validationResult.data.name,
      email: validationResult.data.email,
      phone:
        validationResult.data.phone || null,
      subject:
        validationResult.data.subject || null,
      message: validationResult.data.message,
      status: "new",
      source: "contact-page",
    });

if (error) {
  console.error("CONTACT INSERT ERROR:", error);

  return {
    success: false,
    message: `Insert failed: ${error.message}`,
  };
}

  revalidateContactPages();

  return {
    success: true,
    message:
      "Your inquiry has been submitted successfully.",
  };
}

export async function updateContactInquiryStatusAction(
  inquiryId: string,
  status: ContactInquiryStatus
): Promise<ContactActionResult> {
  if (!inquiryId) {
    return {
      success: false,
      message: "Inquiry ID is missing.",
    };
  }

  const statusValidation =
    contactInquiryStatusSchema.safeParse(status);

  if (!statusValidation.success) {
    return {
      success: false,
      message: "Invalid inquiry status.",
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
    .from("contact_inquiries")
    .update({
      status: statusValidation.data,
    })
    .eq("id", inquiryId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Update contact inquiry status error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to update the inquiry status.",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "Inquiry was not found or could not be updated.",
    };
  }

  revalidateContactPages();

  return {
    success: true,
    message: "Inquiry status updated.",
    inquiryId: data.id,
  };
}

export async function deleteContactInquiryAction(
  inquiryId: string
): Promise<ContactActionResult> {
  if (!inquiryId) {
    return {
      success: false,
      message: "Inquiry ID is missing.",
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
    .from("contact_inquiries")
    .delete()
    .eq("id", inquiryId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Delete contact inquiry error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to delete the inquiry.",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "Inquiry was not found or could not be deleted.",
    };
  }

  revalidateContactPages();

  return {
    success: true,
    message: "Inquiry deleted successfully.",
    inquiryId: data.id,
  };
}