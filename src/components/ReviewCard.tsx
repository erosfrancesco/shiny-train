import { Star } from 'lucide-react';
import type { Review } from '@codeTypes/index';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">{review.reviewer_name}</p>
          <p className="mt-1 text-sm text-slate-500">{review.comment}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
          <Star className="h-4 w-4 text-amber-400" />
          {review.rating}
        </div>
      </div>
    </article>
  );
}
