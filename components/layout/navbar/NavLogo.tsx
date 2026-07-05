import Image from "next/image";
import Link from "next/link";

type NavLogoProps = {
  scrolled?: boolean;
};

export default function NavLogo({ scrolled = false }: NavLogoProps) {
  return (
    <Link href="/" className="group inline-flex items-center">
      <Image
        src="/images/logo/janki-logo.png"
        alt="Janki Elite Hotel"
        width={150}
        height={54}
        priority
        className="
          h-14
          w-auto
          object-contain
          transition-all
          duration-300
          group-hover:scale-105
          sm:h-18
        "
      />
    </Link>
  );
}