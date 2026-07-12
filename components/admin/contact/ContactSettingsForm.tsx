"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useState,
  useTransition,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Save,
  Timer,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { updateContactSettingsAction } from "@/lib/actions/contact-settings";
import {
  contactSettingsSchema,
  type ContactSettingsFormValues,
} from "@/lib/validations/contact-settings";

type ContactSettingsFormProps = {
  settingsId: string;
  initialValues: ContactSettingsFormValues;
};

type ContactSettingsFieldErrors = Partial<
  Record<keyof ContactSettingsFormValues, string>
>;

export default function ContactSettingsForm({
  settingsId,
  initialValues,
}: ContactSettingsFormProps) {
  const [values, setValues] =
    useState<ContactSettingsFormValues>(
      initialValues
    );

const router = useRouter();

  const [fieldErrors, setFieldErrors] =
    useState<ContactSettingsFieldErrors>({});

  const [formError, setFormError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const fieldName =
      event.target
        .name as keyof ContactSettingsFormValues;

    const value = event.target.value;

    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));

    setFormError("");
    setSuccessMessage("");
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isPending) return;

    setFieldErrors({});
    setFormError("");
    setSuccessMessage("");

    const validationResult =
      contactSettingsSchema.safeParse(values);

    if (!validationResult.success) {
      const nextErrors: ContactSettingsFieldErrors =
        {};

      validationResult.error.issues.forEach(
        (issue) => {
          const fieldName =
            issue.path[0] as keyof ContactSettingsFormValues;

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
        await updateContactSettingsAction(
          settingsId,
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
      setValues(validationResult.data);


router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8"
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
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
            Contact Information
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Public hotel details
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/35">
            These details will be shown on the public contact page.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Email address"
            error={fieldErrors.email}
            icon={<Mail size={16} />}
            required
          >
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="info@jankielite.com"
              disabled={isPending}
              className={getInputClass(
                Boolean(fieldErrors.email)
              )}
            />
          </FormField>

          <FormField
            label="Primary phone"
            error={fieldErrors.primaryPhone}
            icon={<Phone size={16} />}
            required
          >
            <input
              name="primaryPhone"
              type="tel"
              value={values.primaryPhone}
              onChange={handleChange}
              placeholder="+91 92969 09499"
              disabled={isPending}
              className={getInputClass(
                Boolean(
                  fieldErrors.primaryPhone
                )
              )}
            />
          </FormField>


<FormField
  label="Secondary phone"
  error={fieldErrors.secondaryPhone}
  icon={<Phone size={16} />}
>
  <input
    name="secondaryPhone"
    type="tel"
    value={values.secondaryPhone}
    onChange={handleChange}
    placeholder="+91 89214 90491"
    disabled={isPending}
    className={getInputClass(
      Boolean(fieldErrors.secondaryPhone)
    )}
  />
</FormField>



          <FormField
            label="WhatsApp number"
            error={fieldErrors.whatsappNumber}
            icon={<Phone size={16} />}
            hint="Digits only"
            required
          >
            <input
              name="whatsappNumber"
              type="text"
              inputMode="numeric"
              value={values.whatsappNumber}
              onChange={handleChange}
              placeholder="919296909499"
              disabled={isPending}
              className={getInputClass(
                Boolean(
                  fieldErrors.whatsappNumber
                )
              )}
            />
          </FormField>

          <FormField
            label="Working hours"
            error={fieldErrors.workingHours}
            icon={<Timer size={16} />}
          >
            <input
              name="workingHours"
              type="text"
              value={values.workingHours}
              onChange={handleChange}
              placeholder="Open daily, 24 hours"
              disabled={isPending}
              className={getInputClass(
                Boolean(
                  fieldErrors.workingHours
                )
              )}
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Hotel address"
              error={fieldErrors.address}
              icon={<MapPin size={16} />}
              required
            >
              <textarea
                name="address"
                rows={4}
                value={values.address}
                onChange={handleChange}
                placeholder="Enter the full hotel address"
                disabled={isPending}
                className={getTextareaClass(
                  Boolean(
                    fieldErrors.address
                  )
                )}
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField
              label="Google Maps URL"
              error={fieldErrors.mapUrl}
              icon={<MapPin size={16} />}
              hint="Optional"
            >
              <input
                name="mapUrl"
                type="url"
                value={values.mapUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
                disabled={isPending}
                className={getInputClass(
                  Boolean(
                    fieldErrors.mapUrl
                  )
                )}
              />
            </FormField>
          </div>
        </div>
      </section>

      <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/35">
          Save changes to update the public contact details.
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b9945a] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#c7a46d] disabled:cursor-not-allowed disabled:opacity-60"
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
              Save contact details
            </>
          )}
        </button>
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

function FormField({
  label,
  error,
  hint,
  required,
  icon,
  children,
}: FormFieldProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-white/75">
          {icon && (
            <span className="text-[#b9945a]">
              {icon}
            </span>
          )}

          <span>
            {label}

            {required && (
              <span className="ml-1 text-red-400">
                *
              </span>
            )}
          </span>
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

function getInputClass(
  hasError: boolean
) {
  return `
    w-full rounded-xl border bg-white/[0.04]
    px-4 py-3 text-sm text-white
    outline-none transition-all duration-300
    placeholder:text-white/20
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${
      hasError
        ? "border-red-400/60 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
        : "border-white/10 focus:border-[#b9945a] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#b9945a]/10"
    }
  `;
}

function getTextareaClass(
  hasError: boolean
) {
  return `
    w-full resize-none rounded-2xl border
    bg-white/[0.04] px-4 py-3
    text-sm text-white outline-none
    transition-all duration-300
    placeholder:text-white/20
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${
      hasError
        ? "border-red-400/60 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
        : "border-white/10 focus:border-[#b9945a] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#b9945a]/10"
    }
  `;
}