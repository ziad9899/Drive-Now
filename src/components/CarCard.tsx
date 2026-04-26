import { Link } from 'react-router-dom';
import { Users, Cog, Fuel, MapPin, Star } from 'lucide-react';
import type { Car } from '../types';
import { formatSAR, formatNumber } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export function CarCard({ car }: { car: Car }) {
  const wa = whatsappLink(
    `مرحبًا، أرغب في الاستفسار عن ${car.name} (${car.model}) في ${car.city}.`
  );

  return (
    <article className="group card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden bg-line/40">
        <img
          src={car.images[0]}
          alt={car.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          <span className="badge-gold">{car.category}</span>
          {!car.available && (
            <span className="badge bg-red-50 text-red-700 border-red-200">
              غير متاحة الآن
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-lg bg-midnight/90 px-2 py-1 text-[11px] font-medium text-canvas">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span>{car.rating.toFixed(1)}</span>
          <span className="text-canvas/60">({formatNumber(car.reviewsCount)})</span>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-midnight">
              {car.name}
            </h3>
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-ink/60">
              <MapPin className="h-3.5 w-3.5" /> {car.city} · موديل {car.model}
            </p>
          </div>
          <div className="text-left">
            <div className="text-base font-bold text-midnight">
              {formatSAR(car.pricePerDay)}
            </div>
            <div className="text-[11px] text-ink/60">/ في اليوم</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="chip">
            <Users className="h-3.5 w-3.5" /> {car.seats} مقاعد
          </span>
          <span className="chip">
            <Cog className="h-3.5 w-3.5" /> {car.transmission}
          </span>
          <span className="chip">
            <Fuel className="h-3.5 w-3.5" /> {car.fuel}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/cars/${car.id}`}
            className="btn-primary flex-1 px-4 py-2.5"
          >
            عرض التفاصيل
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whats"
            aria-label="تواصل عبر واتساب"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>واتساب</span>
          </a>
        </div>
      </div>
    </article>
  );
}
