import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import GalleryImageForm from "@/components/admin/gallery/GalleryImageForm";

export default function NewGalleryImagePage() {
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
          Add gallery image
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
          Upload an image, choose its category, add accessible alt text and
          control whether it appears on the public gallery page.
        </p>
      </div>

      <GalleryImageForm mode="create" />
    </div>
  );
}