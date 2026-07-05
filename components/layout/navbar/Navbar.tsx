"use client";

import { cn } from "@/lib/utils/cn";
import { useScroll } from "@/hooks/useScroll";
import Container from "@/components/ui/Container";

import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavCTA from "./NavCTA";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const scrolled = useScroll();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-black/10 bg-white/90 shadow-md backdrop-blur-xl"
          : "bg-[#211711]/45 backdrop-blur-sm"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-[72px]" : "h-20 sm:h-24"
          )}
        >
          <NavLogo scrolled={scrolled} />
          <NavLinks scrolled={scrolled} />
          <NavCTA />
          <MobileMenu scrolled={scrolled} />
        </div>
      </Container>
    </header>
  );
}