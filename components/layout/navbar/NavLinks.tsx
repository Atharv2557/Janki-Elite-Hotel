import Link from "next/link";
import { navigation } from "@/data/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
    const pathname = usePathname();
  return (
    
    <nav className="hidden lg:flex items-center gap-10">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
         className={clsx(
  "transition-colors duration-300",
  pathname === item.href
    ? "text-[var(--primary)]"
    : "text-white hover:text-[var(--primary)]"
)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}