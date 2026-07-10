import Link from "next/link";
import Image from "next/image";


export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ef] pt-28">
      <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl items-center justify-center px-5 py-16">
        <div className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">
          <div className="hidden bg-[#211711] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">
               
               <Image
                       src="/images/logo/janki-logo.png"
                       alt="Janki Elite Hotel"
                       width={10000}
                       height={1500}
                       priority
                       className="
                         h-20
                         w-auto
                         object-contain
                         transition-all
                         duration-300
                         group-hover:scale-105
                         sm:h-30
                       "
                     />
              </p>

              <h1 className="mt-8 text-4xl font-semibold leading-tight">
                Admin access for hotel management.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
                Login securely to update room prices, manage gallery images,
                and control hotel website content.
              </p>
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Admin Panel
            </p>
          </div>

          <div className="p-8 sm:p-12">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
                Welcome Back
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#211711]">
                Admin Login
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/55">
                Enter your admin email and password to continue.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-black/70"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="admin@jankielite.com"
                  className="h-13 w-full rounded-2xl border border-black/10 bg-[#f8f4ef] px-5 text-sm outline-none transition focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-black/70"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="h-13 w-full rounded-2xl border border-black/10 bg-[#f8f4ef] px-5 text-sm outline-none transition focus:border-[var(--primary)]"
                />
              </div>

              <Link
                href="/admin"
                className="inline-flex h-13 w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90"
              >
                Login
              </Link>
            </form>

            <p className="mt-8 text-center text-xs text-black/45">
              This area is only for authorized hotel administrators.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}