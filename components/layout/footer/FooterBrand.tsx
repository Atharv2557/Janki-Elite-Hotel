import { footer } from "@/data/footer";

export default function FooterBrand() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-wide sm:text-4xl">
        {footer.brand.name}
      </h2>

      <div className="mt-4 h-px w-20 bg-[var(--primary)]" />

      <p className="mt-6 max-w-sm text-base leading-8 text-white/65">
        {footer.brand.description}
      </p>
    </div>
  );
}