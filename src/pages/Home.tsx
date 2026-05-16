import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '@components/SearchBar';

const categories = ['Fisioterapia', 'Psicologia', 'Infermieristica', 'Benessere', 'Associazione'];

export default function HomePage() {
  const [filters, setFilters] = useState({ query: '' });

  const handleSearch = (query: string) => {
    window.location.href = `/search?query=${encodeURIComponent(query)}&city=Roma`;
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-tealsoft px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">Cerca intorno a te</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Trova professionisti sanitari e del benessere di fiducia vicino a te.</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600">Cerca e richiedi appuntamenti con professionisti privati e associazioni per terapia, infermieristica, nutrizione e benessere.</p>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Link to="/search" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Esplora fornitori
              </Link>
              <Link to="/auth/register" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Iscriviti come cliente
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] bg-blueglass p-8 shadow-soft">
            <SearchBar query={filters.query} onSearch={handleSearch} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <span key={category} className="rounded-3xl bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm">{category}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
