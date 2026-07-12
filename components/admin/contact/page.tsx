import { MessageSquare } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function AdminContactPage() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("contact_inquiries")
    .select("*", {
      count: "exact",
      head: true,
    });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
          Contact Management
        </p>

        <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          Contact inquiries
        </h1>

        <p className="mt-3 text-sm text-white/40">
          Total inquiries received from the contact form.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.08] px-5 py-4 text-sm text-red-300">
          Unable to load inquiry count.
        </div>
      ) : (
        <div className="max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm text-white/40">
                Total inquiries
              </p>

              <p className="mt-3 text-5xl font-semibold text-white">
                {count ?? 0}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#b9945a]/20 bg-[#b9945a]/10 text-[#c7a46d]">
              <MessageSquare size={22} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}