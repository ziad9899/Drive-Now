import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LocalUser } from '../types';

// Local Demo Auth only — no real server, no real session.
interface AuthState {
  user: LocalUser | null;
  signIn: (user: LocalUser) => void;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: 'afaq.auth' }
  )
);
