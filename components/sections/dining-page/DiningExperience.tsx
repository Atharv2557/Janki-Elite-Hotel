"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { diningPageData } from "@/data/dining-page";

gsap.registerPlugin(ScrollTrigger);

export default function DiningExperience() {
  const { experience } = diningPageData;

  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = useRef<HTMLLIElement[]>([]);

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
          imageWrapRef.current,
          {
            clipPath: "inset(18% 18% 18% 18%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.2,
          }
        )
        .fromTo(
          imageRef.current,
          {
            scale: 1.16,
          },
          {
            scale: 1,
            duration: 1.4,
          },
          "<"
        )
        .fromTo(
          contentRef.current,
          {
            y: 42,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
          },
          "-=0.65"
        )
        .fromTo(
          featureRefs.current,
          {
            y: 22,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.45"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
   className="relative overflow-hidden bg-[#fbf7f0] px-6 pb-16 pt-14 text-[#211711] md:px-12 md:pb-20 md:pt-12 lg:px-20 lg:pb-24 lg:pt-10"
    >
      {/* Soft luxury background glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#c8a45d]/20 blur-[120px]" />
      
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Image */}
        <div
          ref={imageWrapRef}
         className="relative h-[320px] overflow-hidden rounded-[1.75rem] border border-[#eadfce] bg-[#fbf7f0] shadow-xl shadow-[#211711]/10 md:h-[420px] lg:h-[460px]"
        >
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c8a45d]">
              Premium Ambience
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Calm interiors, warm lighting, and attentive service for every
              guest.
            </p>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-[#c8a45d]">
            {experience.eyebrow}
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl text-[#5f5148]" >
            {experience.title}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f5148] md:text-lg">
            {experience.description}
          </p>

          <ul className="mt-9 grid gap-4">
            {experience.features.map((feature, index) => (
              <li
                key={feature}
                ref={(element) => {
                  if (element) featureRefs.current[index] = element;
                }}
               className="group flex items-start gap-4 rounded-2xl border border-[#eadfce] bg-[#fbf7f0] p-5 shadow-sm transition duration-300 hover:border-[#c8a45d]/60 hover:bg-white hover:shadow-lg"
              >
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c8a45d]/50 text-xs text-[#c8a45d] transition duration-300 group-hover:bg-[#c8a45d] group-hover:text-[#120c08]">
                  {index + 1}
                </span>

                <span className="text-sm leading-7 text-[#5f5148] md:text-base">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}