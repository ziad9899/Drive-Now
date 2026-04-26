import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2,
  UserRound,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { useBookings } from '../store/bookings';
import { whatsappLink, WHATSAPP_NUMBER } from '../lib/whatsapp';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export function ContactPage() {
  const { addContact } = useBookings();
  const [form, setForm] = useState({ fullName: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<string, string>> = {};
    if (form.fullName.trim().length < 3) next.fullName = 'الاسم قصير جدًا';
    if (!/^[0-9+\s-]{9,}$/.test(form.phone.trim()))
      next.phone = 'رقم جوال غير صالح';
    if (form.message.trim().length < 10) next.message = 'اكتب رسالة أوضح';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    addContact({
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setDone(true);
    setForm({ fullName: '', phone: '', message: '' });
  };

  const wa = whatsappLink('مرحبًا، أرغب في الاستفسار عن خدماتكم.');

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="section-eyebrow">نحن هنا للمساعدة</span>
          <h1 className="section-title mt-2">تواصل مع فريقنا</h1>
          <p className="mt-2 text-sm leading-7 text-ink/65">
            اختر الطريقة الأنسب لك. نرد على الواتساب خلال دقائق، وعلى البريد
            خلال ساعة عمل.
          </p>

          <div className="mt-8 space-y-3">
            <ContactRow
              icon={Phone}
              title="الهاتف المباشر"
              value="+966 50 000 0000"
              ltr
            />
            <ContactRow
              icon={Mail}
              title="البريد الإلكتروني"
              value="hello@ofqtech.com"
              ltr
            />
            <ContactRow
              icon={MapPin}
              title="المقر الرئيسي"
              value="الرياض، المملكة العربية السعودية"
            />
            <ContactRow
              icon={Clock}
              title="ساعات العمل"
              value="السبت — الخميس · 9 صباحًا إلى 11 مساءً"
            />
          </div>

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whats mt-6 w-full justify-center py-3"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>محادثة عبر واتساب</span>
            <span dir="ltr" className="text-[11px] opacity-60">
              ({WHATSAPP_NUMBER})
            </span>
          </a>
        </div>

        <div className="lg:col-span-7">
          <div className="card p-6 sm:p-8">
            {done ? (
              <SuccessView onAgain={() => setDone(false)} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <h2 className="text-lg font-semibold text-midnight">
                  أرسل لنا رسالتك
                </h2>
                <p className="-mt-3 text-xs text-ink/55">
                  أخبرنا بطلبك وسنرد عليك في أسرع وقت ممكن.
                </p>

                <div>
                  <label className="label">
                    <UserRound className="ml-1 inline h-3.5 w-3.5 text-gold" />
                    الاسم الكامل
                  </label>
                  <input
                    className="input"
                    placeholder="مثال: محمد الغامدي"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-[12px] font-medium text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">
                    <Phone className="ml-1 inline h-3.5 w-3.5 text-gold" />
                    رقم الجوال
                  </label>
                  <input
                    className="input"
                    type="tel"
                    dir="ltr"
                    placeholder="05XXXXXXXX"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-[12px] font-medium text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">
                    <MessageSquare className="ml-1 inline h-3.5 w-3.5 text-gold" />
                    رسالتك
                  </label>
                  <textarea
                    rows={5}
                    className="input resize-none"
                    placeholder="اكتب استفسارك أو طلبك بالتفصيل..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-[12px] font-medium text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3.5"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <span>إرسال الرسالة</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  title,
  value,
  ltr,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-[12px] text-ink/55">{title}</div>
        <div
          className="text-sm font-medium text-midnight"
          dir={ltr ? 'ltr' : undefined}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function SuccessView({ onAgain }: { onAgain: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold">
        <CheckCircle2 className="h-7 w-7" />
      </span>
      <h2 className="mt-5 text-xl font-bold text-midnight">
        وصلتنا رسالتك بنجاح
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-7 text-ink/65">
        سنتواصل معك في أقرب وقت ممكن. شكرًا لاهتمامك بخدماتنا.
      </p>
      <button onClick={onAgain} className="btn-ghost mt-6">
        إرسال رسالة أخرى
      </button>
    </div>
  );
}
