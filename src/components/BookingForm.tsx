import { useMemo, useState } from 'react';
import type { Service } from '../types';
import { useToastStore } from '../store/uiStore';

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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-slate-900">Richiedi Appuntamento</h2>
      <p className="text-sm text-slate-500">Scegli il servizio, la data e l'orario preferiti per inviare una richiesta.</p>

      <div className="grid gap-4">
        <label className="block text-sm font-medium text-slate-700">Servizio</label>
        <select
          value={serviceId}
          onChange={(event) => setServiceId(event.target.value)}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>{service.title}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Data</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Orario</label>
          <select
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Scegli un orario</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Note</label>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          placeholder="Descrivi il tuo obiettivo di salute o motivo della prenotazione"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-brand-700">
        Invia richiesta
      </button>
      {selectedService ? <p className="text-sm text-slate-500">Selezionato: {selectedService.title} · {selectedService.duration_minutes} min</p> : null}
    </form>
  );
}
