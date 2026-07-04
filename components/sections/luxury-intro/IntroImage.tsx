import Image from "next/image";

export default function IntroImage() {
  return (
    <div
      className="
        group
        relative
        h-[650px]
        overflow-hidden
        rounded-[32px]
        shadow-2xl
        transition-all
        duration-1000
        hover:-translate-y-1
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]
      "
    >
      <Image
        src="/images/about/about-main.jpg"
        alt="Janki Elite Hotel"
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="
          object-cover
          transition-transform
          duration-[8500ms]
          ease-out
          group-hover:scale-[1.03]
        "
      />
    </div>
  );
}