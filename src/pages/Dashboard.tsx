import { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { fetchBookingsForClient, fetchBookingsForProfessional, updateBookingStatus } from '../services/bookingService';
import type { Booking } from '../types';
import { useToastStore } from '../store/uiStore';

function BookingRow({ booking, onAction }: { booking: Booking; onAction?: (status: Booking['status']) => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-base font-semibold text-slate-900">{booking.booking_date} · {booking.booking_time}</p>
        <p className="text-sm text-slate-600">Stato: <span className="font-semibold text-slate-900">{booking.status}</span></p>
      </div>
      {onAction ? (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onAction('accepted')} className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
            Accetta
          </button>
          <button onClick={() => onAction('rejected')} className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600">
            Rifiuta
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const fetchData = user.role === 'client' ? fetchBookingsForClient(user.id) : fetchBookingsForProfessional(user.id);
    fetchData
      .then(setBookings)
      .catch((error) => showToast(error.message || 'Impossibile caricare le prenotazioni', 'error'))
      .finally(() => setLoading(false));
  }, [user, showToast]);

  const pendingRequests = useMemo(() => bookings.filter((booking) => booking.status === 'pending'), [bookings]);
  const pastBookings = useMemo(() => bookings.filter((booking) => booking.status !== 'pending'), [bookings]);

  const handleStatusChange = async (id: string, status: Booking['status']) => {
    setLoading(true);
    const { error } = await updateBookingStatus(id, status);
    if (error) showToast('Impossibile aggiornare lo stato della prenotazione', 'error');
    else {
      setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
      showToast('Stato della prenotazione aggiornato', 'success');
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-3 text-slate-600">Bentornato, {user.full_name}. Gestisci i tuoi appuntamenti, le impostazioni del profilo e le richieste di prenotazione in un unico posto.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Prenotazioni in arrivo</h2>
          <div className="mt-6 space-y-4">
            {loading ? <p className="text-slate-500">Caricamento prenotazioni in arrivo...</p> : pendingRequests.length === 0 ? <p className="text-slate-500">Ancora nessuna richiesta in sospeso.</p> : pendingRequests.map((booking) => <BookingRow key={booking.id} booking={booking} onAction={user.role === 'professional' ? (status) => handleStatusChange(booking.id, status) : undefined} />)}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Impostazioni profilo</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <p><strong>Nome:</strong> {user.full_name}</p>
            <p><strong>Ruolo:</strong> {user.role}</p>
            <p><strong>Città:</strong> {user.city}</p>
            <p className="rounded-3xl bg-blueglass px-4 py-3 text-slate-700">Tocca la pagina del profilo per aggiornare disponibilità e dettagli dei servizi.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Storico prenotazioni</h2>
        <div className="mt-6 space-y-4">
          {loading ? <p className="text-slate-500">Caricamento storico...</p> : pastBookings.length === 0 ? <p className="text-slate-500">Nessuno storico disponibile.</p> : pastBookings.map((booking) => <BookingRow key={booking.id} booking={booking} />)}
        </div>
      </section>
    </div>
  );
}
