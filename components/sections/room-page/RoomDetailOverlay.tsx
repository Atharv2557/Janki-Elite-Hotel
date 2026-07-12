"use client";

import Image from "next/image";
import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { RoomPageItem } from "@/data/room-page";
import { Portal } from "@/components/ui/Portal";

import { RoomGallery } from "./RoomGallery";
import { RoomAmenities } from "./RoomAmenities";
import { RoomCloseButton } from "./RoomCloseButton";
import { RoomBookingPanel } from "./RoomBookingPanel";
import {
  MealPlanOverlay,
  MealPlanType,
} from "./MealPlanOverlay";

type RoomDetailOverlayProps = {
  room: RoomPageItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export function RoomDetailOverlay({
  room,
  isOpen,
  onClose,
}: RoomDetailOverlayProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [activeMealPlan, setActiveMealPlan] =
    useState<MealPlanType | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bookingAreaRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (!room) return;

    setSelectedImage(room.heroImage);
    setActiveMealPlan(null);
  }, [room]);

  useEffect(() => {
    if (!isOpen) {
      setActiveMealPlan(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  const activeImage = room ? selectedImage || room.heroImage : "";

  const handleMealPlanClick = useCallback((plan: MealPlanType) => {
    setActiveMealPlan(plan);
  }, []);

  const handleMealPlanClose = useCallback(() => {
    setActiveMealPlan(null);
  }, []);

  const animateClose = useCallback(() => {
    if (isClosingRef.current) return;

    const overlay = overlayRef.current;
    const card = cardRef.current;

    setActiveMealPlan(null);

    if (!overlay || !card) {
      onClose();
      return;
    }

    isClosingRef.current = true;

    gsap
      .timeline({
        defaults: {
          ease: "power3.inOut",
        },
        onComplete: () => {
          isClosingRef.current = false;
          onClose();
        },
      })
      .to(card, {
        opacity: 0,
        y: 26,
        scale: 0.97,
        filter: "blur(6px)",
        duration: 0.48,
      })
      .to(
        overlay,
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.38,
        },
        "-=0.24"
      );
  }, [onClose]);

  const handleImageSelect = useCallback(
    (src: string) => {
      if (src === activeImage) return;

      const image = heroImageRef.current;

      if (!image) {
        setSelectedImage(src);
        return;
      }

      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .to(image, {
          opacity: 0,
          scale: 1.04,
          filter: "blur(8px)",
          duration: 0.25,
          onComplete: () => {
            setSelectedImage(src);
          },
        })
        .to(image, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
        });
    },
    [activeImage]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (activeMealPlan) {
        setActiveMealPlan(null);
        return;
      }

      animateClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeMealPlan, animateClose]);

  useLayoutEffect(() => {
    if (!isOpen || !room) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const overlay = overlayRef.current;
    const card = cardRef.current;
    const hero = heroRef.current;
    const galleryItems =
      galleryRef.current?.querySelectorAll("button") ?? [];
    const contentItems = contentRef.current?.children ?? [];
    const bookingPanels =
      bookingAreaRef.current?.querySelectorAll(
        "[data-booking-panel]"
      ) ?? [];

    if (!overlay || !card) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            overlay,
            card,
            hero,
            galleryItems,
            contentItems,
            bookingPanels,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }
        );

        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          overlay,
          {
            opacity: 0,
            backdropFilter: "blur(0px)",
          },
          {
            opacity: 1,
            backdropFilter: "blur(10px)",
            duration: 0.55,
          }
        )
        .fromTo(
          card,
          {
            opacity: 0,
            y: 34,
            scale: 0.96,
            filter: "blur(7px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.95,
          },
          "-=0.28"
        )
        .fromTo(
          hero,
          {
            opacity: 0,
            y: 16,
            scale: 1.03,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
          },
          "-=0.62"
        )
        .fromTo(
          galleryItems,
          {
            opacity: 0,
            y: 12,
            scale: 0.98,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 0.48,
          },
          "-=0.42"
        )
        .fromTo(
          contentItems,
          {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.09,
            duration: 0.6,
          },
          "-=0.36"
        )
        .fromTo(
          bookingPanels,
          {
            opacity: 0,
            y: 18,
            scale: 0.98,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.05,
            duration: 0.58,
          },
          "-=0.24"
        );
    }, cardRef);

    return () => ctx.revert();
  }, [isOpen, room]);

  if (!isOpen || !room) return null;

  return (
    <Portal>
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-detail-title"
        className="fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden bg-[#241A14]/45 px-3 py-3 sm:px-4 sm:py-6 lg:px-8"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            animateClose();
          }
        }}
      >
        <div className="flex min-h-full items-center justify-center overflow-x-hidden">
          <div
            ref={cardRef}
            className="relative w-full max-w-[1040px] overflow-hidden rounded-[22px] border border-white/10 bg-[#2B211B] shadow-[0_50px_120px_rgba(36,26,20,0.35)] sm:rounded-[32px]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:gap-4 sm:px-6 sm:py-5">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4af37] sm:text-[11px]">
                  {room.subtitle}
                </p>

                <h2
                  id="room-detail-title"
                  className="mt-1 truncate font-serif text-2xl leading-tight text-white sm:text-3xl"
                >
                  {room.title}
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-right sm:block">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                    From
                  </p>

                  <p className="text-sm font-semibold text-[#d4af37]">
                    {room.price}
                  </p>
                </div>

                <RoomCloseButton onClick={animateClose} />
              </div>
            </div>

            {/* Body */}
            <div
              ref={bookingAreaRef}
              className="grid max-h-[calc(100vh-96px)] min-w-0 gap-6 overflow-y-auto overflow-x-hidden p-4 sm:max-h-[calc(100vh-120px)] sm:p-6 lg:grid-cols-[minmax(0,410px)_minmax(0,1fr)] lg:gap-7 lg:p-7"
            >
              {/* Left column */}
              <div className="min-w-0 space-y-4">
                <div
                  ref={heroRef}
                  className="group room-premium-card relative aspect-[5/4] overflow-hidden rounded-[20px] bg-black sm:aspect-[4/3] sm:rounded-[26px]"
                >
                  <Image
                    ref={heroImageRef}
                    key={activeImage}
                    src={activeImage}
                    alt={room.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 410px"
                    priority
                    className="room-premium-image object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                  <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/35 px-4 py-2 backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white sm:text-[11px]">
                      {room.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  ref={galleryRef}
                  className="min-w-0 overflow-hidden"
                >
                  <RoomGallery
                    images={room.gallery}
                    selectedImage={activeImage}
                    onImageSelect={handleImageSelect}
                  />
                </div>

                <div
                  data-booking-panel
                  className="hidden lg:block"
                >
                  <RoomBookingPanel
                    price={room.price}
                    roomTitle={room.title}
                  />
                </div>
              </div>

              {/* Right column */}
              <div
                ref={contentRef}
                className="flex min-w-0 flex-col"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                    Premium Suite
                  </p>

                  <h3 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                    {room.title}
                  </h3>

                  <div className="mt-5 h-px w-20 bg-[#d4af37]" />

                  <p className="mt-5 text-sm leading-7 text-white/70 sm:text-[15px] sm:leading-8">
                    {room.description}
                  </p>
                </div>

                <RoomAmenities
                  features={room.features}
                  activeMealPlan={activeMealPlan}
                  onMealPlanClick={handleMealPlanClick}
                />

                <div
                  data-booking-panel
                  className="pt-6 sm:pt-8 lg:hidden"
                >
                  <RoomBookingPanel
                    price={room.price}
                    roomTitle={room.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <MealPlanOverlay
          activePlan={activeMealPlan}
          roomTitle={room.title}
          onClose={handleMealPlanClose}
        />
      </div>
    </Portal>
  );
}