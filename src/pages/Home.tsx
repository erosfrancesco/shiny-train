import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProfessionalCard from '../components/ProfessionalCard';
import { sampleProfiles } from '../lib/seed';

const categories = ['Physiotherapy', 'Psychology', 'Nursing', 'Wellness', 'Association'];

export default function HomePage() {
  const [filters, setFilters] = useState({ query: '', city: '' });

  const featured = useMemo(() => sampleProfiles.slice(0, 3), []);

  const handleSearch = (query: string, city: string) => {
    window.location.href = `/search?query=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`;
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-tealsoft px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">Healthcare marketplace</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Find trusted healthcare and wellness professionals near you.</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600">Search and request appointments with private professionals and associations for therapy, nursing, nutrition and wellbeing.</p>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Link to="/search" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Explore providers
              </Link>
              <Link to="/auth/register" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Join as a client
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] bg-blueglass p-8 shadow-soft">
            <SearchBar query={filters.query} city={filters.city} onSearch={handleSearch} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <span key={category} className="rounded-3xl bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm">{category}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Featured professionals</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Top-rated care providers</h2>
          </div>
          <Link to="/search" className="text-sm font-semibold text-brand-600 hover:text-brand-700">Browse all providers</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((profile) => (
            <ProfessionalCard key={profile.id} professional={profile} />
          ))}
        </div>
      </section>
    </div>
  );
}
