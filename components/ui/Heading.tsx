type HeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function Heading({
  title,
  subtitle,
  align = "left",
}: HeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="text-4xl font-semibold text-[var(--secondary)] md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}
