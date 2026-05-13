import type { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (nextFilters: FilterState) => void;
}

const categories = ['Physiotherapy', 'Psychology', 'Nursing', 'Wellness', 'Association'];

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  return (
    <aside className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
      <div className="mt-5 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Category</label>
          <select
            value={filters.category}
            onChange={(event) => onChange({ ...filters, category: event.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">City</label>
          <input
            value={filters.city}
            onChange={(event) => onChange({ ...filters, city: event.target.value })}
            placeholder="City"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>
    </aside>
  );
}
