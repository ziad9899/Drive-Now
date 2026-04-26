import { useMemo, useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, SearchX } from 'lucide-react';
import { CarCard } from '../components/CarCard';
import { CARS } from '../data/cars';
import { CITIES } from '../data/cities';
import type { CarCategory, Transmission } from '../types';
import { formatNumber, formatSAR } from '../lib/format';
import { useSearch } from '../store/search';

const CATEGORIES: CarCategory[] = ['اقتصادية', 'عائلية', 'فاخرة', 'SUV', 'أعمال'];
const TRANSMISSIONS: Transmission[] = ['أوتوماتيك', 'يدوي'];
const SEATS = [2, 4, 5, 7, 9];

const PRICE_MIN = 50;
const PRICE_MAX = 1000;

export function CarsPage() {
  const search = useSearch();
  const [city, setCity] = useState(search.city);
  const [category, setCategory] = useState<CarCategory | ''>(
    (search.category as CarCategory) || ''
  );
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [transmission, setTransmission] = useState<Transmission | ''>('');
  const [seats, setSeats] = useState<number | ''>('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return CARS.filter((c) => {
      if (city && c.city !== city) return false;
      if (category && c.category !== category) return false;
      if (transmission && c.transmission !== transmission) return false;
      if (seats && c.seats !== seats) return false;
      if (onlyAvailable && !c.available) return false;
      if (c.pricePerDay > maxPrice) return false;
      return true;
    });
  }, [city, category, transmission, seats, onlyAvailable, maxPrice]);

  const reset = () => {
    setCity('');
    setCategory('');
    setMaxPrice(PRICE_MAX);
    setTransmission('');
    setSeats('');
    setOnlyAvailable(false);
  };

  return (
    <section className="container-page py-10 sm:py-14">
      <header className="mb-8">
        <span className="section-eyebrow">الأسطول الكامل</span>
        <h1 className="section-title mt-2">اختر السيارة المناسبة لرحلتك</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/65">
          {formatNumber(filtered.length)} سيارة مطابقة من أصل{' '}
          {formatNumber(CARS.length)} في الأسطول. كل الأسعار مذكورة لليوم
          الواحد بالريال السعودي وبدون رسوم مخفية.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:hidden">
            <button
              onClick={() => setFiltersOpen(true)}
              className="btn-ghost w-full"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>الفلاتر</span>
            </button>
          </div>

          <div
            className={`${
              filtersOpen
                ? 'fixed inset-0 z-50 overflow-y-auto bg-canvas p-5 lg:static lg:p-0'
                : 'hidden lg:block'
            }`}
          >
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <h3 className="text-base font-semibold text-midnight">الفلاتر</h3>
              <button
                onClick={() => setFiltersOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <FiltersPanel
              city={city}
              setCity={setCity}
              category={category}
              setCategory={setCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              transmission={transmission}
              setTransmission={setTransmission}
              seats={seats}
              setSeats={setSeats}
              onlyAvailable={onlyAvailable}
              setOnlyAvailable={setOnlyAvailable}
              onReset={reset}
            />

            <div className="mt-4 lg:hidden">
              <button
                onClick={() => setFiltersOpen(false)}
                className="btn-primary w-full"
              >
                عرض {formatNumber(filtered.length)} سيارة
              </button>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          {filtered.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface FiltersProps {
  city: string;
  setCity: (v: string) => void;
  category: CarCategory | '';
  setCategory: (v: CarCategory | '') => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  transmission: Transmission | '';
  setTransmission: (v: Transmission | '') => void;
  seats: number | '';
  setSeats: (v: number | '') => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (v: boolean) => void;
  onReset: () => void;
}

function FiltersPanel(p: FiltersProps) {
  return (
    <div className="card sticky top-20 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-midnight">تصفية النتائج</h3>
        <button
          type="button"
          onClick={p.onReset}
          className="inline-flex items-center gap-1 text-xs text-ink/60 hover:text-midnight"
        >
          <RotateCcw className="h-3.5 w-3.5" /> إعادة تعيين
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="label">المدينة</label>
          <select
            className="input"
            value={p.city}
            onChange={(e) => p.setCity(e.target.value)}
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
          <label className="label">نوع السيارة</label>
          <div className="flex flex-wrap gap-1.5">
            {(['', ...CATEGORIES] as const).map((c) => (
              <button
                key={c || 'all'}
                type="button"
                onClick={() => p.setCategory(c as CarCategory | '')}
                className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                  p.category === c
                    ? 'border-midnight bg-midnight text-canvas'
                    : 'border-line bg-white text-ink/70 hover:border-midnight/30'
                }`}
              >
                {c || 'الكل'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="label mb-0">السعر اليومي</label>
            <span className="text-[12px] font-medium text-midnight">
              حتى {formatSAR(p.maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={p.maxPrice}
            onChange={(e) => p.setMaxPrice(Number(e.target.value))}
            className="w-full accent-gold"
          />
          <div className="mt-1 flex justify-between text-[11px] text-ink/50">
            <span>{formatSAR(PRICE_MIN)}</span>
            <span>{formatSAR(PRICE_MAX)}</span>
          </div>
        </div>

        <div>
          <label className="label">ناقل الحركة</label>
          <div className="flex gap-1.5">
            {(['', ...TRANSMISSIONS] as const).map((t) => (
              <button
                key={t || 'all'}
                type="button"
                onClick={() => p.setTransmission(t as Transmission | '')}
                className={`flex-1 rounded-lg border px-3 py-1.5 text-xs transition ${
                  p.transmission === t
                    ? 'border-midnight bg-midnight text-canvas'
                    : 'border-line bg-white text-ink/70 hover:border-midnight/30'
                }`}
              >
                {t || 'الكل'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">عدد المقاعد</label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => p.setSeats('')}
              className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                p.seats === ''
                  ? 'border-midnight bg-midnight text-canvas'
                  : 'border-line bg-white text-ink/70 hover:border-midnight/30'
              }`}
            >
              الكل
            </button>
            {SEATS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => p.setSeats(s)}
                className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                  p.seats === s
                    ? 'border-midnight bg-midnight text-canvas'
                    : 'border-line bg-white text-ink/70 hover:border-midnight/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-line bg-canvas/40 p-3">
          <span className="text-sm text-ink">متاحة الآن فقط</span>
          <input
            type="checkbox"
            checked={p.onlyAvailable}
            onChange={(e) => p.setOnlyAvailable(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
        </label>
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-canvas">
        <SearchX className="h-7 w-7 text-ink/40" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-midnight">
        لم نعثر على سيارات مطابقة
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-7 text-ink/60">
        جرّب توسيع مدى السعر أو إزالة بعض الفلاتر، وسنعرض لك خيارات أكثر
        مرونة.
      </p>
      <button onClick={onReset} className="btn-primary mt-5">
        <RotateCcw className="h-4 w-4" />
        <span>إعادة تعيين الفلاتر</span>
      </button>
    </div>
  );
}
