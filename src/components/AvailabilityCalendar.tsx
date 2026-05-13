import type { Availability } from '../types';

interface AvailabilityCalendarProps {
  availability: Availability[];
}

export default function AvailabilityCalendar({ availability }: AvailabilityCalendarProps) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-slate-900">Disponibilità</h2>
      <p className="mt-2 text-sm text-slate-500">Rivedi i giorni disponibili e richiedi un orario.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {availability.map((slot) => (
          <div key={slot.id} className="rounded-3xl border border-slate-200 bg-blueglass p-4">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{slot.weekday}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{slot.start_time} - {slot.end_time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
