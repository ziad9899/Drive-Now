import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  CarFront,
  UserRound,
  ClipboardCheck,
  MapPin,
  Calendar,
  Phone,
  Mail,
  StickyNote,
  Truck,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { getCarById } from '../data/cars';
import { CITIES } from '../data/cities';
import { PriceSummary } from '../components/PriceSummary';
import { useBookings } from '../store/bookings';
import { useAuth } from '../store/auth';
import {
  daysBetween,
  formatDateAr,
  formatSAR,
  generateOrderId,
  todayISO,
} from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import type { BookingDraft, BookingRecord } from '../types';

const DELIVERY_FEE = 50;

export function BookingPage() {
  const { id = '' } = useParams();
  const car = getCarById(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingRecord | null>(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState<BookingDraft>({
    carId: id,
    fullName: user?.fullName ?? '',
    phone: user?.phone ?? '',
    email: user?.email ?? '',
    pickupCity: car?.city ?? '',
    dropoffCity: car?.city ?? '',
    pickupDate: todayISO(1),
    dropoffDate: todayISO(4),
    delivery: false,
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingDraft, string>>>({});

  const days = useMemo(
    () => daysBetween(form.pickupDate, form.dropoffDate),
    [form.pickupDate, form.dropoffDate]
  );

  const total = useMemo(() => {
    if (!car) return 0;
    return car.pricePerDay * days + (form.delivery ? DELIVERY_FEE : 0);
  }, [car, days, form.delivery]);

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        fullName: f.fullName || user.fullName,
        phone: f.phone || user.phone,
        email: f.email || user.email,
      }));
    }
  }, [user]);

  if (!car) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="section-title">السيارة غير متاحة</h1>
        <Link to="/cars" className="btn-primary mt-6 inline-flex">
          العودة للأسطول
        </Link>
      </section>
    );
  }

  const update = <K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (s: 1 | 2): boolean => {
    const e: Partial<Record<keyof BookingDraft, string>> = {};
    if (s === 1) {
      if (!form.pickupCity) e.pickupCity = 'اختر مدينة الاستلام';
      if (!form.dropoffCity) e.dropoffCity = 'اختر مدينة التسليم';
      if (!form.pickupDate) e.pickupDate = 'حدد تاريخ الاستلام';
      if (!form.dropoffDate) e.dropoffDate = 'حدد تاريخ التسليم';
      if (form.pickupDate && form.dropoffDate && days <= 0) {
        e.dropoffDate = 'يجب أن يكون التسليم بعد الاستلام';
      }
    } else {
      if (!form.fullName.trim() || form.fullName.trim().length < 3)
        e.fullName = 'الاسم قصير جدًا';
      if (!/^[0-9+\s-]{9,}$/.test(form.phone.trim()))
        e.phone = 'رقم جوال غير صالح';
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
        e.email = 'البريد الإلكتروني غير صالح';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validateStep(1)) setStep(2);
    else if (step === 2 && validateStep(2)) setStep(3);
  };
  const goBack = () => setStep((s) => (s === 3 ? 2 : s === 2 ? 1 : 1));

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const record: BookingRecord = {
      ...form,
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      totalPrice: total,
      days,
    };
    addBooking(record);
    setSubmitting(false);
    setConfirmation(record);
  };

  if (confirmation) {
    return (
      <ConfirmationView
        record={confirmation}
        carName={car.name}
        copied={copied}
        onCopy={() => {
          navigator.clipboard.writeText(confirmation.orderId);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
      />
    );
  }

  return (
    <section className="container-page py-10 sm:py-14">
      <header className="mb-8">
        <span className="section-eyebrow">إتمام الحجز</span>
        <h1 className="section-title mt-2">حجز {car.name}</h1>
        <p className="mt-2 text-sm text-ink/65">
          ثلاث خطوات قصيرة فقط لتأكيد طلبك. كل البيانات محفوظة محليًا في متصفحك.
        </p>
      </header>

      <Stepper step={step} />

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="card p-6">
            {step === 1 && (
              <Step1
                form={form}
                update={update}
                errors={errors}
                carCity={car.city}
              />
            )}
            {step === 2 && <Step2 form={form} update={update} errors={errors} />}
            {step === 3 && (
              <Step3
                form={form}
                carName={car.name}
                pricePerDay={car.pricePerDay}
                days={days}
                total={total}
              />
            )}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1 || submitting}
                className="btn-ghost disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" />
                <span>السابق</span>
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="btn-primary"
                >
                  <span>التالي</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="btn-gold min-w-[180px]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>جاري التأكيد...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>تأكيد الطلب</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-20 space-y-4">
            <div className="card overflow-hidden">
              <div className="aspect-[16/10] bg-line/30">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-ink/55">{car.category}</div>
                <h3 className="mt-1 text-base font-semibold text-midnight">
                  {car.name}
                </h3>
                <p className="mt-1 text-xs text-ink/55">
                  {car.city} · موديل {car.model}
                </p>
              </div>
            </div>

            <PriceSummary
              pricePerDay={car.pricePerDay}
              days={days}
              delivery={form.delivery}
              deliveryFee={DELIVERY_FEE}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: 'اختيار المواعيد', icon: CarFront },
    { n: 2, label: 'بيانات الحجز', icon: UserRound },
    { n: 3, label: 'تأكيد الطلب', icon: ClipboardCheck },
  ];
  return (
    <ol className="flex items-center justify-between gap-2 sm:gap-3">
      {steps.map((s, i) => {
        const active = step === s.n;
        const done = step > s.n;
        const Icon = s.icon;
        return (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium sm:text-sm ${
                active
                  ? 'bg-midnight text-canvas'
                  : done
                    ? 'bg-gold/10 text-[#8a6a25]'
                    : 'bg-white text-ink/60 border border-line'
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-lg ${
                  active
                    ? 'bg-gold text-midnight'
                    : done
                      ? 'bg-gold text-midnight'
                      : 'bg-canvas text-ink/50'
                }`}
              >
                {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">خطوة {s.n}</span>
            </div>
            {i < steps.length - 1 && (
              <span className="h-px flex-1 bg-line" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  icon: Icon,
  label,
  error,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label">
        {Icon && <Icon className="ml-1 inline h-3.5 w-3.5 text-gold" />}
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[12px] font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}

function Step1({
  form,
  update,
  errors,
  carCity,
}: {
  form: BookingDraft;
  update: <K extends keyof BookingDraft>(k: K, v: BookingDraft[K]) => void;
  errors: Partial<Record<keyof BookingDraft, string>>;
  carCity: string;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-midnight">
        مواعيد الاستلام والتسليم
      </h2>
      <p className="-mt-3 text-xs text-ink/55">
        السيارة متوفرة افتراضيًا في مدينة {carCity}. يمكنك اختيار التوصيل لمدينة أخرى.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={MapPin} label="مدينة الاستلام" error={errors.pickupCity}>
          <select
            className="input"
            value={form.pickupCity}
            onChange={(e) => update('pickupCity', e.target.value)}
          >
            <option value="">اختر مدينة</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field icon={MapPin} label="مدينة التسليم" error={errors.dropoffCity}>
          <select
            className="input"
            value={form.dropoffCity}
            onChange={(e) => update('dropoffCity', e.target.value)}
          >
            <option value="">اختر مدينة</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field icon={Calendar} label="تاريخ الاستلام" error={errors.pickupDate}>
          <input
            type="date"
            className="input"
            min={todayISO()}
            value={form.pickupDate}
            onChange={(e) => update('pickupDate', e.target.value)}
          />
        </Field>

        <Field icon={Calendar} label="تاريخ التسليم" error={errors.dropoffDate}>
          <input
            type="date"
            className="input"
            min={form.pickupDate || todayISO(1)}
            value={form.dropoffDate}
            onChange={(e) => update('dropoffDate', e.target.value)}
          />
        </Field>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas/40 p-4">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-gold"
          checked={form.delivery}
          onChange={(e) => update('delivery', e.target.checked)}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-medium text-ink">
            <Truck className="h-4 w-4 text-gold" />
            توصيل السيارة لموقعي
          </div>
          <div className="mt-1 text-xs text-ink/55">
            خدمة اختيارية بـ {formatSAR(DELIVERY_FEE)} داخل المدينة، تُضاف للإجمالي.
          </div>
        </div>
      </label>
    </div>
  );
}

function Step2({
  form,
  update,
  errors,
}: {
  form: BookingDraft;
  update: <K extends keyof BookingDraft>(k: K, v: BookingDraft[K]) => void;
  errors: Partial<Record<keyof BookingDraft, string>>;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-midnight">بياناتك للتواصل</h2>
      <p className="-mt-3 text-xs text-ink/55">
        نستخدم هذه البيانات للتواصل وتأكيد موعد الاستلام فقط.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={UserRound} label="الاسم الكامل" error={errors.fullName}>
          <input
            type="text"
            className="input"
            placeholder="مثال: عبدالله الزهراني"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
          />
        </Field>

        <Field icon={Phone} label="رقم الجوال" error={errors.phone}>
          <input
            type="tel"
            className="input"
            placeholder="05XXXXXXXX"
            dir="ltr"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </Field>

        <Field icon={Mail} label="البريد الإلكتروني (اختياري)" error={errors.email}>
          <input
            type="email"
            className="input"
            placeholder="name@example.com"
            dir="ltr"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </Field>
      </div>

      <Field icon={StickyNote} label="ملاحظات (اختياري)">
        <textarea
          rows={3}
          className="input resize-none"
          placeholder="أي تفاصيل تساعدنا في تجهيز السيارة بشكل أفضل..."
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
        />
      </Field>
    </div>
  );
}

function Step3({
  form,
  carName,
  pricePerDay,
  days,
  total,
}: {
  form: BookingDraft;
  carName: string;
  pricePerDay: number;
  days: number;
  total: number;
}) {
  const rows: [string, string][] = [
    ['السيارة', carName],
    ['الاسم', form.fullName],
    ['الجوال', form.phone],
    ...(form.email ? ([['البريد', form.email]] as [string, string][]) : []),
    ['الاستلام', `${form.pickupCity} · ${formatDateAr(form.pickupDate)}`],
    ['التسليم', `${form.dropoffCity} · ${formatDateAr(form.dropoffDate)}`],
    ['التوصيل', form.delivery ? 'مفعّل' : 'غير مفعّل'],
    ['عدد الأيام', `${days}`],
    ['السعر اليومي', formatSAR(pricePerDay)],
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-midnight">مراجعة الطلب</h2>
      <p className="-mt-3 text-xs text-ink/55">
        تأكد من البيانات قبل الضغط على تأكيد الطلب.
      </p>

      <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-canvas/40">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <dt className="text-ink/55">{k}</dt>
            <dd className="text-left font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      {form.notes && (
        <div className="rounded-2xl border border-line bg-white p-4">
          <div className="text-xs text-ink/55">ملاحظات</div>
          <p className="mt-1 text-sm leading-7 text-ink/80">{form.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between rounded-2xl bg-midnight px-5 py-4 text-canvas">
        <span className="text-sm">الإجمالي التقريبي</span>
        <span className="text-xl font-bold text-gold">{formatSAR(total)}</span>
      </div>
    </div>
  );
}

function ConfirmationView({
  record,
  carName,
  copied,
  onCopy,
}: {
  record: BookingRecord;
  carName: string;
  copied: boolean;
  onCopy: () => void;
}) {
  const wa = whatsappLink(
    `مرحبًا، تم إنشاء طلب جديد برقم ${record.orderId} على ${carName}.`
  );

  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <div className="card overflow-hidden p-8 text-center sm:p-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-midnight sm:text-3xl">
            تم استلام طلبك بنجاح
          </h1>
          <p className="mt-2 text-sm leading-7 text-ink/65">
            سيتواصل معك فريق الدعم خلال دقائق لتأكيد موعد الاستلام. يمكنك إلغاء
            الطلب مجانًا خلال 30 دقيقة.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-line bg-canvas/60 px-5 py-3">
            <span className="text-xs text-ink/55">رقم الطلب</span>
            <span className="font-mono text-base font-bold tracking-wider text-midnight">
              {record.orderId}
            </span>
            <button
              onClick={onCopy}
              aria-label="نسخ"
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white text-ink/60 hover:text-midnight"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          <dl className="mt-8 grid gap-3 text-right sm:grid-cols-2">
            <Info label="السيارة" value={carName} />
            <Info label="المبلغ التقريبي" value={formatSAR(record.totalPrice)} />
            <Info
              label="الاستلام"
              value={`${record.pickupCity} · ${formatDateAr(record.pickupDate)}`}
            />
            <Info
              label="التسليم"
              value={`${record.dropoffCity} · ${formatDateAr(record.dropoffDate)}`}
            />
          </dl>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-whats">
              <WhatsAppIcon className="h-4 w-4" />
              <span>متابعة عبر واتساب</span>
            </a>
            <Link to="/cars" className="btn-primary">
              <span>تصفّح سيارات أخرى</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-canvas/40 px-4 py-3">
      <div className="text-[11px] text-ink/55">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-midnight">{value}</div>
    </div>
  );
}
