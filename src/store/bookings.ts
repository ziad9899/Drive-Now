import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookingRecord, ContactRecord } from '../types';

interface BookingsState {
  bookings: BookingRecord[];
  addBooking: (b: BookingRecord) => void;
  contacts: ContactRecord[];
  addContact: (c: ContactRecord) => void;
}

export const useBookings = create<BookingsState>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (b) => set((s) => ({ bookings: [b, ...s.bookings] })),
      contacts: [],
      addContact: (c) => set((s) => ({ contacts: [c, ...s.contacts] })),
    }),
    { name: 'afaq.bookings' }
  )
);
