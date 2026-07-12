"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";

import { Reveal } from "@/components/ui";
import { createContactInquiryAction } from "@/lib/actions/contact";
import {
  contactInquirySchema,
  type ContactInquiryFormValues,
} from "@/lib/validations/contact";

type ContactFormSectionProps = {
  whatsappNumber?: string;
};

type ContactFieldErrors = Partial<
  Record<keyof ContactInquiryFormValues, string>
>;

const initialFormData: ContactInquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactFormSection({
  whatsappNumber = "919653730199",
}: ContactFormSectionProps) {
  const [formData, setFormData] =
    useState<ContactInquiryFormValues>(
      initialFormData
    );

  const [fieldErrors, setFieldErrors] =
    useState<ContactFieldErrors>({});

  const [formError, setFormError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const fieldName =
      event.target
        .name as keyof ContactInquiryFormValues;

    const value = event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));

    setFormError("");
    setSuccessMessage("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    setFormError("");
    setSuccessMessage("");
    setFieldErrors({});

    const validationResult =
      contactInquirySchema.safeParse(
        formData
      );

    if (!validationResult.success) {
      const nextErrors: ContactFieldErrors =
        {};

      validationResult.error.issues.forEach(
        (issue) => {
          const fieldName =
            issue.path[0] as keyof ContactInquiryFormValues;

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

    /*
      Window submit click ke time open kar rahe hain,
      taki browser WhatsApp popup ko block na kare.
    */
    const whatsappWindow = window.open(
      "",
      "_blank"
    );

    try {
      setIsSubmitting(true);

      const result =
        await createContactInquiryAction(
          validationResult.data
        );

      if (!result.success) {
        whatsappWindow?.close();

        setFormError(result.message);
        setFieldErrors(
          result.fieldErrors ?? {}
        );

        return;
      }

      const whatsappMessage = `
Hello Janki Elite,

I want to make a contact inquiry.

Name: ${validationResult.data.name}
Email: ${validationResult.data.email}
Phone: ${validationResult.data.phone || "Not provided"}
Subject: ${validationResult.data.subject || "General inquiry"}

Message:
${validationResult.data.message}
`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      if (whatsappWindow) {
        whatsappWindow.location.href =
          whatsappUrl;
      } else {
        window.location.href =
          whatsappUrl;
      }

      setSuccessMessage(
        "Inquiry submitted successfully. Opening WhatsApp..."
      );

      setFormData(initialFormData);
      setFieldErrors({});
    } catch (error) {
      whatsappWindow?.close();

      console.error(
        "Contact form submission error:",
        error
      );

      setFormError(
        "Unable to submit your inquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const directWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Janki Elite, I want to make an inquiry."
  )}`;

  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="h-full rounded-[2rem] bg-[#211711] p-8 text-white md:p-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Inquiry
            </p>

            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Plan Your Stay With Us
            </h2>

            <p className="mt-6 leading-8 text-white/70">
              Fill out the form and our team
              will get back to you with room
              availability, pricing, and
              booking details.
            </p>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-[var(--primary)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#211711]"
            >
              WhatsApp Inquiry
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-10"
          >
            {(formError ||
              successMessage) && (
              <div
                role={
                  formError
                    ? "alert"
                    : "status"
                }
                className={`mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                  formError
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
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
                  {formError ||
                    successMessage}
                </span>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                error={fieldErrors.name}
                disabled={isSubmitting}
              />

              <FormInput
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                disabled={isSubmitting}
              />

              <FormInput
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                error={fieldErrors.phone}
                disabled={isSubmitting}
              />

              <FormInput
                name="subject"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                error={fieldErrors.subject}
                disabled={isSubmitting}
              />
            </div>

            <div className="mt-5">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full resize-none rounded-[1.5rem] border px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  fieldErrors.message
                    ? "border-red-400 bg-red-50/40 focus:border-red-500"
                    : "border-black/10 focus:border-[var(--primary)]"
                }`}
              />

              {fieldErrors.message && (
                <p className="mt-2 flex items-center gap-1.5 px-2 text-xs text-red-600">
                  <AlertCircle size={13} />
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#211711] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={17} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

type FormInputProps = {
  name: keyof ContactInquiryFormValues;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
};

function FormInput({
  name,
  type,
  placeholder,
  value,
  error,
  disabled,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-full border px-5 py-4 outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${
          error
            ? "border-red-400 bg-red-50/40 focus:border-red-500"
            : "border-black/10 focus:border-[var(--primary)]"
        }`}
      />

      {error && (
        <p className="mt-2 flex items-center gap-1.5 px-2 text-xs text-red-600">
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}