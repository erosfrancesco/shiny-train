import { supabase, isSupabaseConfigured } from '@lib/supabase';
import type { Booking } from '@types';
import { sampleBookings } from '@lib/seed';

export async function createBooking(request: Omit<Booking, 'id' | 'created_at' | 'status'>) {
  if (!isSupabaseConfigured) {
    return {
      data: { ...request, id: `book-${Date.now()}`, created_at: new Date().toISOString(), status: 'pending' as const },
      error: null
    };
  }
  const { data, error } = await supabase.from('bookings').insert({ ...request, status: 'pending' }).single();
  return { data, error };
}

export async function fetchBookingsForClient(clientId: string) {
  if (!isSupabaseConfigured) {
    return sampleBookings.filter((booking) => booking.client_id === clientId);
  }
  const { data, error } = await supabase.from('bookings').select('*').eq('client_id', clientId);
  if (error) throw error;
  return data as Booking[];
}

export async function fetchBookingsForProfessional(professionalId: string) {
  if (!isSupabaseConfigured) {
    return sampleBookings.filter((booking) => booking.professional_id === professionalId);
  }
  const { data, error } = await supabase.from('bookings').select('*').eq('professional_id', professionalId);
  if (error) throw error;
  return data as Booking[];
}

export async function updateBookingStatus(id: string, status: Booking['status']) {
  if (!isSupabaseConfigured) {
    return { data: { id, status }, error: null };
  }
  const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).single();
  return { data, error };
}
