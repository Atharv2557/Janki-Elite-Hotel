"use client";

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Check,
  ImageIcon,
  LoaderCircle,
  RefreshCw,
  Upload,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "hotel-media";

type MediaFile = {
  name: string;
  path: string;
  publicUrl: string;
  createdAt: string | null;
};

type MediaPickerProps = {
  folder?: string;
  value?: string;
  onSelect: (url: string) => void;
};

export default function MediaPicker({
  folder = "gallery",
  value = "",
  onSelect,
}: MediaPickerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  const loadFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const supabase = createClient();

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: {
            column: "created_at",
            order: "desc",
          },
        });

      if (error) {
        throw error;
      }

      const mediaFiles: MediaFile[] = (data ?? [])
        .filter((file) => Boolean(file.id))
        .map((file) => {
          const path = `${folder}/${file.name}`;

          const {
            data: { publicUrl },
          } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(path);

          return {
            name: file.name,
            path,
            publicUrl,
            createdAt: file.created_at ?? null,
          };
        });

      setFiles(mediaFiles);
    } catch (error) {
      console.error("Load media error:", error);

      setErrorMessage(
        "Unable to load uploaded images."
      );
    } finally {
      setIsLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    void loadFiles();
  }, [loadFiles]);

  async function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setErrorMessage("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage(
        "Only JPG, PNG and WebP images are allowed."
      );
      event.target.value = "";
      return;
    }

    const maximumSize = 5 * 1024 * 1024;

    if (selectedFile.size > maximumSize) {
      setErrorMessage(
        "Image size cannot exceed 5 MB."
      );
      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);

      const supabase = createClient();

      const extension =
        selectedFile.name.split(".").pop() || "jpg";

      const cleanFileName = selectedFile.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const uniqueFileName = `${Date.now()}-${cleanFileName}.${extension}`;

      const filePath = `${folder}/${uniqueFileName}`;

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          contentType: selectedFile.type,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      onSelect(publicUrl);

      await loadFiles();
    } catch (error) {
      console.error("Upload media error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload the image."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Media library
          </h3>

          <p className="mt-1 text-xs text-white/35">
            Upload an image or choose an existing one.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadFiles()}
            disabled={isLoading || isUploading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/55 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={
                isLoading ? "animate-spin" : ""
              }
            />
            Refresh
          </button>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#b9945a] px-4 py-2.5 text-sm font-semibold text-[#111111] transition hover:bg-[#c7a46d]">
            {isUploading ? (
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
            ) : (
              <Upload size={17} />
            )}

            {isUploading
              ? "Uploading..."
              : "Upload image"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm text-red-300"
        >
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-56 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
            Loading images...
          </div>
        </div>
      ) : files.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center">
          <ImageIcon
            size={28}
            className="text-white/25"
          />

          <p className="mt-4 text-sm font-medium text-white/60">
            No images uploaded
          </p>

          <p className="mt-2 text-xs text-white/30">
            Upload the first image to this folder.
          </p>
        </div>
      ) : (
        <div className="grid max-h-[520px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => {
            const isSelected =
              value === file.publicUrl;

            return (
              <button
                key={file.path}
                type="button"
                onClick={() =>
                  onSelect(file.publicUrl)
                }
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border text-left transition ${
                  isSelected
                    ? "border-[#b9945a] ring-2 ring-[#b9945a]/25"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <img
                  src={file.publicUrl}
                  alt={file.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <p className="absolute bottom-3 left-3 right-3 truncate text-xs text-white/80">
                  {file.name}
                </p>

                {isSelected && (
                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#b9945a] text-[#111111]">
                    <Check size={16} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {value && (
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
            Selected image
          </p>

          <p className="mt-2 truncate text-sm text-white/55">
            {value}
          </p>
        </div>
      )}
    </div>
  );
}