import { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@lib/supabase';
import { useAuthStore } from '@store/authStore';
import { fetchProfile } from '@services/authService';

export function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  useEffect(() => {
    async function initialize() {
      setLoading(true);
      if (!isSupabaseConfigured) {
        setUser(null);
        setLoading(false);
        return;
      }

      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(profile);
      }
      setLoading(false);
    }

    initialize();
  }, [setUser, setLoading, setError]);
}
