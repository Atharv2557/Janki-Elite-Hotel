type BadgeProps = {
  children: React.ReactNode;
  light?: boolean;
};

export default function Badge({
  children,
  light = false,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-5
        py-2
        text-[11px]
        font-medium
        uppercase
        tracking-[0.32em]
        ${
          light
            ? "border-white/20 bg-white/10 text-[var(--primary)] backdrop-blur-md"
            : "border-[var(--primary)]/35 bg-[var(--primary)]/5 text-[var(--primary)]"
        }
      `}
    >
      {children}
    </span>
  );
}