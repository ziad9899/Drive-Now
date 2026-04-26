import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { to: string; label: string };
}

export function SectionHeader({ eyebrow, title, description, link }: Props) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h2 className="section-title mt-2">{title}</h2>
        {description && (
          <p className="mt-2 text-sm leading-7 text-ink/65">{description}</p>
        )}
      </div>
      {link && (
        <Link
          to={link.to}
          className="inline-flex items-center gap-1 text-sm font-medium text-midnight hover:text-gold"
        >
          {link.label}
          <ArrowLeft className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
