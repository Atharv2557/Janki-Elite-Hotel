"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroImage() {
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

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
        );
    }, imageWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={imageWrapRef}
      className="
        relative
        h-[650px]
        overflow-hidden
        rounded-[32px]
        shadow-2xl
      "
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/about/about-main.jpg"
          alt="Janki Elite Hotel"
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}