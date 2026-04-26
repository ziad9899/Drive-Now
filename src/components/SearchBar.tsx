import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Car as CarIcon } from 'lucide-react';
import { CITIES } from '../data/cities';
import { useSearch } from '../store/search';
import { todayISO } from '../lib/format';

const CATEGORIES = ['اقتصادية', 'عائلية', 'فاخرة', 'SUV', 'أعمال'];

export function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  const navigate = useNavigate();
  const { city, pickupDate, dropoffDate, category, set } = useSearch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cars');
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-5 ${
        variant === 'hero' ? 'lg:gap-3' : ''
      }`}
    >
      <div>
        <label className="label">
          <MapPin className="ml-1 inline h-3.5 w-3.5 text-gold" /> المدينة
        </label>
        <select
          className="input appearance-none"
          value={city}
          onChange={(e) => set({ city: e.target.value })}
        >
          <option value="">كل المدن</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">
          <Calendar className="ml-1 inline h-3.5 w-3.5 text-gold" /> تاريخ الاستلام
        </label>
        <input
          type="date"
          className="input"
          min={todayISO()}
          value={pickupDate}
          onChange={(e) => set({ pickupDate: e.target.value })}
        />
      </div>

      <div>
        <label className="label">
          <Calendar className="ml-1 inline h-3.5 w-3.5 text-gold" /> تاريخ التسليم
        </label>
        <input
          type="date"
          className="input"
          min={pickupDate || todayISO(1)}
          value={dropoffDate}
          onChange={(e) => set({ dropoffDate: e.target.value })}
        />
      </div>

      <div>
        <label className="label">
          <CarIcon className="ml-1 inline h-3.5 w-3.5 text-gold" /> نوع السيارة
        </label>
        <select
          className="input appearance-none"
          value={category}
          onChange={(e) => set({ category: e.target.value })}
        >
          <option value="">كل الفئات</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <button type="submit" className="btn-gold w-full py-3.5">
          <Search className="h-4 w-4" />
          <span>ابحث عن سيارتك</span>
        </button>
      </div>
    </form>
  );
}
