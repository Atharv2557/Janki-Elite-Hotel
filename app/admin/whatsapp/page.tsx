"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminWhatsappPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("919876543210");
  const [defaultMessage, setDefaultMessage] = useState(
    "Hello Janki Elite, I want to inquire about room booking."
  );
  const [saved, setSaved] = useState(false);

  const previewLink = useMemo(() => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      defaultMessage
    )}`;
  }, [whatsappNumber, defaultMessage]);

  function handleSave() {
    setSaved(true);

    console.log("WhatsApp enquiry settings ready for backend:", {
      whatsappNumber,
      defaultMessage,
      previewLink,
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
                WhatsApp Enquiry
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Update WhatsApp enquiry.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/55">
                Manage the WhatsApp number and default enquiry message used
                across room cards, booking buttons, and contact CTAs.
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
              Save WhatsApp
            </button>
          </div>

          {saved && (
            <div className="mb-8 rounded-[22px] border border-[#d4af7a]/25 bg-[#d4af7a]/10 px-5 py-4 text-sm text-[#f5d7a1]">
              WhatsApp enquiry settings saved in frontend state. Backend
              connection will be added later.
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af7a]/75">
                  WhatsApp Form
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Enquiry settings
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="whatsappNumber"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    WhatsApp Number
                  </label>

                  <input
                    id="whatsappNumber"
                    type="text"
                    value={whatsappNumber}
                    onChange={(event) => {
                      setWhatsappNumber(event.target.value);
                      setSaved(false);
                    }}
                    placeholder="919876543210"
                    className="h-13 w-full rounded-2xl border border-white/10 bg-black/25 px-5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d4af7a]/60"
                  />

                  <p className="mt-2 text-xs leading-6 text-white/35">
                    Use country code without plus sign. Example:
                    91XXXXXXXXXX
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="defaultMessage"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    Default Enquiry Message
                  </label>

                  <textarea
                    id="defaultMessage"
                    value={defaultMessage}
                    onChange={(event) => {
                      setDefaultMessage(event.target.value);
                      setSaved(false);
                    }}
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#d4af7a]/60"
                  />
                </div>

                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    h-13
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d4af7a]/30
                    bg-[#d4af7a]/10
                    px-8
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#f5d7a1]
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#d4af7a]
                    hover:text-[#211711]
                  "
                >
                  Test WhatsApp Link
                </a>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.035] to-white/[0.02] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af7a]/75">
                  Live Preview
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  WhatsApp enquiry button
                </h2>
              </div>

              <div className="rounded-[30px] border border-[#d4af7a]/15 bg-[#211711]/45 p-7 shadow-[inset_0_0_80px_rgba(212,175,122,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af7a]/75">
                  Preview CTA
                </p>

                <h3 className="mt-5 text-3xl font-semibold text-white">
                  Room Enquiry
                </h3>

                <p className="mt-4 text-sm leading-8 text-white/55">
                  This is how your enquiry button can work on room cards,
                  contact page, and booking sections.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                    Number
                  </p>
                  <p className="mt-2 text-lg text-[#f5d7a1]">
                    {whatsappNumber}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                    Message
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/65">
                    {defaultMessage}
                  </p>
                </div>

                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-13 w-full items-center justify-center rounded-full bg-[#d4af7a] px-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#211711] shadow-[0_18px_60px_rgba(212,175,122,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#f5d7a1]"
                >
                  Open WhatsApp Preview
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-white/50 backdrop-blur-xl">
            <span className="font-medium text-[#f5d7a1]">Developer note:</span>{" "}
            Later, this page will save WhatsApp settings in database. Then every
            enquiry button will use this number and message dynamically.
          </div>
        </div>
      </section>
    </main>
  );
}