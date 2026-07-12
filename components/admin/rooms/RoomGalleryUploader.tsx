"use client";

import {
  type ChangeEvent,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  ImagePlus,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type RoomGalleryUploaderProps = {
  value: string[];
  disabled?: boolean;
  onChange: (images: string[]) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 20;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function createSafeFileName(fileName: string) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() || "jpg";

  const baseName = fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${
    baseName || "room-gallery"
  }-${crypto.randomUUID()}.${extension}`;
}

export default function RoomGalleryUploader({
  value,
  disabled = false,
  onChange,
}: RoomGalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadError, setUploadError] =
    useState("");

  function openFilePicker() {
    if (disabled || isUploading) return;

    inputRef.current?.click();
  }

  async function handleFilesChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    event.target.value = "";

    if (selectedFiles.length === 0) return;

    setUploadError("");

    const remainingSlots =
      MAX_IMAGES - value.length;

    if (remainingSlots <= 0) {
      setUploadError(
        "You can add a maximum of 20 gallery images."
      );
      return;
    }

    const filesToUpload = selectedFiles.slice(
      0,
      remainingSlots
    );

    const invalidFile = filesToUpload.find(
      (file) =>
        !ALLOWED_IMAGE_TYPES.includes(file.type)
    );

    if (invalidFile) {
      setUploadError(
        "Only JPG, PNG and WebP images are allowed."
      );
      return;
    }

    const oversizedFile = filesToUpload.find(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      setUploadError(
        "Each gallery image must be smaller than 5 MB."
      );
      return;
    }

    try {
      setIsUploading(true);

      const supabase = createClient();
      const uploadedUrls: string[] = [];

      for (const file of filesToUpload) {
        const fileName = createSafeFileName(
          file.name
        );

        const filePath = `rooms/gallery/${fileName}`;

        const { error } = await supabase.storage
          .from("room-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (error) {
          console.error(
            "Gallery image upload error:",
            error
          );

          throw new Error(
            "Unable to upload gallery image."
          );
        }

        const { data } = supabase.storage
          .from("room-images")
          .getPublicUrl(filePath);

        if (data.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }
      }

      onChange([
        ...value,
        ...uploadedUrls,
      ]);
    } catch (error) {
      console.error(
        "Gallery image upload failed:",
        error
      );

      setUploadError(
        "Some gallery images could not be uploaded. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

  function removeImage(index: number) {
    onChange(
      value.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/75">
            Gallery images
          </p>

          <p className="mt-1 text-xs text-white/25">
            Select multiple JPG, PNG or WebP images
          </p>
        </div>

        <span className="text-xs text-white/25">
          {value.length}/{MAX_IMAGES}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFilesChange}
        disabled={
          disabled ||
          isUploading ||
          value.length >= MAX_IMAGES
        }
        className="hidden"
      />

      <button
        type="button"
        onClick={openFilePicker}
        disabled={
          disabled ||
          isUploading ||
          value.length >= MAX_IMAGES
        }
        className="flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-8 text-center transition hover:border-[#b9945a]/40 hover:bg-[#b9945a]/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUploading ? (
          <>
            <LoaderCircle
              size={28}
              className="animate-spin text-[#b9945a]"
            />

            <span className="mt-3 text-sm font-medium text-white/70">
              Uploading gallery images...
            </span>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#b9945a]/20 bg-[#b9945a]/10 text-[#c7a46d]">
              <ImagePlus size={22} />
            </div>

            <span className="mt-4 text-sm font-semibold text-white/75">
              Choose gallery images
            </span>

            <span className="mt-2 text-xs text-white/30">
              You can select multiple images at once
            </span>
          </>
        )}
      </button>

      {value.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((imageUrl, index) => (
            <div
              key={`${imageUrl}-${index}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={imageUrl}
                  alt={`Room gallery image ${
                    index + 1
                  }`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  removeImage(index)
                }
                disabled={disabled || isUploading}
                className="flex w-full items-center justify-center gap-2 border-t border-white/10 px-4 py-3 text-sm font-medium text-red-300/70 transition hover:bg-red-400/[0.08] hover:text-red-300 disabled:opacity-50"
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {uploadError && (
        <p
          role="alert"
          className="mt-3 text-xs text-red-400"
        >
          {uploadError}
        </p>
      )}
    </div>
  );
}