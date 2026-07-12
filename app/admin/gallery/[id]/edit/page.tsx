import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import GalleryImageForm from "@/components/admin/gallery/GalleryImageForm";
import { createClient } from "@/lib/supabase/server";
import type { GalleryImageFormValues } from "@/lib/validations/gallery";

type EditGalleryImagePageProps = {
  params: Promise<{
    id: string;
  }>;
};

type GalleryImageRow = {
  id: string;
  title: string | null;
  alt_text: string;
  category: string;
  image_url: string;
  storage_path: string;
  display_order: number;
  is_published: boolean;
};

export default async function EditGalleryImagePage({
  params,
}: EditGalleryImagePageProps) {
  const { id } = await params;

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
        is_published
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "Gallery image fetch error:",
      error
    );
  }

  if (!data) {
    notFound();
  }

  const image = data as GalleryImageRow;

  const initialValues: GalleryImageFormValues = {
    title: image.title ?? "",
    altText: image.alt_text,
    category: image.category,
    imageUrl: image.image_url,
    storagePath: image.storage_path,
    displayOrder: image.display_order,
    isPublished: image.is_published,
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/gallery"
          className="mb-4 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-[#b9945a]"
        >
          <ArrowLeft size={16} />
          Back to gallery
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9945a]">
          Gallery Management
        </p>

        <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          Edit gallery image
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
          Update image details, visibility, order, or replace the existing
          gallery image.
        </p>
      </div>

      <GalleryImageForm
        mode="edit"
        imageId={image.id}
        initialValues={initialValues}
      />
    </div>
  );
}