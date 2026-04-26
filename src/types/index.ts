export type CarCategory = 'اقتصادية' | 'عائلية' | 'فاخرة' | 'SUV' | 'أعمال';
export type Transmission = 'أوتوماتيك' | 'يدوي';
export type FuelType = 'بنزين' | 'ديزل' | 'هايبرد';

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: number;
  category: CarCategory;
  city: string;
  pricePerDay: number;
  seats: number;
  transmission: Transmission;
  fuel: FuelType;
  airCondition: boolean;
  luggage: number;
  available: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  featured?: boolean;
}

export interface BookingDraft {
  carId: string;
  fullName: string;
  phone: string;
  email?: string;
  pickupCity: string;
  dropoffCity: string;
  pickupDate: string;
  dropoffDate: string;
  delivery: boolean;
  notes?: string;
}

export interface BookingRecord extends BookingDraft {
  orderId: string;
  createdAt: string;
  totalPrice: number;
  days: number;
}

export interface LocalUser {
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface ContactRecord {
  id: string;
  fullName: string;
  phone: string;
  message: string;
  createdAt: string;
}
