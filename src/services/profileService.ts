import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile, Review, Service, Availability } from '../types';
import { sampleAvailability, sampleProfiles, sampleReviews, sampleServices } from '../lib/seed';

export async function fetchProfiles(query = '', category = '', city = '') {
  if (!isSupabaseConfigured) {
    return sampleProfiles.filter((profile) => {
      const matchesQuery = query.length === 0 || profile.full_name.toLowerCase().includes(query.toLowerCase()) || profile.profession.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category ? profile.categories.includes(category) : true;
      const matchesCity = city ? profile.city.toLowerCase().includes(city.toLowerCase()) : true;
      return matchesQuery && matchesCategory && matchesCity;
    });
  }

  let queryBuilder = supabase.from('profiles').select('*');
  if (query) {
    queryBuilder = queryBuilder.ilike('full_name', `%${query}%`).or(`profession.ilike.%${query}%`);
  }
  if (category) {
    queryBuilder = queryBuilder.contains('categories', [category]);
  }
  if (city) {
    queryBuilder = queryBuilder.ilike('city', `%${city}%`);
  }
  const { data, error } = await queryBuilder;
  if (error) throw error;
  return data as Profile[];
}

export async function fetchProfileById(profileId: string) {
  if (!isSupabaseConfigured) {
    return sampleProfiles.find((profile) => profile.id === profileId) ?? sampleProfiles[0];
  }
  const { data, error } = await supabase.from('profiles').select('*').eq('id', profileId).single();
  if (error) throw error;
  return data as Profile;
}

export async function fetchServices(professionalId: string) {
  if (!isSupabaseConfigured) {
    return sampleServices.filter((service) => service.professional_id === professionalId);
  }
  const { data, error } = await supabase.from('services').select('*').eq('professional_id', professionalId);
  if (error) throw error;
  return data as Service[];
}

export async function fetchAvailability(professionalId: string) {
  if (!isSupabaseConfigured) {
    return sampleAvailability.filter((slot) => slot.professional_id === professionalId);
  }
  const { data, error } = await supabase.from('availability').select('*').eq('professional_id', professionalId);
  if (error) throw error;
  return data as Availability[];
}

export async function fetchReviews(professionalId: string) {
  if (!isSupabaseConfigured) {
    return sampleReviews.filter((review) => review.booking_id.startsWith('book')).slice(0, 3);
  }
  const { data, error } = await supabase
    .from('reviews')
    .select('*, bookings(*)')
    .eq('bookings.professional_id', professionalId);
  if (error) throw error;
  return (data as any).map((item: any) => ({
    id: item.id,
    booking_id: item.booking_id,
    reviewer_name: item.reviewer_name,
    rating: item.rating,
    comment: item.comment
  })) as Review[];
}
