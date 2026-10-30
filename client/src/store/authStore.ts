import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAdmin: boolean;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAdmin: false,
      setAccessToken: (token) => set({ accessToken: token, isAdmin: true }),
      logout: () => set({ accessToken: null, isAdmin: false }),
    }),
    { name: 'musafir-auth' },
  ),
);
