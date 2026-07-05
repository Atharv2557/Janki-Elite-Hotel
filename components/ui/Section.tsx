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
        "relative overflow-hidden py-2 sm:py-8 lg:py-10",
        className
      )}
    >
      {children}
    </section>
  );
}