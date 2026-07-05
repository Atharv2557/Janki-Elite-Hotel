import { footer } from "@/data/footer";

export default function FooterBottom() {
  return (
    <div className="border-t border-white/10 py-6 sm:py-7">
      <p className="text-center text-sm leading-6 text-white/50">
        {footer.copyright}
      </p>
    </div>
  );
}