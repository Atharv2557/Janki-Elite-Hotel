type Props = {
  line1: string;
  line2?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  line1,
  line2,
  align = "left",
  light = false,
}: Props) {
  return (
    <h2
      className={`
        mt-6
        text-4xl
        font-semibold
        leading-tight
        md:text-5xl
        lg:text-6xl
        ${align === "center" ? "text-center" : "text-left"}
        ${light ? "text-white" : "text-gray-900"}
      `}
    >
      {line1}

      {line2 && (
        <>
          <br />
          <span className="text-[var(--primary)]">
            {line2}
          </span>
        </>
      )}
    </h2>
  );
}