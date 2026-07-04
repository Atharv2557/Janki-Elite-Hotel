type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: Props) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-4 uppercase tracking-[0.3em] text-sm text-[var(--primary)]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl ml- md:text-5xl font-semibold">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-6 text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}