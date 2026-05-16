import type { Service } from '@codeTypes/index';
import clsx from 'clsx';

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
      className={clsx(
        "group relative w-full rounded-[28px] border p-5 text-left transition",
        selected ? clsx(
          "border-brand-600 bg-brand-50 dark:border-brand-500 dark:bg-brand-950"
        ) : clsx(
          "border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm",
          "dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-600"
        )
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className={clsx(
            "text-lg font-semibold",
            "text-slate-900 dark:text-slate-100"
          )}>{service.title}</h3>
          <p className={clsx(
            "mt-2 text-sm",
            "text-slate-600 dark:text-slate-300"
          )}>{service.description}</p>
        </div>
        <span className={clsx(
          "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
          "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        )}>
          {service.price_label}
        </span>
      </div>
      <p className={clsx(
        "mt-4 text-sm",
        "text-slate-500 dark:text-slate-400"
      )}>Durata: {service.duration_minutes} min</p>
    </button>
  );
}
