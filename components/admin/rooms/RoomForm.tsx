"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

import RoomGalleryUploader from "./RoomGalleryUploader";

import RoomImageUploader from "./RoomImageUploader";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import {
  createRoomAction,
  updateRoomAction,
} from "@/lib/actions/rooms";
import {
  roomSchema,
  type RoomFormValues,
} from "@/lib/validations/room";

type RoomFormProps = {
  mode: "create" | "edit";
  roomId?: string;
  initialValues?: Partial<RoomFormValues>;
};

type RoomFieldErrors = Partial<
  Record<keyof RoomFormValues, string>
>;

const defaultValues: RoomFormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  pricePerNight: 0,
  capacity: 2,
  roomSize: "",
  heroImage: "",
  galleryImages: [],
  amenities: [],
  isFeatured: false,
  isPublished: true,
  displayOrder: 0,
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function RoomForm({
  mode,
  roomId,
  initialValues,
}: RoomFormProps) {
  const router = useRouter();

  const startingValues = useMemo<RoomFormValues>(
    () => ({
      ...defaultValues,
      ...initialValues,
      galleryImages:
        initialValues?.galleryImages ?? [],
      amenities: initialValues?.amenities ?? [],
    }),
    [initialValues]
  );

  const [values, setValues] =
    useState<RoomFormValues>(startingValues);

  

  const [amenityInput, setAmenityInput] =
    useState("");

  const [fieldErrors, setFieldErrors] =
    useState<RoomFieldErrors>({});

  const [formError, setFormError] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  function updateField<K extends keyof RoomFormValues>(
    field: K,
    value: RoomFormValues[K]
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

  function handleTitleChange(title: string) {
    setValues((currentValues) => {
      const oldAutomaticSlug = createSlug(
        currentValues.title
      );

      const shouldUpdateSlug =
        mode === "create" &&
        (currentValues.slug === "" ||
          currentValues.slug === oldAutomaticSlug);

      return {
        ...currentValues,
        title,
        slug: shouldUpdateSlug
          ? createSlug(title)
          : currentValues.slug,
      };
    });

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      title: undefined,
      slug: undefined,
    }));

    setFormError("");
    setSuccessMessage("");
  }




  function addAmenity() {
    const amenity = amenityInput.trim();

    if (!amenity) return;

    const alreadyExists = values.amenities.some(
      (currentAmenity) =>
        currentAmenity.toLowerCase() ===
        amenity.toLowerCase()
    );

    if (alreadyExists) {
      setFormError(
        "This amenity has already been added."
      );
      return;
    }

    if (values.amenities.length >= 30) {
      setFormError(
        "You can add a maximum of 30 amenities."
      );
      return;
    }

    updateField("amenities", [
      ...values.amenities,
      amenity,
    ]);

    setAmenityInput("");
  }

  function removeAmenity(index: number) {
    updateField(
      "amenities",
      values.amenities.filter(
        (_, amenityIndex) =>
          amenityIndex !== index
      )
    );
  }



  function handleAmenityKeyDown(
    event: KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      addAmenity();
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setFieldErrors({});
    setFormError("");
    setSuccessMessage("");

    const validationResult =
      roomSchema.safeParse(values);

    if (!validationResult.success) {
      const nextErrors: RoomFieldErrors = {};

      validationResult.error.issues.forEach(
        (issue) => {
          const fieldName =
            issue.path[0] as keyof RoomFormValues;

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
          ? await createRoomAction(
              validationResult.data
            )
          : await updateRoomAction(
              roomId ?? "",
              validationResult.data
            );

      if (!result.success) {
        setFormError(result.message);
        setFieldErrors(
          result.fieldErrors ?? {}
        );
        return;
      }

      setSuccessMessage(result.message);

      if (mode === "create") {
        router.push("/admin/rooms");
        router.refresh();
        return;
      }

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
        <SectionHeading
          eyebrow="Basic Information"
          title="Room details"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Room title"
            error={fieldErrors.title}
            required
          >
            <input
              type="text"
              value={values.title}
              onChange={(event) =>
                handleTitleChange(
                  event.target.value
                )
              }
              placeholder="Deluxe Room"
              disabled={isPending}
              className={getInputClass(
                Boolean(fieldErrors.title)
              )}
            />
          </FormField>

          <FormField
            label="Slug"
            error={fieldErrors.slug}
            hint="Used for the room URL"
            required
          >
            <input
              type="text"
              value={values.slug}
              onChange={(event) =>
                updateField(
                  "slug",
                  createSlug(event.target.value)
                )
              }
              placeholder="deluxe-room"
              disabled={isPending}
              className={getInputClass(
                Boolean(fieldErrors.slug)
              )}
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Short description"
              error={
                fieldErrors.shortDescription
              }
             hint={`${(values.shortDescription ?? "").length}/220 characters`}
            >
              <textarea
                value={values.shortDescription}
                onChange={(event) =>
                  updateField(
                    "shortDescription",
                    event.target.value
                  )
                }
                placeholder="A short summary shown on room cards."
                rows={3}
                disabled={isPending}
                className={getInputClass(
                  Boolean(
                    fieldErrors.shortDescription
                  )
                )}
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField
              label="Full description"
              error={fieldErrors.description}
             hint={`${(values.description ?? "").length}/3000 characters`}
            >
              <textarea
                value={values.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Describe the room experience, interiors and facilities."
                rows={7}
                disabled={isPending}
                className={getInputClass(
                  Boolean(
                    fieldErrors.description
                  )
                )}
              />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <SectionHeading
          eyebrow="Pricing & Capacity"
          title="Booking information"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FormField
            label="Price per night"
            error={fieldErrors.pricePerNight}
            required
          >
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.pricePerNight}
              onChange={(event) =>
                updateField(
                  "pricePerNight",
                  Number(event.target.value)
                )
              }
              disabled={isPending}
              className={getInputClass(
                Boolean(
                  fieldErrors.pricePerNight
                )
              )}
            />
          </FormField>

          <FormField
            label="Guest capacity"
            error={fieldErrors.capacity}
            required
          >
            <input
              type="number"
              min="1"
              step="1"
              value={values.capacity}
              onChange={(event) =>
                updateField(
                  "capacity",
                  Number(event.target.value)
                )
              }
              disabled={isPending}
              className={getInputClass(
                Boolean(fieldErrors.capacity)
              )}
            />
          </FormField>

          <FormField
            label="Room size"
            error={fieldErrors.roomSize}
          >
            <input
              type="text"
              value={values.roomSize}
              onChange={(event) =>
                updateField(
                  "roomSize",
                  event.target.value
                )
              }
              placeholder="320 sq. ft."
              disabled={isPending}
              className={getInputClass(
                Boolean(fieldErrors.roomSize)
              )}
            />
          </FormField>

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
              disabled={isPending}
              className={getInputClass(
                Boolean(
                  fieldErrors.displayOrder
                )
              )}
            />
          </FormField>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
  <SectionHeading
    eyebrow="Images"
    title="Room media"
  />

  <div className="space-y-8">
    {/* Hero image uploader */}
    <div>
      <RoomImageUploader
        label="Hero image"
        value={values.heroImage}
        disabled={isPending}
        onChange={(imageUrl) =>
          updateField("heroImage", imageUrl)
        }
      />

      {fieldErrors.heroImage && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={13} />
          {fieldErrors.heroImage}
        </p>
      )}
    </div>

    {/* Gallery images uploader */}
    <div>
      <RoomGalleryUploader
        value={values.galleryImages}
        disabled={isPending}
        onChange={(images) =>
          updateField("galleryImages", images)
        }
      />

      {fieldErrors.galleryImages && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={13} />
          {fieldErrors.galleryImages}
        </p>
      )}
    </div>
  </div>
</section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <SectionHeading
          eyebrow="Amenities"
          title="Guest facilities"
        />

        <FormField
          label="Add amenity"
          error={fieldErrors.amenities}
          hint={`${values.amenities.length}/30 amenities`}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={amenityInput}
              onChange={(event) =>
                setAmenityInput(
                  event.target.value
                )
              }
              onKeyDown={handleAmenityKeyDown}
              placeholder="Free Wi-Fi"
              disabled={isPending}
              className={getInputClass(false)}
            />

            <button
              type="button"
              onClick={addAmenity}
              disabled={
                isPending || !amenityInput.trim()
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={17} />
              Add amenity
            </button>
          </div>
        </FormField>

        {values.amenities.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {values.amenities.map(
              (amenity, index) => (
                <div
                  key={`${amenity}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/65"
                >
                  <span>{amenity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      removeAmenity(index)
                    }
                    disabled={isPending}
                    aria-label={`Remove ${amenity}`}
                    className="text-white/30 transition hover:text-red-300 disabled:opacity-40"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <SectionHeading
          eyebrow="Visibility"
          title="Publishing settings"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ToggleField
            label="Published"
            description="Show this room on the public website."
            checked={values.isPublished}
            disabled={isPending}
            onChange={(checked) =>
              updateField(
                "isPublished",
                checked
              )
            }
          />

          <ToggleField
            label="Featured"
            description="Highlight this room in featured sections."
            checked={values.isFeatured}
            disabled={isPending}
            onChange={(checked) =>
              updateField(
                "isFeatured",
                checked
              )
            }
          />
        </div>
      </section>

      <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/35">
          {mode === "create"
            ? "Create a new room for the hotel website."
            : "Save changes made to this room."}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/rooms")
            }
            disabled={isPending}
            className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50 sm:flex-none"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#b9945a] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#c7a46d] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            {isPending ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />

                {mode === "create"
                  ? "Create room"
                  : "Save changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

function SectionHeading({
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b9945a]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-white">
        {title}
      </h2>
    </div>
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

type ToggleFieldProps = {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleField({
  label,
  description,
  checked,
  disabled,
  onChange,
}: ToggleFieldProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div>
        <p className="text-sm font-medium text-white/80">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-white/35">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="h-5 w-5 shrink-0 accent-[#b9945a]"
      />
    </label>
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