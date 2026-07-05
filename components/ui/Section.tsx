import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export default function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 sm:py-24 lg:py-32",
        className
      )}
    >
      {children}
    </section>
  );
}