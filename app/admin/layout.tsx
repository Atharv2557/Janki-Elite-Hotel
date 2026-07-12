import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";


import { ExternalLink } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

type AdminLayoutProps = {
  children: ReactNode;
};

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Rooms",
    href: "/admin/rooms",
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
  },
  {
    label: "Contact",
    href: "/admin/contact",
  },
  {
    label: "WhatsApp",
    href: "/admin/whatsapp",
  },
];

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Top admin navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 w-full max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-8">
            <Link
              href="/admin"
              className="shrink-0 text-xl font-semibold tracking-wide text-white"
            >
              Janki Elite Admin
            </Link>

            <nav className="hidden  items-center gap-5 lg:flex">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    rounded-lg px-3 py-2
                    text-lg font-medium text-white/50
                    transition-colors duration-200
                    hover:bg-white/[0.05]
                    hover:text-[#c7a46d]
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-xs text-white/35">
                Signed in as
              </p>

              <p className="max-w-[220px] truncate text-sm text-white/70">
                {user.email}
              </p>
            </div>

            <Link
  href="/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-xl border border-[#b9945a]/30 bg-[#b9945a]/10 px-4 py-2 text-sm font-medium text-[#c7a46d] transition hover:bg-[#b9945a] hover:text-[#111111]"
>
  <ExternalLink size={16} />
  View Website
</Link>

            <div className="w-[130px]">
              <AdminLogoutButton />
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="overflow-x-auto border-t border-white/[0.06] lg:hidden">
          <nav className="flex min-w-max items-center gap-1 px-5 py-3 sm:px-8">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  rounded-lg px-3 py-2
                  text-sm font-medium text-white/50
                  transition-colors
                  hover:bg-white/[0.05]
                  hover:text-[#c7a46d]
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Admin page content */}
      <main className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8">
        {children}
      </main>
    </div>
  );
}