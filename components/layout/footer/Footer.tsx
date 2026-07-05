import Container from "@/components/ui/Container";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterSocials from "./FooterSocials";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-[#211711] text-white">
      <Container>
        <div
          className="
            grid
            gap-10
            py-14
            sm:grid-cols-2
            sm:gap-12
            sm:py-16
            lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]
            lg:gap-14
            lg:py-20
          "
        >
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
          <FooterSocials />
        </div>

        <FooterBottom />
      </Container>
    </footer>
  );
}