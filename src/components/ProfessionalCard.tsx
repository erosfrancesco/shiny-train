import { Link } from 'react-router-dom';
import type { Profile } from '@codeTypes/index';
import { Star, MapPin, CalendarDays } from 'lucide-react';
import clsx from 'clsx';

interface ProfessionalCardProps {
  professional: Profile;
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <article className={clsx(
      "group overflow-hidden rounded-[32px] border p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg sm:p-6",
      "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
    )}>
      <div className="flex items-center gap-4">
        <img src={professional.avatar_url} alt={professional.full_name} className="h-16 w-16 rounded-3xl object-cover" />
        <div className="space-y-1">
          <h3 className={clsx(
            "text-lg font-semibold",
            "text-slate-900 dark:text-slate-100"
          )}>{professional.full_name}</h3>
          <p className={clsx(
            "text-sm",
            "text-slate-500 dark:text-slate-400"
          )}>{professional.profession}</p>
        </div>
      </div>
      <p className={clsx(
        "mt-4 line-clamp-3 text-sm",
        "text-slate-600 dark:text-slate-300"
      )}>{professional.bio}</p>
      <div className="mt-5 grid gap-3 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400" />
          {professional.rating.toFixed(1)} · {professional.reviews_count} recensioni
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          {professional.city}
        </span>
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-teal-500" />
          Disponibile questa settimana
        </span>
      </div>
      <Link
        to={`/profiles/${professional.id}`}
        className={clsx(
          "mt-6 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white transition",
          "bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-600"
        )}
      >
        Visualizza profilo
      </Link>
    </article>
  );
}
