import type { FilterState } from '@codeTypes/index';
import clsx from 'clsx';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (nextFilters: FilterState) => void;
}

const categories = ['Fisioterapia', 'Psicologia', 'Infermieristica', 'Benessere', 'Associazione'];

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  return (
    <aside className={clsx(
      "rounded-[32px] border p-6 shadow-soft",
      "border-slate-200 bg-white",
      "dark:border-slate-700 dark:bg-slate-900"
    )}>
      <div className="mt-5 space-y-5">

        <h2 className={clsx(
          "text-lg font-semibold",
          "text-slate-900 dark:text-slate-100"
        )}>Filtri</h2>

        <div className="pr-8">
          <label className={clsx(
            "block text-sm font-medium",
            "text-slate-700 dark:text-slate-300"
          )}>Categoria</label>
          <select
            value={filters.category}
            onChange={(event) => onChange({ ...filters, category: event.target.value })}
            className={clsx(
              "mt-2 px-4 py-3 w-full rounded-3xl text-sm outline-none",
              "border border-slate-200 text-slate-900",
              "focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
              "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-950"
            )}>
            <option value="">Tutte le categorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

    </aside >
  );
}
