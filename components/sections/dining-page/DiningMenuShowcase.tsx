"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { diningPageData } from "@/data/dining-page";

gsap.registerPlugin(ScrollTrigger);

export default function DiningMenuShowcase() {
  const { menu } = diningPageData;

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

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
          cardRefs.current,
          {
            y: 56,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.16,
          },
          "-=0.45"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dining-menu"
      ref={sectionRef}
     className="relative overflow-hidden bg-[#fbf7f0] px-6 py-20 text-[#211711] md:px-12 md:py-24 lg:px-20 lg:py-8"
    >
      {/* Soft cream background detail */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#c8a45d]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#8b5e34]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-[#c8a45d]">
            {menu.eyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
            {menu.title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5f5148] md:text-lg">
            {menu.description}
          </p>
        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {menu.items.map((item, index) => (
            <div
              key={item.title}
              ref={(element) => {
                if (element) cardRefs.current[index] = element;
              }}
              className="group overflow-hidden rounded-[2rem] border border-[#eadfce] bg-[#fbf7f0] shadow-sm transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:shadow-[#211711]/10"
            >
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80" />

                <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md">
                  0{index + 1}
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#211711]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#5f5148]">
                  {item.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-[#eadfce] pt-5">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#8b6b45]">
                    Chef Selection
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-full border border-[#c8a45d]/50 text-[#c8a45d] transition duration-300 group-hover:bg-[#c8a45d] group-hover:text-white">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}