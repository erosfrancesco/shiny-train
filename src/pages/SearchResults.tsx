import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '@components/FilterSidebar';
import ProfessionalCard from '@components/ProfessionalCard';
import SearchBar from '@components/SearchBar';
import { fetchProfiles } from '@services/profileService';
import { useDebounce } from '@hooks/useDebounce';
import { FilterState, Profile } from '@codeTypes/index';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') ?? '';
  const [filters, setFilters] = useState<FilterState>({ query: initialQuery, category: '', city: 'Rome' });
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(filters.query, 350);

  useEffect(() => {
    setLoading(true);
    fetchProfiles(debouncedQuery, filters.category, 'Rome')
      .then(setResults)
      .catch((err) => setError(err.message || 'Impossibile caricare i fornitori'))
      .finally(() => setLoading(false));
  }, [debouncedQuery, filters.category]);

  const resultsText = useMemo(() => {
    if (loading) return 'Ricerca professionisti...';
    if (error) return error;
    if (results.length === 0) return 'Nessun professionista corrisponde alla tua ricerca.';
    return `${results.length} fornitori disponibili`;
  }, [error, loading, results.length]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
      <FilterSidebar filters={filters} onChange={setFilters} />
      <div className="space-y-6">
        <SearchBar query={filters.query} onSearch={(query) => setFilters({ ...filters, query })} />
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-medium text-slate-700">{resultsText}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-60 animate-pulse rounded-[32px] bg-slate-200" />
            ))
            : results.map((profile) => <ProfessionalCard key={profile.id} professional={profile} />)}
        </div>
      </div>
    </div>
  );
}
