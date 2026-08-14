"use client";

import { useEffect, useState } from "react";
import { getApprovedReviews } from "@/lib/community/service";
import type { PublicReview } from "@/lib/community/types";

export function useApprovedReviews(max = 12) {
  const [reviews, setReviews] = useState<PublicReview[] | null>(null);

  useEffect(() => {
    let active = true;
    getApprovedReviews(max).then((result) => {
      if (active) setReviews(result);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return reviews;
}
