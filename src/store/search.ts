import { create } from 'zustand';

export interface SearchQuery {
  city: string;
  pickupDate: string;
  dropoffDate: string;
  category: string;
}

interface SearchState extends SearchQuery {
  set: (q: Partial<SearchQuery>) => void;
  reset: () => void;
}

const initial: SearchQuery = {
  city: '',
  pickupDate: '',
  dropoffDate: '',
  category: '',
};

export const useSearch = create<SearchState>((set) => ({
  ...initial,
  set: (q) => set((s) => ({ ...s, ...q })),
  reset: () => set(initial),
}));
