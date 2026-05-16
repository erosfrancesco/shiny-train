import { useState } from 'react';

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ query, onSearch }: SearchBarProps) {
  const [searchText, setSearchText] = useState(query);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchText.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-[1fr,auto]">
      <label className="sr-only" htmlFor="search-query">Cerca servizi o professionisti</label>
      <input
        id="search-query"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Cerca professionisti, terapia, infermieristica"
        className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />

      <button type="submit" className="rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700">
        Cerca
      </button>
    </form>
  );
}
