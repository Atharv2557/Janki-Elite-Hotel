"use client";

import {
  type FormEvent, 
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  AlertCircle,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import {
  adminLoginSchema,
  type AdminLoginValues,
} from "@/lib/validations/admin-login";

export default function LoginForm() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [errors, setErrors] = useState<
    Partial<Record<keyof AdminLoginValues, string>>
  >({});

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    setErrors({});
    setFormError("");

    const validationResult = adminLoginSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const nextErrors: Partial<
        Record<keyof AdminLoginValues, string>
      > = {};

      validationResult.error.issues.forEach((issue) => {
        const fieldName =
          issue.path[0] as keyof AdminLoginValues;

        if (!nextErrors[fieldName]) {
          nextErrors[fieldName] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const supabase = createClient();

      const { error } =
        await supabase.auth.signInWithPassword({
          email: validationResult.data.email,
          password: validationResult.data.password,
        });

      if (error) {
        setFormError(
          "Invalid email address or password."
        );
        return;
      }

      
const requestedPath = searchParams.get("next");

const safeRedirect =
  requestedPath?.startsWith("/admin")
    ? requestedPath
    : "/admin";

router.replace(safeRedirect);
router.refresh();


    } catch (error) {
      console.error("Admin login error:", error);

      setFormError(
        "Unable to sign in right now. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEmailChange(
    value: string
  ) {
    setEmail(value);
    setFormError("");

    if (errors.email) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        email: undefined,
      }));
    }
  }

  function handlePasswordChange(
    value: string
  ) {
    setPassword(value);
    setFormError("");

    if (errors.password) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        password: undefined,
      }));
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-4 py-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#b9945a]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/[0.04] blur-3xl" />

      <section
        className="
          relative z-10
          grid w-full max-w-6xl
          overflow-hidden
          rounded-[28px]
          border border-white/10
          bg-[#111111]
          shadow-[0_30px_100px_rgba(0,0,0,0.65)]
          lg:grid-cols-[1.1fr_0.9fr]
        "
      >
        {/* Left branding panel */}
        <div
          className="
            relative hidden
            min-h-[560px]
            overflow-hidden
            bg-[#0b0b0b]
            p-10
            text-white
            lg:flex lg:flex-col lg:justify-between
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,148,90,0.22),transparent_42%)]" />

          <div className="relative z-10">
            <Link
              href="/"
              className="relative block h-[150px] w-[250px]"
              aria-label="Go to Janki Elite homepage"
            >
              <Image
                src="/images/logo/janki-logo.png"
                alt="Janki Elite Hotel"
                fill
                priority
                sizes="250px"
                className="object-contain object-left"
              />
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="mb-4 text-base font-medium uppercase tracking-[0.3em] text-[#c7a46d]">
              Hotel Administration
            </p>

            <h1 className="font-serif text-4xl leading-[1.15] xl:text-[44px]">
              Manage your hotel with clarity and confidence.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Update rooms, gallery images, contact information
              and WhatsApp enquiries from one secure dashboard.
            </p>
          </div>

          <p className="relative z-10 text-xs text-white/30">
            © {new Date().getFullYear()} Janki Elite Hotel
          </p>
        </div>

        {/* Login form panel */}
        <div className="flex min-h-[560px] items-center px-6 py-8 sm:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-[410px]">
            <div className="mb-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[#c7a46d]">
                <LockKeyhole size={20} />
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#b9945a]">
                Admin Access
              </p>

              <h2 className="font-serif text-4xl text-white">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Enter your admin credentials to access the dashboard.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/75"
                >
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={18}
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-white/25
                      transition-colors
                      group-focus-within:text-[#b9945a]
                    "
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      handleEmailChange(event.target.value)
                    }
                    autoComplete="email"
                    inputMode="email"
                    placeholder="admin@jankielite.com"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "email-error"
                        : undefined
                    }
                    className={`
                      w-full rounded-xl
                      border bg-white/[0.04]
                      py-3.5 pl-12 pr-4
                      text-sm text-white
                      outline-none
                      transition-all duration-300
                      placeholder:text-white/20
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      ${
                        errors.email
                          ? "border-red-400/60 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
                          : "border-white/10 focus:border-[#b9945a] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#b9945a]/10"
                      }
                    `}
                  />
                </div>

                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle size={13} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-white/75"
                  >
                    Password
                  </label>

                  <span className="text-xs font-medium text-white/25">
                    Secure access
                  </span>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    size={18}
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-white/25
                      transition-colors
                      group-focus-within:text-[#b9945a]
                    "
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      handlePasswordChange(event.target.value)
                    }
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "password-error"
                        : undefined
                    }
                    className={`
                      w-full rounded-xl
                      border bg-white/[0.04]
                      py-3.5 pl-12 pr-12
                      text-sm text-white
                      outline-none
                      transition-all duration-300
                      placeholder:text-white/20
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      ${
                        errors.password
                          ? "border-red-400/60 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
                          : "border-white/10 focus:border-[#b9945a] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#b9945a]/10"
                      }
                    `}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (currentValue) => !currentValue
                      )
                    }
                    disabled={isSubmitting}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-white/25
                      transition-colors
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle size={13} />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Authentication error */}
              {formError && (
                <div
                  role="alert"
                  className="
                    flex items-start gap-2.5
                    rounded-xl
                    border border-red-400/20
                    bg-red-400/[0.08]
                    px-4 py-3
                    text-sm text-red-300
                  "
                >
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{formError}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-xl
                  bg-[#b9945a]
                  px-6 py-3.5
                  text-sm font-semibold text-[#111111]
                  shadow-[0_14px_35px_rgba(185,148,90,0.18)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#c7a46d]
                  hover:shadow-[0_18px_42px_rgba(185,148,90,0.25)]
                  active:translate-y-0
                  disabled:pointer-events-none
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign in to dashboard"
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-5 text-center">
              <Link
                href="/"
                className="text-sm font-medium text-white/30 transition-colors hover:text-[#b9945a]"
              >
                ← Return to hotel website
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}