import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="container-page py-24 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="section-title mt-5">الصفحة غير موجودة</h1>
      <p className="mt-2 text-sm leading-7 text-ink/65">
        الرابط الذي وصلت إليه ربما تم نقله أو حذفه. لنعيدك للمسار الصحيح.
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        <span>العودة للرئيسية</span>
        <ArrowLeft className="h-4 w-4" />
      </Link>
    </section>
  );
}
