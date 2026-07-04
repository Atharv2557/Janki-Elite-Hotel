type Props = {
  value: string;
  label: string;
};

export default function StatCard({
  value,
  label,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <h3 className="text-3xl font-bold text-[var(--primary)]">
        {value}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {label}
      </p>
    </div>
  );
}