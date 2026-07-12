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
  UploadCloud,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type RoomImageUploaderProps = {
  label: string;
  value?: string;
  disabled?: boolean;
  onChange: (imageUrl: string) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

  const uniquePart = crypto.randomUUID();

  return `${baseName || "room-image"}-${uniquePart}.${extension}`;
}

export default function RoomImageUploader({
  label,
  value = "",
  disabled = false,
  onChange,
}: RoomImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadError, setUploadError] =
    useState("");

  function openFilePicker() {
    if (disabled || isUploading) return;

    inputRef.current?.click();
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    setUploadError("");

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setUploadError(
        "Only JPG, PNG and WebP images are allowed."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError(
        "Image size cannot exceed 5 MB."
      );
      return;
    }

    try {
      setIsUploading(true);

      const supabase = createClient();

      const fileName = createSafeFileName(file.name);

      const filePath = `rooms/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from("room-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

      if (uploadError) {
        console.error(
          "Room image upload error:",
          uploadError
        );

        setUploadError(
          "Unable to upload this image. Please try again."
        );

        return;
      }

      const { data } = supabase.storage
        .from("room-images")
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
        setUploadError(
          "Image uploaded, but its public URL could not be created."
        );
        return;
      }

      onChange(data.publicUrl);
    } catch (error) {
      console.error(
        "Room image upload failed:",
        error
      );

      setUploadError(
        "Unable to upload this image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-white/75">
          {label}
        </label>

        <span className="text-xs text-white/25">
          JPG, PNG or WebP · Max 5 MB
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {value ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={value}
              alt="Uploaded room image preview"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/65 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-white">
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Uploading image...
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row">
            <button
              type="button"
              onClick={openFilePicker}
              disabled={disabled || isUploading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/65 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              <UploadCloud size={17} />
              Replace image
            </button>

            <button
              type="button"
              onClick={() => onChange("")}
              disabled={disabled || isUploading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-3 text-sm font-medium text-red-300/75 transition hover:bg-red-400/[0.08] hover:text-red-300 disabled:opacity-50"
            >
              <Trash2 size={17} />
              Remove image
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openFilePicker}
          disabled={disabled || isUploading}
          className="flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-10 text-center transition hover:border-[#b9945a]/40 hover:bg-[#b9945a]/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <LoaderCircle
                size={30}
                className="animate-spin text-[#b9945a]"
              />

              <span className="mt-4 text-sm font-medium text-white/70">
                Uploading image...
              </span>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b9945a]/20 bg-[#b9945a]/10 text-[#c7a46d]">
                <ImagePlus size={24} />
              </div>

              <span className="mt-5 text-sm font-semibold text-white/75">
                Choose image from computer
              </span>

              <span className="mt-2 max-w-sm text-xs leading-5 text-white/30">
                Click here and select a room image.
                The image will be uploaded automatically.
              </span>
            </>
          )}
        </button>
      )}

      {uploadError && (
        <p
          role="alert"
          className="mt-2 text-xs text-red-400"
        >
          {uploadError}
        </p>
      )}
    </div>
  );
}