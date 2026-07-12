"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import {
  roomSchema,
  type RoomFormValues,
} from "@/lib/validations/room";

type RoomActionResult = {
  success: boolean;
  message: string;
  roomId?: string;
  fieldErrors?: Partial<
    Record<keyof RoomFormValues, string>
  >;
};

type RoomDatabasePayload = {
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price_per_night: number;
  capacity: number;
  room_size: string | null;
  hero_image: string | null;
  gallery_images: string[];
  amenities: string[];
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
};

async function getAuthenticatedAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      supabase,
      user: null,
    };
  }

  return {
    supabase,
    user,
  };
}

function getFieldErrors(
  issues: {
    path: PropertyKey[];
    message: string;
  }[]
) {
  const fieldErrors: Partial<
    Record<keyof RoomFormValues, string>
  > = {};

  issues.forEach((issue) => {
    const fieldName =
      issue.path[0] as keyof RoomFormValues;

    if (fieldName && !fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message;
    }
  });

  return fieldErrors;
}

function createRoomPayload(
  values: RoomFormValues
): RoomDatabasePayload {
  return {
    title: values.title,
    slug: values.slug,
    short_description:
      values.shortDescription || null,
    description: values.description || null,
    price_per_night: values.pricePerNight,
    capacity: values.capacity,
    room_size: values.roomSize || null,
    hero_image: values.heroImage || null,
    gallery_images: values.galleryImages.filter(Boolean),
    amenities: values.amenities.filter(Boolean),
    is_featured: values.isFeatured,
    is_published: values.isPublished,
    display_order: values.displayOrder,
  };
}

function refreshRoomPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/rooms");
  revalidatePath("/rooms");
  revalidatePath("/");
}

export async function createRoomAction(
  values: RoomFormValues
): Promise<RoomActionResult> {
  const validationResult = roomSchema.safeParse(values);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "Please correct the highlighted room fields.",
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

  const payload = createRoomPayload(
    validationResult.data
  );

  const { data, error } = await supabase
    .from("rooms")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    console.error("Create room error:", error);

    if (error.code === "23505") {
      return {
        success: false,
        message:
          "A room with this slug already exists.",
        fieldErrors: {
          slug: "Please enter a unique room slug.",
        },
      };
    }

    return {
      success: false,
      message:
        "Unable to create the room. Please try again.",
    };
  }

  refreshRoomPages();

  return {
    success: true,
    message: "Room created successfully.",
    roomId: data.id,
  };
}

export async function updateRoomAction(
  roomId: string,
  values: RoomFormValues
): Promise<RoomActionResult> {
  if (!roomId) {
    return {
      success: false,
      message: "Room ID is missing.",
    };
  }

  const validationResult = roomSchema.safeParse(values);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "Please correct the highlighted room fields.",
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

  const payload = createRoomPayload(
    validationResult.data
  );

  const { data, error } = await supabase
    .from("rooms")
    .update(payload)
    .eq("id", roomId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Update room error:", error);

    if (error.code === "23505") {
      return {
        success: false,
        message:
          "A room with this slug already exists.",
        fieldErrors: {
          slug: "Please enter a unique room slug.",
        },
      };
    }

    return {
      success: false,
      message:
        "Unable to update the room. Please try again.",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "Room was not found or could not be updated.",
    };
  }

  refreshRoomPages();

  return {
    success: true,
    message: "Room updated successfully.",
    roomId: data.id,
  };
}

export async function deleteRoomAction(
  roomId: string
): Promise<RoomActionResult> {
  if (!roomId) {
    return {
      success: false,
      message: "Room ID is missing.",
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
    .from("rooms")
    .delete()
    .eq("id", roomId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Delete room error:", error);

    return {
      success: false,
      message:
        "Unable to delete the room. Please try again.",
    };
  }

  if (!data) {
    return {
      success: false,
      message:
        "Room was not found or could not be deleted.",
    };
  }

  refreshRoomPages();

  return {
    success: true,
    message: "Room deleted successfully.",
    roomId: data.id,
  };
}