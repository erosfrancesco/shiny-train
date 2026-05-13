import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  city: string;
  onSearch: (query: string, city: string) => void;
}

export default function SearchBar({ query, city, onSearch }: SearchBarProps) {
  const [searchText, setSearchText] = useState(query);
  const [locationText, setLocationText] = useState(city);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchText.trim(), locationText.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-[1.5fr,1fr,auto]">
      <label className="sr-only" htmlFor="search-query">Search services or professionals</label>
      <input
        id="search-query"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search professionals, therapy, nursing"
        className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />

      <label className="sr-only" htmlFor="search-city">City or location</label>
      <div className="relative">
        <input
          id="search-city"
          value={locationText}
          onChange={(event) => setLocationText(event.target.value)}
          placeholder="City"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <button type="submit" className="rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700">
        Search
      </button>
    </form>
  );
}
