"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { diningPageData } from "@/data/dining-page";

gsap.registerPlugin(ScrollTrigger);

export default function DiningBookingCTA() {
  const { cta } = diningPageData;

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent(cta.whatsappMessage);
    return `https://wa.me/${cta.whatsappNumber}?text=${message}`;
  }, [cta.whatsappMessage, cta.whatsappNumber]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.96,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dining-cta"
      ref={sectionRef}
     className="relative overflow-hidden bg-[#fbf7f0] px-6 py-20 text-[#211711] md:px-12 md:py-24 lg:px-20 lg:py-10 bottom-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,164,93,0.16),transparent_42%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[2.5rem] border border-[#eadfce] bg-[#211711] px-7 py-14 text-center text-white shadow-2xl shadow-[#211711]/15 md:px-14 md:py-20"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#c8a45d]/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#c8a45d]/15 blur-[90px]" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.45em] text-[#c8a45d]">
              {cta.eyebrow}
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              {cta.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              {cta.description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#c8a45d] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#211711] transition duration-300 hover:bg-white"
              >
                {cta.buttonText}
              </a>

              <a
                href="/rooms"
                className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:border-[#c8a45d] hover:text-[#c8a45d]"
              >
                Explore Rooms
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}