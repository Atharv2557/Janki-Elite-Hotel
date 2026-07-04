import Image from "next/image";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-20">
      <Image
        src="/images/hero/main-image.jpg"
        alt="Luxury hotel exterior"
        fill
        priority
        quality={90}
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}