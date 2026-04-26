import { Info } from 'lucide-react';
import { formatSAR } from '../lib/format';

interface Props {
  pricePerDay: number;
  days: number;
  delivery: boolean;
  deliveryFee?: number;
  compact?: boolean;
}

export function PriceSummary({
  pricePerDay,
  days,
  delivery,
  deliveryFee = 50,
  compact = false,
}: Props) {
  const safeDays = Math.max(days, 0);
  const subtotal = pricePerDay * safeDays;
  const fee = delivery ? deliveryFee : 0;
  const total = subtotal + fee;

  return (
    <div
      className={`card ${compact ? 'p-4' : 'p-5'} bg-gradient-to-b from-white to-canvas/40`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-midnight">ملخص السعر</h3>
        <span className="badge-gold">شفّاف</span>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <Row label="السعر اليومي" value={formatSAR(pricePerDay)} />
        <Row
          label={`عدد الأيام${safeDays ? ` (${safeDays})` : ''}`}
          value={safeDays ? `× ${safeDays}` : '—'}
          muted
        />
        <Row
          label="رسوم توصيل اختيارية"
          value={delivery ? formatSAR(fee) : 'غير مفعّلة'}
          muted={!delivery}
        />
        <div className="my-2 h-px bg-line" />
        <Row
          label="الإجمالي التقريبي"
          value={total > 0 ? formatSAR(total) : '—'}
          strong
        />
      </dl>

      <p className="mt-4 inline-flex items-start gap-2 rounded-xl border border-line bg-canvas/60 p-3 text-[12px] leading-6 text-ink/70">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span>
          بدون رسوم مخفية في هذا النموذج. السعر النهائي يظهر قبل تأكيد الطلب.
        </span>
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={`${muted ? 'text-ink/50' : 'text-ink/70'}`}>{label}</dt>
      <dd
        className={
          strong
            ? 'text-base font-bold text-midnight'
            : muted
              ? 'text-ink/60'
              : 'font-medium text-ink'
        }
      >
        {value}
      </dd>
    </div>
  );
}
