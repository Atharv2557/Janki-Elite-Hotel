type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-[var(--primary)]
        px-5
        py-2
        text-xs
        font-medium
        uppercase
        tracking-[0.3em]
        text-[var(--primary)]
      "
    >
      {children}
    </span>
  );
}