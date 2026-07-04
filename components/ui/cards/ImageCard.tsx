import Image, { ImageProps } from "next/image";

export default function ImageCard(props: ImageProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        shadow-2xl
      "
    >
      <Image
        {...props}
        className={`object-cover transition-transform duration-700 hover:scale-105 ${props.className ?? ""}`}
      />
    </div>
  );
}