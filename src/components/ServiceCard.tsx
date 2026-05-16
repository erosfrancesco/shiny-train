import type { Service } from '@codeTypes/index';

interface ServiceCardProps {
  service: Service;
  onSelect?: () => void;
  selected?: boolean;
}

export default function ServiceCard({ service, onSelect, selected }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full rounded-[28px] border p-5 text-left transition ${
        selected ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{service.description}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
          {service.price_label}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">Durata: {service.duration_minutes} min</p>
    </button>
  );
}
