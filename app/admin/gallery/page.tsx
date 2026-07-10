"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  galleryCategories,
  galleryImages,
  type GalleryCategory,
  type GalleryImage,
} from "@/data/gallery-page";

type UploadCategory = Exclude<GalleryCategory, "All">;

type AdminGalleryImage = GalleryImage & {
  status: "Existing" | "New Upload";
  file?: File;
  fileName?: string;
  fileSize?: string;
  previewUrl?: string;
};

const uploadCategories = galleryCategories.filter(
  (category) => category !== "All"
) as UploadCategory[];

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminGalleryPage() {
  const existingImages: AdminGalleryImage[] = galleryImages.map((image) => ({
    ...image,
    status: "Existing",
  }));

  const [images, setImages] = useState<AdminGalleryImage[]>(existingImages);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<UploadCategory>("Hotel");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState("");
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");
  const [message, setMessage] = useState("");

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") return images;
    return images.filter((image) => image.category === activeFilter);
  }, [activeFilter, images]);

  const newUploadCount = useMemo(() => {
    return images.filter((image) => image.status === "New Upload").length;
  }, [images]);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (selectedPreview) {
      URL.revokeObjectURL(selectedPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setSelectedPreview(previewUrl);
    setMessage("");
  }

  function addImageToPreview() {
    if (!title.trim() || !selectedFile || !selectedPreview) {
      setMessage("Please add title, category, and image before adding.");
      return;
    }

    const newImage: AdminGalleryImage = {
      id: Date.now(),
      title: title.trim(),
      category,
      image: selectedPreview,
      status: "New Upload",
      file: selectedFile,
      fileName: selectedFile.name,
      fileSize: formatFileSize(selectedFile.size),
      previewUrl: selectedPreview,
    };

    setImages((currentImages) => [newImage, ...currentImages]);

    setTitle("");
    setCategory("Hotel");
    setSelectedFile(null);
    setSelectedPreview("");
    setMessage("Image added to preview. Later this will be uploaded to backend.");
  }

  function removeImage(imageId: number) {
    setImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === imageId);

      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return currentImages.filter((image) => image.id !== imageId);
    });

    setMessage("");
  }

  function handlePublishGallery() {
    const newImagesForBackend = images
      .filter((image) => image.status === "New Upload")
      .map((image) => ({
        title: image.title,
        category: image.category,
        file: image.file,
      }));

    console.log("Images ready for backend upload:", newImagesForBackend);

    setMessage(
      "Gallery is ready for backend upload. API connection will be added later."
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#120b07] pt-8 text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:py-16">
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
                Gallery Management
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Manage gallery by category.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/55">
                Upload images with title and category. The public gallery will
                later render them under Rooms, Dining, Amenities, Hotel, and
                automatically inside All.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePublishGallery}
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
              Publish Gallery
            </button>
          </div>

          {message && (
            <div className="mb-8 rounded-[22px] border border-[#d4af7a]/25 bg-[#d4af7a]/10 px-5 py-4 text-sm text-[#f5d7a1]">
              {message}
            </div>
          )}

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(212,175,122,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                Total Images
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#f5d7a1]">
                {images.length}
              </h3>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(212,175,122,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                New Uploads
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#f5d7a1]">
                {newUploadCount}
              </h3>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(212,175,122,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                Active Filter
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#f5d7a1]">
                {activeFilter}
              </h3>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(212,175,122,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                Categories
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#f5d7a1]">
                {uploadCategories.length}
              </h3>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.45fr]">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af7a]/75">
                  Add Image
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Upload details
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    Image Title
                  </label>

                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      setMessage("");
                    }}
                    placeholder="Luxury Room Interior"
                    className="
                      h-13
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/25
                      px-5
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/25
                      focus:border-[#d4af7a]/60
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-white/65"
                  >
                    Gallery Category
                  </label>

                  <select
                    id="category"
                    value={category}
                    onChange={(event) => {
                      setCategory(event.target.value as UploadCategory);
                      setMessage("");
                    }}
                    className="
                      h-13
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/25
                      px-5
                      text-sm
                      text-white
                      outline-none
                      transition
                      focus:border-[#d4af7a]/60
                    "
                  >
                    {uploadCategories.map((categoryItem) => (
                      <option
                        key={categoryItem}
                        value={categoryItem}
                        className="bg-[#120b07] text-white"
                      >
                        {categoryItem}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs leading-6 text-white/35">
                    Do not select All here. All is created automatically on the
                    public gallery page.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="gallery-upload"
                    className="
                      group
                      flex
                      min-h-[280px]
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-dashed
                      border-[#d4af7a]/35
                      bg-black/20
                      p-6
                      text-center
                      transition
                      duration-500
                      hover:border-[#f5d7a1]/70
                      hover:bg-[#d4af7a]/10
                      hover:shadow-[0_0_70px_rgba(212,175,122,0.12)]
                    "
                  >
                    {selectedPreview ? (
                      <div className="relative h-64 w-full overflow-hidden rounded-[24px]">
                        <Image
                          src={selectedPreview}
                          alt="Selected preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        <span className="absolute bottom-4 left-4 rounded-full bg-[#d4af7a] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#211711]">
                          Change Image
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#d4af7a]/10 text-3xl text-[#f5d7a1] transition duration-500 group-hover:scale-110">
                          +
                        </span>

                        <h3 className="mt-6 text-xl font-semibold text-white">
                          Select image
                        </h3>

                        <p className="mt-3 max-w-sm text-sm leading-7 text-white/50">
                          Upload JPG, PNG, or WEBP image. Choose clean,
                          high-resolution photos for the luxury gallery.
                        </p>

                        <span className="mt-6 rounded-full bg-[#d4af7a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#211711] shadow-[0_16px_50px_rgba(212,175,122,0.25)]">
                          Browse Files
                        </span>
                      </>
                    )}

                    <input
                      id="gallery-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={addImageToPreview}
                  disabled={!title.trim() || !selectedFile}
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
                    px-6
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
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    disabled:hover:translate-y-0
                    disabled:hover:bg-[#d4af7a]/10
                    disabled:hover:text-[#f5d7a1]
                  "
                >
                  Add To Preview
                </button>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-6 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af7a]/75">
                    Gallery Preview
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    Category filtered images
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {galleryCategories.map((filter) => {
                    const active = activeFilter === filter;

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`
                          rounded-full
                          border
                          px-4
                          py-2
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          transition
                          duration-300
                          ${
                            active
                              ? "border-[#d4af7a] bg-[#d4af7a] text-[#211711]"
                              : "border-white/10 bg-white/[0.035] text-white/45 hover:border-[#d4af7a]/45 hover:text-[#f5d7a1]"
                          }
                        `}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {filteredImages.length === 0 ? (
                <div className="flex min-h-[520px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-black/20 p-8 text-center">
                  <div>
                    <p className="text-5xl text-[#d4af7a]/55">☾</p>
                    <h3 className="mt-5 text-xl font-semibold text-white">
                      No images in this category
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-white/45">
                      Add a new image from the left panel and select this
                      category to see it here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid max-h-[760px] gap-4 overflow-y-auto pr-2 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-white/10
                        bg-black/30
                        shadow-[0_18px_60px_rgba(0,0,0,0.25)]
                      "
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={image.image}
                          alt={image.title}
                          fill
                          unoptimized={image.image.startsWith("blob:")}
                          className="
                            object-cover
                            transition
                            duration-[1400ms]
                            ease-out
                            group-hover:scale-105
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />

                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="
                            absolute
                            right-3
                            top-3
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                            bg-black/45
                            text-sm
                            text-white
                            backdrop-blur-md
                            transition
                            hover:bg-red-500
                          "
                          aria-label={`Remove ${image.title}`}
                        >
                          ×
                        </button>

                        <div className="absolute left-3 top-3">
                          <span
                            className={`
                              rounded-full
                              px-3
                              py-1
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.16em]
                              ${
                                image.status === "New Upload"
                                  ? "bg-[#d4af7a] text-[#211711]"
                                  : "border border-white/15 bg-black/45 text-white/70"
                              }
                            `}
                          >
                            {image.status}
                          </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span className="mb-2 inline-flex rounded-full border border-[#d4af7a]/25 bg-[#d4af7a]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5d7a1]">
                            {image.category}
                          </span>

                          <h3 className="line-clamp-1 text-sm font-medium text-white">
                            {image.title}
                          </h3>

                          {image.fileSize && (
                            <p className="mt-1 line-clamp-1 text-xs text-white/45">
                              {image.fileName} • {image.fileSize}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-white/50 backdrop-blur-xl">
            <span className="font-medium text-[#f5d7a1]">Developer note:</span>{" "}
            This UI is backend-ready. Later, <code>Publish Gallery</code> will
            send title, category, and image file to your upload API. The public
            gallery will use category filtering, where <code>All</code> shows
            every image automatically.
          </div>
        </div>
      </section>
    </main>
  );
}