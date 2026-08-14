import type { PublicReview } from "@/lib/community/types";

function Stars({ score }: { score: number }) {
  return (
    <span aria-label={`${score}/5`} className="text-amber-500">
      {"★".repeat(score)}
      {"☆".repeat(5 - score)}
    </span>
  );
}

export default function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Stars score={review.score} />
      {review.comment && <blockquote className="mt-3 flex-1 text-sm text-slate-700">"{review.comment}"</blockquote>}
      <figcaption className="mt-4 text-sm text-muted">
        <span className="font-medium text-slate-900">{review.displayName}</span>
        {review.country ? ` — ${review.country}` : ""}
        <span className="block text-xs text-slate-400">{review.approxDate}</span>
      </figcaption>
    </figure>
  );
}
