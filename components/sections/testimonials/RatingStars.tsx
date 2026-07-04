import { Star } from "lucide-react";

type Props = {
  rating: number;
};

export default function RatingStars({ rating }: Props) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < rating;

        return (
          <Star
            key={index}
            size={18}
            className={
              isFilled
                ? "fill-[var(--primary)] text-[var(--primary)]"
                : "text-gray-300"
            }
          />
        );
      })}
    </div>
  );
}