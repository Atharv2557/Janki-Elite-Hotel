"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import {
  galleryImageSchema,
  type GalleryImageFormValues,
} from "@/lib/validations/gallery";

type GalleryActionResult = {
  success: boolean;
  message: string;
  imageId?: string;
  fieldErrors?: Partial<
    Record<keyof GalleryImageFormValues, string>
  >;
};

type GalleryDatabasePayload = {
  title: string | null;
  alt_text: string;
  category: string;
  image_url: string;
  storage_path: string;
  display_order: number;
  is_published: boolean;
};

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

function getFieldErrors(
  issues: {
    path: PropertyKey[];
    message: string;
  }[]
) {
  const fieldErrors: Partial<
    Record<keyof GalleryImageFormValues, string>
  > = {};

  issues.forEach((issue) => {
    const fieldName =
      issue.path[0] as keyof GalleryImageFormValues;

    if (fieldName && !fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message;
    }
  });

  return fieldErrors;
}

function createGalleryPayload(
  values: GalleryImageFormValues
): GalleryDatabasePayload {
  return {
    title: values.title || null,
    alt_text: values.altText,
    category: values.category,
    image_url: values.imageUrl,
    storage_path: values.storagePath,
    display_order: values.displayOrder,
    is_published: values.isPublished,
  };
}

function revalidateGalleryPages() {
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

async function removeStorageFile(
  storagePath: string
) {
  if (!storagePath) return null;

  const { supabase, user } =
    await getAuthenticatedAdmin();

  if (!user) {
    return new Error(
      "Your session has expired."
    );
  }

  const { error } = await supabase.storage
    .from("gallery-images")
    .remove([storagePath]);

  return error;
}

export async function createGalleryImageAction(
  values: GalleryImageFormValues
): Promise<GalleryActionResult> {
  const validationResult =
    galleryImageSchema.safeParse(values);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "Please correct the highlighted gallery fields.",
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

  const payload = createGalleryPayload(
    validationResult.data
  );

  const { data, error } = await supabase
    .from("gallery_images")
    .insert(payload)
    .select("id")
    .single();

 if (error) {
  console.error("Create gallery image error:", {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });

  return {
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? `Unable to save gallery image: ${error.message}`
        : "Unable to save the gallery image. Please try again.",
  };
}
  revalidateGalleryPages();

  return {
    success: true,
    message: "Gallery image added successfully.",
    imageId: data.id,
  };
}

export async function updateGalleryImageAction(
  imageId: string,
  values: GalleryImageFormValues,
  previousStoragePath?: string
): Promise<GalleryActionResult> {
  if (!imageId) {
    return {
      success: false,
      message: "Gallery image ID is missing.",
    };
  }

  const validationResult =
    galleryImageSchema.safeParse(values);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "Please correct the highlighted gallery fields.",
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

  const payload = createGalleryPayload(
    validationResult.data
  );

  const { data, error } = await supabase
    .from("gallery_images")
    .update(payload)
    .eq("id", imageId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Update gallery image error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to update the gallery image. Please try again.",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "Gallery image was not found or could not be updated.",
    };
  }

  const storageFileWasReplaced =
    previousStoragePath &&
    previousStoragePath !==
      validationResult.data.storagePath;

  if (storageFileWasReplaced) {
    const removeError = await removeStorageFile(
      previousStoragePath
    );

    if (removeError) {
      console.error(
        "Old gallery file cleanup error:",
        removeError
      );
    }
  }

  revalidateGalleryPages();

  return {
    success: true,
    message: "Gallery image updated successfully.",
    imageId: data.id,
  };
}

export async function deleteGalleryImageAction(
  imageId: string
): Promise<GalleryActionResult> {
  if (!imageId) {
    return {
      success: false,
      message: "Gallery image ID is missing.",
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

  const { data: existingImage, error: fetchError } =
    await supabase
      .from("gallery_images")
      .select("id, storage_path")
      .eq("id", imageId)
      .maybeSingle();

  if (fetchError) {
    console.error(
      "Fetch gallery image before deletion error:",
      fetchError
    );

    return {
      success: false,
      message:
        "Unable to find the gallery image.",
    };
  }

  if (!existingImage) {
    return {
      success: false,
      message: "Gallery image was not found.",
    };
  }

  const { data: deletedImage, error: deleteError } =
    await supabase
      .from("gallery_images")
      .delete()
      .eq("id", imageId)
      .select("id")
      .maybeSingle();

  if (deleteError) {
    console.error(
      "Delete gallery database record error:",
      deleteError
    );

    return {
      success: false,
      message:
        "Unable to delete the gallery image.",
    };
  }

  if (!deletedImage) {
    return {
      success: false,
      message:
        "Gallery image could not be deleted.",
    };
  }

  const storageError = await supabase.storage
    .from("gallery-images")
    .remove([existingImage.storage_path]);

  if (storageError.error) {
    console.error(
      "Delete gallery storage file error:",
      storageError.error
    );
  }

  revalidateGalleryPages();

  return {
    success: true,
    message: "Gallery image deleted successfully.",
    imageId: deletedImage.id,
  };
}