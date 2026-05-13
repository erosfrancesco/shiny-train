import { Link } from 'react-router-dom';
import type { Profile } from '../types';
import { Star, MapPin, CalendarDays } from 'lucide-react';

interface ProfessionalCardProps {
  professional: Profile;
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-center gap-4">
        <img src={professional.avatar_url} alt={professional.full_name} className="h-16 w-16 rounded-3xl object-cover" />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">{professional.full_name}</h3>
          <p className="text-sm text-slate-500">{professional.profession}</p>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 text-sm text-slate-600">{professional.bio}</p>
      <div className="mt-5 grid gap-3 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400" />
          {professional.rating.toFixed(1)} · {professional.reviews_count} reviews
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          {professional.city}
        </span>
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-teal-500" />
          Available this week
        </span>
      </div>
      <Link
        to={`/profiles/${professional.id}`}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        View profile
      </Link>
    </article>
  );
}
