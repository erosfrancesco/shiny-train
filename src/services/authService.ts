import { supabase, isSupabaseConfigured } from '@lib/supabase';
import type { Profile } from '@codeTypes/index';

const fallbackProfile: Profile = {
  id: 'client-1',
  role: 'client',
  full_name: 'Maya Collins',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  city: 'Seattle',
  profession: 'Wellness Client',
  bio: 'Exploring trusted healthcare and wellness providers nearby.',
  rating: 0,
  reviews_count: 0,
  categories: ['Client'],
  certifications: [],
  created_at: new Date().toISOString(),
};

export async function loginWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured) return { data: fallbackProfile, error: null };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signUpWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured) return { data: fallbackProfile, error: null };
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

export async function signOut() {
  if (!isSupabaseConfigured) return { error: null };
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  if (!isSupabaseConfigured) return { data: null, error: null };
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

export async function fetchProfile(userId: string) {
  if (!isSupabaseConfigured) return fallbackProfile;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) throw error;
  return data as Profile;
}

export async function createProfile(profile: Partial<Profile>) {
  if (!isSupabaseConfigured) return { data: fallbackProfile, error: null };
  const { data, error } = await supabase.from('profiles').insert(profile).single();
  return { data, error };
}
