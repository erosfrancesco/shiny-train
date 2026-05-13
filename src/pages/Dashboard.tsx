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
        <p className="text-sm text-slate-600">Status: <span className="font-semibold text-slate-900">{booking.status}</span></p>
      </div>
      {onAction ? (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onAction('accepted')} className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
            Accept
          </button>
          <button onClick={() => onAction('rejected')} className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600">
            Reject
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
      .catch((error) => showToast(error.message || 'Unable to load bookings', 'error'))
      .finally(() => setLoading(false));
  }, [user, showToast]);

  const pendingRequests = useMemo(() => bookings.filter((booking) => booking.status === 'pending'), [bookings]);
  const pastBookings = useMemo(() => bookings.filter((booking) => booking.status !== 'pending'), [bookings]);

  const handleStatusChange = async (id: string, status: Booking['status']) => {
    setLoading(true);
    const { error } = await updateBookingStatus(id, status);
    if (error) showToast('Unable to update booking status', 'error');
    else {
      setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
      showToast('Booking status updated', 'success');
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-3 text-slate-600">Welcome back, {user.full_name}. Manage your appointments, profile settings, and booking requests in one place.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming bookings</h2>
          <div className="mt-6 space-y-4">
            {loading ? <p className="text-slate-500">Loading upcoming bookings...</p> : pendingRequests.length === 0 ? <p className="text-slate-500">No pending requests yet.</p> : pendingRequests.map((booking) => <BookingRow key={booking.id} booking={booking} onAction={user.role === 'professional' ? (status) => handleStatusChange(booking.id, status) : undefined} />)}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Profile settings</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <p><strong>Name:</strong> {user.full_name}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p className="rounded-3xl bg-blueglass px-4 py-3 text-slate-700">Tap the profile page to update availability and service details.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Booking history</h2>
        <div className="mt-6 space-y-4">
          {loading ? <p className="text-slate-500">Loading history...</p> : pastBookings.length === 0 ? <p className="text-slate-500">No history available.</p> : pastBookings.map((booking) => <BookingRow key={booking.id} booking={booking} />)}
        </div>
      </section>
    </div>
  );
}
