import { create } from 'zustand';
import type { Profile, Role } from '../types';

interface AuthState {
  user: Profile | null;
  session: string | null;
  role: Role | null;
  loading: boolean;
  error: string | null;
  setUser: (profile: Profile | null) => void;
  setLoading: (flag: boolean) => void;
  setError: (message: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  role: null,
  loading: false,
  error: null,
  setUser: (profile) => set({ user: profile, role: profile?.role ?? null }),
  setLoading: (flag) => set({ loading: flag }),
  setError: (message) => set({ error: message })
}));
