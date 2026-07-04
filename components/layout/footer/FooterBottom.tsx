import { footer } from "@/data/footer";

export default function FooterBottom() {
  return (
    <div className="border-t border-white/10 py-6">
      <p className="text-center text-sm text-white/50">
        {footer.copyright}
      </p>
    </div>
  );
}