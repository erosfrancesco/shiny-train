import { useMemo, useState } from 'react';
import type { Service } from '@codeTypes/index';
import { useToastStore } from '@store/uiStore';
import clsx from 'clsx';

interface BookingFormProps {
  services: Service[];
  onBook: (payload: { serviceId: string; date: string; time: string; notes: string }) => void;
}

const timeSlots = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'];

export default function BookingForm({ services, onBook }: BookingFormProps) {
  const [serviceId, setServiceId] = useState(services[0]?.id ?? '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const showToast = useToastStore((state) => state.showToast);

  const selectedService = useMemo(() => services.find((service) => service.id === serviceId), [serviceId, services]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serviceId || !date || !time) {
      showToast('Seleziona un servizio, una data e un orario prima di richiedere.', 'error');
      return;
    }
    onBook({ serviceId, date, time, notes });
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(
      "space-y-5 rounded-[32px] border p-6 shadow-soft",
      "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
    )}>
      <h2 className={clsx(
        "text-xl font-semibold",
        "text-slate-900 dark:text-slate-100"
      )}>Richiedi Appuntamento</h2>
      <p className={clsx(
        "text-sm",
        "text-slate-500 dark:text-slate-400"
      )}>Scegli il servizio, la data e l'orario preferiti per inviare una richiesta.</p>

      <div className="grid gap-4">
        <label className={clsx(
          "block text-sm font-medium",
          "text-slate-700 dark:text-slate-300"
        )}>Servizio</label>
        <select
          value={serviceId}
          onChange={(event) => setServiceId(event.target.value)}
          className={clsx(
            "w-full rounded-3xl border px-4 py-3 text-sm outline-none",
            "border-slate-200 bg-slate-50 text-slate-900",
            "focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
            "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-950"
          )}
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>{service.title}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={clsx(
            "block text-sm font-medium",
            "text-slate-700 dark:text-slate-300"
          )}>Data</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={clsx(
              "w-full rounded-3xl border px-4 py-3 text-sm outline-none",
              "border-slate-200 bg-slate-50 text-slate-900",
              "focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
              "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-950"
            )}
          />
        </div>
        <div className="space-y-2">
          <label className={clsx(
            "block text-sm font-medium",
            "text-slate-700 dark:text-slate-300"
          )}>Orario</label>
          <select
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={clsx(
              "w-full rounded-3xl border px-4 py-3 text-sm outline-none",
              "border-slate-200 bg-slate-50 text-slate-900",
              "focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
              "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-950"
            )}
          >
            <option value="">Scegli un orario</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className={clsx(
          "block text-sm font-medium",
          "text-slate-700 dark:text-slate-300"
        )}>Note</label>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          placeholder="Descrivi il tuo obiettivo di salute o motivo della prenotazione"
          className={clsx(
            "w-full rounded-3xl border px-4 py-3 text-sm outline-none",
            "border-slate-200 bg-slate-50 text-slate-900",
            "focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
            "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-950"
          )}
        />
      </div>

      <button type="submit" className={clsx(
        "inline-flex items-center justify-center rounded-3xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition",
        "bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-600"
      )}>
        Invia richiesta
      </button>
      {selectedService ? <p className={clsx(
        "text-sm",
        "text-slate-500 dark:text-slate-400"
      )}>Selezionato: {selectedService.title} · {selectedService.duration_minutes} min</p> : null}
    </form>
  );
}
