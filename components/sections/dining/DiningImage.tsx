"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { dining } from "@/data/dining";

gsap.registerPlugin(ScrollTrigger);

export default function DiningImage() {
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          imageWrapRef.current,
          {
            clipPath: "inset(18% 18% 18% 18%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.25,
          }
        )
        .fromTo(
          imageRef.current,
          {
            scale: 1.18,
          },
          {
            scale: 1,
            duration: 1.45,
          },
          "<"
        )
        .fromTo(
          captionRef.current,
          {
            y: 28,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
          },
          "-=0.45"
        );
    }, imageWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-full bg-[var(--primary)]/15 blur-2xl sm:block" />

      <div
        ref={imageWrapRef}
        className="
          relative
          h-[420px]
          overflow-hidden
          rounded-[34px]
          border
          border-black/5
          bg-white
          shadow-[0_24px_70px_rgba(0,0,0,0.10)]
          sm:h-[520px]
          lg:h-[620px]
        "
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={dining.image.src}
            alt={dining.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div
          ref={captionRef}
          className="
            absolute
            bottom-5
            left-5
            right-5
            rounded-[24px]
            border
            border-white/15
            bg-white/12
            p-5
            text-white
            backdrop-blur-xl
            sm:bottom-6
            sm:left-6
            sm:right-6
            sm:p-6
          "
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            Dining Experience
          </p>

          <p className="mt-3 text-2xl font-semibold leading-tight">
            Fresh Meals, Elegant Ambience
          </p>
        </div>
      </div>
    </div>
  );
}