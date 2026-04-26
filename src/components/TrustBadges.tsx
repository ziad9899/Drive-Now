import { ShieldCheck, Wrench, Clock4 } from 'lucide-react';

export function TrustBadges({
  size = 'md',
  layout = 'row',
}: {
  size?: 'sm' | 'md';
  layout?: 'row' | 'grid';
}) {
  const items = [
    { icon: ShieldCheck, label: 'تأمين أساسي شامل' },
    { icon: Wrench, label: 'فحص دوري قبل التسليم' },
    { icon: Clock4, label: 'إلغاء مجاني خلال 30 دقيقة' },
  ];

  const wrapper =
    layout === 'grid'
      ? 'grid grid-cols-1 gap-3 sm:grid-cols-3'
      : 'flex flex-wrap gap-2';

  return (
    <div className={wrapper}>
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3 ${
            size === 'sm' ? 'py-1.5 text-xs' : 'py-2.5 text-sm'
          }`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold/10 text-gold">
            <Icon className="h-4 w-4" />
          </span>
          <span className="font-medium text-ink">{label}</span>
        </div>
      ))}
    </div>
  );
}
