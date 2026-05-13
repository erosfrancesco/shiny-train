import { Star, ShieldCheck, MapPin } from 'lucide-react';
import type { Profile } from '../types';

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <img src={profile.avatar_url} alt={profile.full_name} className="h-24 w-24 rounded-[28px] object-cover" />
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Verified {profile.role === 'association' ? 'Association' : 'Professional'}</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{profile.full_name}</h1>
            <p className="mt-1 text-sm text-slate-500">{profile.profession} · {profile.city}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-blueglass p-4 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Rating</p>
            <p className="mt-2 flex items-center justify-center gap-2 text-2xl font-semibold text-slate-900">
              <Star className="h-5 w-5 text-amber-400" /> {profile.rating.toFixed(1)}
            </p>
          </div>
          <div className="rounded-3xl bg-blueglass p-4 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Reviews</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{profile.reviews_count}</p>
          </div>
          <div className="rounded-3xl bg-blueglass p-4 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Certified</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{profile.certifications.length}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm text-brand-700">
          <ShieldCheck className="h-4 w-4" /> Verified profile
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4" /> {profile.city}
        </span>
      </div>
    </section>
  );
}
