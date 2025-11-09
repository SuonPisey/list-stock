"use client";

import { Star } from "lucide-react";
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
}: StarRatingProps) {
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const starSize = sizeMap[size];
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < filledStars;
          const isHalf = index === filledStars && hasHalfStar;

          return (
            <div
              key={index}
              className="relative"
              style={{ width: starSize, height: starSize }}
            >
              {/* Empty star background */}
              <Star
                size={starSize}
                className="absolute inset-0 text-muted-foreground/30"
              />
              {/* Filled or half-filled star */}
              {(isFilled || isHalf) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isFilled ? "100%" : "50%" }}
                >
                  <Star
                    size={starSize}
                    className="fill-amber-400 text-amber-400"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
