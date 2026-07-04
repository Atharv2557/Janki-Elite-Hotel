import { ReactNode } from "react";
import clsx from "clsx";

// type SectionProps = {
//   id?: string;
//   children: ReactNode;
//   className?: string;
// };

// export default function Section({
//   id,
//   children,
//   className,
// }: SectionProps) {
//   return (
//     <section
//       id={id}
//       className={clsx(
//         "py-20 md:py-28 lg:py-32",
//         className
//       )}
//     >
//       {children}
//     </section>


type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-24 lg:py-32 ${className}`}>
      {children}
    </section>
  );
}
