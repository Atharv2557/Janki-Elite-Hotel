import Link from "next/link";

const adminCards = [
  {
    title: "Room Prices",
    description: "Update room categories, seasonal pricing, offers, and live website prices.",
    href: "/admin/rooms",
    number: "01",
  },
  {
    title: "Gallery Photos",
    description: "Upload luxury visuals, remove outdated images, and manage gallery presentation.",
    href: "/admin/gallery",
    number: "02",
  },
  {
    title: "Hotel Contact",
    description:"Update hotel phone number, email address, address, and contact details.",
    href: "/admin/contact",
    number: "03",
  },
  {
    title: "WhatsApp Enquiry",
    description: "Update the WhatsApp number and default message used for enquiry buttons.",
    href: "/admin/whatsapp",
    number: "04",
  },

];

export default function AdminPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#120b07] pt-8 text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:py-16">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#c89b5f]/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-[#8b5e34]/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[#d4af7a]/10 blur-[90px]" />

        <div className="relative z-10">
          <div className="mb-12 max-w-3xl">
            <p className="text-3xl font-semibold uppercase tracking-[0.4em] text-[#d4af7a]/80">
              Admin Panel
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Manage Janki Elite with calm control.
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/55">
              Update pricing, gallery visuals, and premium hotel content from
              one elegant dashboard designed for smooth daily management.
            </p>
          </div>

          {/* Top Status Bar */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(212,175,122,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                Website
              </p>
              <h3 className="mt-3 text-lg font-medium text-[#f5d7a1]">
                Live
              </h3>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(212,175,122,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                Access
              </p>
              <h3 className="mt-3 text-lg font-medium text-[#f5d7a1]">
                Admin
              </h3>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(212,175,122,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                Mode
              </p>
              <h3 className="mt-3 text-lg font-medium text-[#f5d7a1]">
                Content Control
              </h3>
            </div>
          </div>

          {/* Admin Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {adminCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/10
                  bg-gradient-to-br
                  from-white/[0.09]
                  via-white/[0.045]
                  to-white/[0.025]
                  p-7
                  shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                  backdrop-blur-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#d4af7a]/45
                  hover:shadow-[0_24px_100px_rgba(212,175,122,0.16)]
                "
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af7a]/10 blur-3xl transition duration-500 group-hover:bg-[#d4af7a]/20" />

                <div className="relative z-10">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af7a]/70">
                      {card.number}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af7a]/25 text-[#d4af7a] transition duration-500 group-hover:bg-[#d4af7a] group-hover:text-[#211711]">
                      →
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold text-white">
                    {card.title}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/50">
                    {card.description}
                  </p>

                  <div className="mt-9 h-px w-full bg-gradient-to-r from-[#d4af7a]/0 via-[#d4af7a]/35 to-[#d4af7a]/0" />

                  <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.28em] text-[#f5d7a1]">
                    Manage Section
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}