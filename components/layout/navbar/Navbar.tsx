"use client";

import clsx from "clsx";
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
  className={clsx(
    "fixed inset-x-0 top-0 z-50 transition-all duration-500",
    scrolled
      ? "bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/10"
      : "bg-transparent"
  )}
>
      <Container>
        <div className={clsx(
  "flex items-center justify-between transition-all duration-500",
  scrolled ? "h-20" : "h-24"
)}>
          <NavLogo />

          <NavLinks />

          <NavCTA />

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

