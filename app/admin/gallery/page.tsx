import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  ImageIcon,
  Plus,
} from "lucide-react";

import type { ReactNode } from "react";

import { createClient } from "@/lib/supabase/server";

type GalleryImageRow = {
  id: string;
  title: string | null;
  alt_text: string;
  category: string;
  image_url: string;
  storage_path: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export default async function AdminGalleryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .select(
      `
        id,
        title,
        alt_text,
        category,
        image_url,
        storage_path,
        display_order,
        is_published,
        created_at
      `
    )
    .order("display_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  const images = (data ?? []) as GalleryImageRow[];

  const publishedImages = images.filter(
    (image) => image.is_published
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
            Gallery Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
            Gallery media
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
            Upload, replace, publish and manage images shown
            on the hotel gallery page.
          </p>
        </div>

        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b9945a] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:-translate-y-0.5 hover:bg-[#c7a46d]"
        >
          <Plus size={17} />
          Upload image
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-400/20 bg-red-400/[0.08] px-5 py-4 text-sm text-red-300"
        >
          Unable to load gallery images. Check that the
          `gallery_images` table and its RLS policies exist.
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Total images"
          value={images.length}
          icon={<ImageIcon size={19} />}
        />

        <StatCard
          label="Published"
          value={publishedImages}
          icon={<Eye size={19} />}
        />
      </section>

      {images.length === 0 && !error ? (
        <section className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#b9945a]">
            <ImageIcon size={24} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            No gallery images
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
            Upload your first image to begin building the
            public hotel gallery.
          </p>

          <Link
            href="/admin/gallery/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#b9945a] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#c7a46d]"
          >
            <Plus size={17} />
            Upload first image
          </Link>
        </section>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <article
              key={image.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[4/3] bg-black/30">
                <Image
                  src={image.image_url}
                  alt={image.alt_text}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />

                <div className="absolute left-4 top-4">
                  {image.is_published ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-black/60 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md">
                      <Eye size={13} />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/55 backdrop-blur-md">
                      <EyeOff size={13} />
                      Hidden
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-white/85">
                      {image.title || "Untitled image"}
                    </h2>

                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#b9945a]">
                      {image.category}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-white/30">
                    Order {image.display_order}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/40">
                  {image.alt_text}
                </p>

                <Link
                  href={`/admin/gallery/${image.id}/edit`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:border-[#b9945a]/40 hover:bg-[#b9945a]/10 hover:text-[#c7a46d]"
                >
                  Edit or replace
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  icon: ReactNode;
};

function StatCard({
  label,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm text-white/35">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold text-white">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#b9945a]/20 bg-[#b9945a]/10 text-[#c7a46d]">
          {icon}
        </div>
      </div>
    </div>
  );
}