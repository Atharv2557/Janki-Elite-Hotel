"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminContactPage() {
  const [phone, setPhone] = useState("+91 98765 43210");
  const [secondaryPhone, setSecondaryPhone] = useState("+91 91234 56789");
  const [email, setEmail] = useState("info@jankielite.com");
  const [address, setAddress] = useState(
    "Janki Elite Hotel, Jaipur, Rajasthan"
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    console.log("Hotel contact details ready for backend:", {
      phone,
      secondaryPhone,
      email,
      address,
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#120b07] pt-8 text-white">
      <section className="relative mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#c89b5f]/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-[#8b5e34]/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[#d4af7a]/10 blur-[90px]" />

        <div className="relative z-10">
          <Link
            href="/admin"
            className="
              mb-8
              inline-flex
              h-12
              items-center
              justify-center
              rounded-full
              border
              border-[#d4af7a]/25
              bg-[#d4af7a]/10
              px-6
              text-xs
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#f5d7a1]
              shadow-[0_14px_50px_rgba(212,175,122,0.10)]
              backdrop-blur-xl
              transition
              duration-300
              hover:-translate-y-1
              hover:border-[#d4af7a]/55
              hover:bg-[#d4af7a]
              hover:text-[#211711]
              hover:shadow-[0_18px_70px_rgba(212,175,122,0.25)]
            "
          >
            ← Back to Dashboard
          </Link>

          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af7a]/80">
                Hotel Contact
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Update contact details.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/55">
                Manage hotel phone numbers, email, and address. Later these
                values will update the contact page, footer, and enquiry
                sections.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="
                inline-flex
                h-13
                items-center
                justify-center
                rounded-full
                bg-[#d4af7a]
                px-8
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#211711]
                shadow-[0_18px_60px_rgba(212,175,122,0.28)]
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-[#f5d7a1]
                hover:shadow-[0_22px_80px_rgba(212,175,122,0.4)]
              "
            >
              Save Contact
            </button>
          </div>

          {saved && (
            <div className="mb-8 rounded-[22px] border border-[#d4af7a]/25 bg-[#d4af7a]/10 px-5 py-4 text-sm text-[#f5d7a1]">
              Contact details saved in frontend state. Backend connection will
              be added later.
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af7a]/75">
                  Contact Form
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Hotel details
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    Primary Phone Number
                  </label>

                  <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setSaved(false);
                    }}
                    className="h-13 w-full rounded-2xl border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d4af7a]/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="secondaryPhone"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    Secondary Phone Number
                  </label>

                  <input
                    id="secondaryPhone"
                    type="text"
                    value={secondaryPhone}
                    onChange={(event) => {
                      setSecondaryPhone(event.target.value);
                      setSaved(false);
                    }}
                    className="h-13 w-full rounded-2xl border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d4af7a]/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    Hotel Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setSaved(false);
                    }}
                    className="h-13 w-full rounded-2xl border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d4af7a]/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    Hotel Address
                  </label>

                  <textarea
                    id="address"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                      setSaved(false);
                    }}
                    rows={6}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#d4af7a]/60"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.035] to-white/[0.02] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af7a]/75">
                  Live Preview
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Public contact card
                </h2>
              </div>

              <div className="rounded-[30px] border border-[#d4af7a]/15 bg-[#211711]/45 p-7 shadow-[inset_0_0_80px_rgba(212,175,122,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af7a]/75">
                  Janki Elite
                </p>

                <h3 className="mt-5 text-3xl font-semibold text-white">
                  Contact Information
                </h3>

                <div className="mt-8 space-y-5">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                      Primary Phone
                    </p>
                    <p className="mt-2 text-lg text-[#f5d7a1]">{phone}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                      Secondary Phone
                    </p>
                    <p className="mt-2 text-lg text-[#f5d7a1]">
                      {secondaryPhone}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                      Email
                    </p>
                    <p className="mt-2 text-lg text-[#f5d7a1]">{email}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                      Address
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-white/50 backdrop-blur-xl">
            <span className="font-medium text-[#f5d7a1]">Developer note:</span>{" "}
            Later, this page will save contact details to database. Your footer,
            contact page, and enquiry buttons can fetch the same saved contact
            data.
          </div>
        </div>
      </section>
    </main>
  );
}