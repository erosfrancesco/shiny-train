import type { FilterState } from '@codeTypes/index';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (nextFilters: FilterState) => void;
}

const categories = ['Fisioterapia', 'Psicologia', 'Infermieristica', 'Benessere', 'Associazione'];

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  return (
    <aside className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">Filtri</h2>
      <div className="mt-5 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Categoria</label>
          <select
            value={filters.category}
            onChange={(event) => onChange({ ...filters, category: event.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Tutte le categorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
