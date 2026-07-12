"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { diningPageData } from "@/data/dining-page";

gsap.registerPlugin(ScrollTrigger);

export default function DiningGalleryReveal() {
  const { gallery } = diningPageData;

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          headingRef.current,
          {
            y: 36,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
          }
        )
        .fromTo(
          imageRefs.current,
          {
            y: 70,
            opacity: 0,
            scale: 0.94,
            clipPath: "inset(18% 18% 18% 18%)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            stagger: 0.14,
          },
          "-=0.45"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fbf7f0] px-6 py-20 text-[#211711] md:px-12 md:py-24 lg:px-20 lg:py-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,164,93,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(139,94,52,0.12),transparent_36%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.45em] text-[#c8a45d]">
              Dining Gallery
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              Moments that feel warm, elegant, and memorable.
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[#5f5148]">
            A glimpse of the ambience, plating, and calm dining atmosphere
            designed for guests who enjoy comfort with a premium touch.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {gallery.map((image, index) => (
            <div
              key={image}
              ref={(element) => {
                if (element) imageRefs.current[index] = element;
              }}
              className={[
                "dining-premium-card group rounded-[2rem] border border-[#eadfce] bg-white shadow-sm",
                index === 0
                  ? "md:col-span-7 md:h-[380px]"
                  : index === 1
                    ? "md:col-span-5 md:h-[360px]"
                    : "md:col-span-6 md:h-[320px]",
                "h-[360px]",
              ].join(" ")}
            >
              <Image
                src={image}
                alt={`Dining gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="dining-premium-image"
              />

              <div className="dining-premium-overlay absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              <div className="absolute left-6 top-6 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white backdrop-blur-md">
                0{index + 1}
              </div>

              <div className="dining-floating-content absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl border border-white/15 bg-black/35 p-5 text-white backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#c8a45d]">
                    Janki Elite
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Fine dining ambience with a calm and premium hotel feel.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}