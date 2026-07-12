"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { diningPageData } from "@/data/dining-page";

export default function DiningPageHero() {
  const { hero } = diningPageData;

  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          imageRef.current,
          {
            scale: 1.14,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.9,
            ease: "power2.out",
          }
        )
        .fromTo(
          eyebrowRef.current,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=1.1"
        )
        .fromTo(
          titleRef.current,
          {
            y: 44,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
          },
          "-=0.55"
        )
        .fromTo(
          descriptionRef.current,
          {
            y: 26,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.45"
        )
        .fromTo(
          buttonsRef.current,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
          },
          "-=0.4"
        )
        .fromTo(
          labelRef.current,
          {
            x: -24,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.45"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#120c08] text-white"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120c08]/95 via-[#120c08]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#120c08] to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center px-6 pt-28 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <p
            ref={eyebrowRef}
            className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-[#c8a45d]"
          >
            {hero.eyebrow}
          </p>

          <h1
            ref={titleRef}
            className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-8xl lg:text-7xl"
          >
            {hero.title}
          </h1>

          <p
            ref={descriptionRef}
            className="mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-lg"
          >
            {hero.description}
          </p>

          <div
            ref={buttonsRef}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#dining-menu"
              className="dining-soft-button rounded-full bg-[#c8a45d] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#120c08] hover:bg-white"
            >
              Explore Menu
            </a>

            <a
              href="#dining-cta"
              className="dining-soft-button rounded-full border border-white/25 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white hover:border-[#c8a45d] hover:text-[#c8a45d]"
            >
              Reserve Table
            </a>
          </div>
        </div>
      </div>

      <div
        ref={labelRef}
        className="absolute bottom-6 left-8 z-10 hidden items-center gap-4 pt-4 text-xs uppercase tracking-[0.35em] text-white/45 md:left-12 lg:left-20 lg:flex"
      >
        <span className="h-px w-16 bg-white/30" />
        Fine Dining Experience
      </div>
    </section>
  );
}