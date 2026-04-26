import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

interface Props {
  tone?: 'dark' | 'light';
  withTagline?: boolean;
}

export function Logo({ tone = 'dark', withTagline = false }: Props) {
  const main = tone === 'dark' ? 'text-midnight' : 'text-canvas';
  const subtle = tone === 'dark' ? 'text-ink/55' : 'text-canvas/60';

  return (
    <Link to="/" aria-label="درايف الآن" className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-midnight">
        <Car className="h-4 w-4 text-gold" strokeWidth={2.25} />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={`text-base ${main}`}>
          <span className="font-normal">درايف</span>
          <span className="font-extrabold text-gold"> الآن</span>
        </span>
        {withTagline && (
          <span className={`mt-1.5 text-[11px] leading-snug ${subtle}`}>
            استأجر سيارتك بسهولة خلال دقائق
          </span>
        )}
      </span>
    </Link>
  );
}
