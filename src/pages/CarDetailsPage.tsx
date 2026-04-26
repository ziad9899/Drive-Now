import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Users,
  Cog,
  Fuel,
  MapPin,
  Star,
  Snowflake,
  Briefcase,
  CalendarDays,
  ShieldCheck,
  Wrench,
  Headphones,
  Clock4,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { getCarById } from '../data/cars';
import { formatNumber, formatSAR } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { PriceSummary } from '../components/PriceSummary';
import { TrustBadges } from '../components/TrustBadges';

export function CarDetailsPage() {
  const { id = '' } = useParams();
  const car = getCarById(id);
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [delivery, setDelivery] = useState(false);

  if (!car) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="section-title">لم يتم العثور على هذه السيارة</h1>
        <p className="mt-2 text-sm text-ink/65">
          ربما تم حذف السيارة أو الرابط غير صحيح.
        </p>
        <Link to="/cars" className="btn-primary mt-6 inline-flex">
          العودة لقائمة السيارات
        </Link>
      </section>
    );
  }

  const wa = whatsappLink(
    `مرحبًا، أرغب في حجز ${car.name} (${car.model}) في ${car.city} بسعر ${car.pricePerDay} ريال/اليوم.`
  );

  return (
    <section className="container-page py-10 sm:py-14">
      <nav
        aria-label="breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-xs text-ink/55"
      >
        <Link to="/" className="hover:text-midnight">الرئيسية</Link>
        <ChevronRight className="h-3.5 w-3.5 rotate-180" />
        <Link to="/cars" className="hover:text-midnight">السيارات</Link>
        <ChevronRight className="h-3.5 w-3.5 rotate-180" />
        <span className="text-midnight">{car.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="aspect-[16/10] bg-line/30">
              <img
                src={car.images[activeImg]}
                alt={car.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-1 p-1">
              {car.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    activeImg === i
                      ? 'border-gold'
                      : 'border-transparent hover:border-line'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${car.name} ${i + 1}`}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="badge-gold">{car.category}</span>
                <h1 className="mt-3 text-2xl font-bold text-midnight sm:text-3xl">
                  {car.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink/60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {car.city}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> موديل {car.model}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    {car.rating.toFixed(1)} ({formatNumber(car.reviewsCount)} تقييم)
                  </span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-midnight">
                  {formatSAR(car.pricePerDay)}
                </div>
                <div className="text-xs text-ink/55">/ في اليوم</div>
              </div>
            </div>
          </div>

          <Section title="المواصفات">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Spec icon={Users} label="المقاعد" value={`${car.seats}`} />
              <Spec icon={Cog} label="ناقل الحركة" value={car.transmission} />
              <Spec icon={Fuel} label="نوع الوقود" value={car.fuel} />
              <Spec icon={CalendarDays} label="الموديل" value={`${car.model}`} />
              <Spec
                icon={Snowflake}
                label="التكييف"
                value={car.airCondition ? 'يعمل بكفاءة' : 'غير متوفر'}
              />
              <Spec icon={Briefcase} label="الأمتعة" value={`${car.luggage} حقائب`} />
            </div>
          </Section>

          <Section title="مميزات هذه السيارة">
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, t: 'تأمين أساسي شامل' },
                { icon: Wrench, t: 'فحص دوري قبل التسليم' },
                { icon: Headphones, t: 'دعم على مدار الساعة' },
                { icon: Clock4, t: 'إلغاء مرن خلال 30 دقيقة' },
              ].map(({ icon: Icon, t }) => (
                <li
                  key={t}
                  className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-sm"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/10 text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="شروط مختصرة">
            <ul className="space-y-2 text-sm leading-7 text-ink/70">
              <li>· الحد الأدنى لعمر السائق 21 سنة مع رخصة سارية المفعول.</li>
              <li>· يلزم إحضار الهوية الوطنية أو الإقامة عند الاستلام.</li>
              <li>· الكيلومترات المسموح بها 250 كم/يوم بدون رسوم إضافية.</li>
              <li>· يمكن إلغاء أو تعديل الحجز مجانًا خلال 30 دقيقة من إنشائه.</li>
            </ul>
          </Section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-20 space-y-4">
            <PriceSummary
              pricePerDay={car.pricePerDay}
              days={3}
              delivery={delivery}
            />

            <div className="card p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-gold"
                  checked={delivery}
                  onChange={(e) => setDelivery(e.target.checked)}
                />
                <div>
                  <div className="text-sm font-medium text-ink">
                    أرغب بتوصيل السيارة لموقعي
                  </div>
                  <div className="mt-0.5 text-xs text-ink/55">
                    رسوم رمزية {formatSAR(50)} داخل المدينة، يتم احتسابها في الإجمالي.
                  </div>
                </div>
              </label>
            </div>

            <div className="grid gap-2">
              <button
                onClick={() => navigate(`/booking/${car.id}`)}
                disabled={!car.available}
                className="btn-primary py-3.5 text-base"
              >
                {car.available ? 'احجز الآن' : 'غير متاحة حاليًا'}
                {car.available && <ArrowLeft className="h-4 w-4" />}
              </button>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whats py-3"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>

            <TrustBadges layout="grid" size="sm" />
          </div>
        </aside>
      </div>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 border-t border-line pt-6">
      <h2 className="mb-4 text-base font-semibold text-midnight">{title}</h2>
      {children}
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-canvas text-midnight">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-[11px] text-ink/50">{label}</div>
        <div className="text-sm font-medium text-midnight">{value}</div>
      </div>
    </div>
  );
}
