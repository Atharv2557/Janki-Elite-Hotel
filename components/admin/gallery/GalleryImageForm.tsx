"use client";

import {
  type ChangeEvent,
  type FormEvent,
    type ReactNode,
  useRef,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  Save,
  UploadCloud,
} from "lucide-react";

import {
  createGalleryImageAction,
  updateGalleryImageAction,
} from "@/lib/actions/gallery";
import {
  galleryImageSchema,
  type GalleryImageFormValues,
} from "@/lib/validations/gallery";
import { createClient } from "@/lib/supabase/client";

type GalleryImageFormProps = {
  mode: "create" | "edit";
  imageId?: string;
  initialValues?: Partial<GalleryImageFormValues>;
};

type GalleryFieldErrors = Partial<
  Record<keyof GalleryImageFormValues, string>
>;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const galleryCategories = [
  {
    value: "hotel",
    label: "Hotel",
  },
  {
    value: "rooms",
    label: "Rooms",
  },
  {
    value: "dining",
    label: "Dining",
  },
  {
    value: "amenities",
    label: "Amenities",
  },
  {
    value: "events",
    label: "Events",
  },
];

const defaultValues: GalleryImageFormValues = {
  title: "",
  altText: "",
  category: "hotel",
  imageUrl: "",
  storagePath: "",
  displayOrder: 0,
  isPublished: true,
};

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
    baseName || "gallery-image"
  }-${crypto.randomUUID()}.${extension}`;
}

export default function GalleryImageForm({
  mode,
  imageId,
  initialValues,
}: GalleryImageFormProps) {
  const router = useRouter();

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const startingValues: GalleryImageFormValues = {
    ...defaultValues,
    ...initialValues,
  };

  const [values, setValues] =
    useState<GalleryImageFormValues>(
      startingValues
    );

  const [previousStoragePath] = useState(
    startingValues.storagePath
  );

  const [fieldErrors, setFieldErrors] =
    useState<GalleryFieldErrors>({});

  const [formError, setFormError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [isUploading, setIsUploading] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  const isBusy = isUploading || isPending;

  function updateField<
    K extends keyof GalleryImageFormValues
  >(
    field: K,
    value: GalleryImageFormValues[K]
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));

    setFormError("");
    setSuccessMessage("");
  }

  function openFilePicker() {
    if (isBusy) return;

    fileInputRef.current?.click();
  }

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    setFormError("");
    setSuccessMessage("");

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFormError(
        "Only JPG, PNG and WebP images are allowed."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFormError(
        "Image size cannot exceed 5 MB."
      );
      return;
    }

    try {
      setIsUploading(true);

      const supabase = createClient();

      const fileName = createSafeFileName(
        file.name
      );

      const categoryFolder =
        values.category || "hotel";

      const storagePath = `${categoryFolder}/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from("gallery-images")
          .upload(storagePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

      if (uploadError) {
        console.error(
          "Gallery upload error:",
          uploadError
        );

        setFormError(
          "Unable to upload the image. Please try again."
        );

        return;
      }

      const { data } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(storagePath);

      if (!data.publicUrl) {
        setFormError(
          "Image uploaded, but its public URL could not be created."
        );
        return;
      }

      setValues((currentValues) => ({
        ...currentValues,
        imageUrl: data.publicUrl,
        storagePath,
        altText:
          currentValues.altText ||
          currentValues.title ||
          file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " "),
      }));

      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        imageUrl: undefined,
        storagePath: undefined,
      }));
    } catch (error) {
      console.error(
        "Gallery image upload failed:",
        error
      );

      setFormError(
        "Unable to upload the image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isBusy) return;

    setFieldErrors({});
    setFormError("");
    setSuccessMessage("");

    const validationResult =
      galleryImageSchema.safeParse(values);

    if (!validationResult.success) {
      const nextErrors: GalleryFieldErrors =
        {};

      validationResult.error.issues.forEach(
        (issue) => {
          const fieldName =
            issue.path[0] as keyof GalleryImageFormValues;

          if (
            fieldName &&
            !nextErrors[fieldName]
          ) {
            nextErrors[fieldName] =
              issue.message;
          }
        }
      );

      setFieldErrors(nextErrors);
      setFormError(
        "Please correct the highlighted fields."
      );

      return;
    }

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createGalleryImageAction(
              validationResult.data
            )
          : await updateGalleryImageAction(
              imageId ?? "",
              validationResult.data,
              previousStoragePath
            );

      if (!result.success) {
        setFormError(result.message);
        setFieldErrors(
          result.fieldErrors ?? {}
        );
        return;
      }

      setSuccessMessage(result.message);

      router.push("/admin/gallery");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
      noValidate
    >
      {(formError || successMessage) && (
        <div
          role={formError ? "alert" : "status"}
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
            formError
              ? "border-red-400/20 bg-red-400/[0.08] text-red-300"
              : "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
          }`}
        >
          {formError ? (
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />
          ) : (
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />
          )}

          <span>
            {formError || successMessage}
          </span>
        </div>
      )}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b9945a]">
            Gallery Image
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Upload and preview
          </h2>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          disabled={isBusy}
          className="hidden"
        />

        {values.imageUrl ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={values.imageUrl}
                alt={
                  values.altText ||
                  values.title ||
                  "Gallery image preview"
                }
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
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

            <div className="border-t border-white/10 p-4">
              <button
                type="button"
                onClick={openFilePicker}
                disabled={isBusy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/65 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <UploadCloud size={17} />

                {mode === "edit"
                  ? "Replace image"
                  : "Choose another image"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={openFilePicker}
            disabled={isBusy}
            className="flex min-h-72 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-12 text-center transition hover:border-[#b9945a]/40 hover:bg-[#b9945a]/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
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
                  <ImagePlus size={25} />
                </div>

                <span className="mt-5 text-sm font-semibold text-white/75">
                  Choose image from computer
                </span>

                <span className="mt-2 text-xs text-white/30">
                  JPG, PNG or WebP · Maximum 5 MB
                </span>
              </>
            )}
          </button>
        )}

        {(fieldErrors.imageUrl ||
          fieldErrors.storagePath) && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={13} />

            {fieldErrors.imageUrl ||
              fieldErrors.storagePath}
          </p>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b9945a]">
            Image Information
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Details and visibility
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Image title"
            error={fieldErrors.title}
            hint="Optional"
          >
            <input
              type="text"
              value={values.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value
                )
              }
              placeholder="Hotel exterior"
              disabled={isBusy}
              className={getInputClass(
                Boolean(fieldErrors.title)
              )}
            />
          </FormField>

          <FormField
            label="Category"
            error={fieldErrors.category}
            required
          >
            <select
              value={values.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value
                )
              }
              disabled={isBusy}
              className={getInputClass(
                Boolean(fieldErrors.category)
              )}
            >
              {galleryCategories.map(
                (category) => (
                  <option
                    key={category.value}
                    value={category.value}
                    className="bg-[#111111]"
                  >
                    {category.label}
                  </option>
                )
              )}
            </select>
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Alt text"
              error={fieldErrors.altText}
              hint={`${values.altText.length}/180 characters`}
              required
            >
              <input
                type="text"
                value={values.altText}
                onChange={(event) =>
                  updateField(
                    "altText",
                    event.target.value
                  )
                }
                placeholder="Janki Elite Hotel exterior entrance"
                disabled={isBusy}
                className={getInputClass(
                  Boolean(fieldErrors.altText)
                )}
              />
            </FormField>
          </div>

          <FormField
            label="Display order"
            error={fieldErrors.displayOrder}
          >
            <input
              type="number"
              min="0"
              step="1"
              value={values.displayOrder}
              onChange={(event) =>
                updateField(
                  "displayOrder",
                  Number(event.target.value)
                )
              }
              disabled={isBusy}
              className={getInputClass(
                Boolean(
                  fieldErrors.displayOrder
                )
              )}
            />
          </FormField>

          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center justify-between gap-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div>
                <p className="text-sm font-medium text-white/80">
                  Published
                </p>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Show this image on the public gallery.
                </p>
              </div>

              <input
                type="checkbox"
                checked={values.isPublished}
                onChange={(event) =>
                  updateField(
                    "isPublished",
                    event.target.checked
                  )
                }
                disabled={isBusy}
                className="h-5 w-5 shrink-0 accent-[#b9945a]"
              />
            </label>
          </div>
        </div>
      </section>

      <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/35">
          {mode === "create"
            ? "Add this image to the hotel gallery."
            : "Save the changes made to this gallery image."}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/gallery")
            }
            disabled={isBusy}
            className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50 sm:flex-none"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#b9945a] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#c7a46d] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            {isBusy ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />

                {isUploading
                  ? "Uploading..."
                  : "Saving..."}
              </>
            ) : (
              <>
                <Save size={17} />

                {mode === "create"
                  ? "Add image"
                  : "Save changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
children: ReactNode;
};

function FormField({
  label,
  error,
  hint,
  required,
  children,
}: FormFieldProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-white/75">
          {label}

          {required && (
            <span className="ml-1 text-red-400">
              *
            </span>
          )}
        </label>

        {hint && (
          <span className="text-xs text-white/25">
            {hint}
          </span>
        )}
      </div>

      {children}

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

function getInputClass(hasError: boolean) {
  return `
    w-full rounded-xl border bg-white/[0.04]
    px-4 py-3 text-sm text-white
    outline-none transition-all duration-300
    placeholder:text-white/20
    disabled:cursor-not-allowed disabled:opacity-50
    ${
      hasError
        ? "border-red-400/60 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
        : "border-white/10 focus:border-[#b9945a] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#b9945a]/10"
    }
  `;
}