import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserRound,
  Phone,
  Mail,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../store/auth';
import { TrustBadges } from '../components/TrustBadges';

// Local Demo Auth only — no real server, no real session.
export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [form, setForm] = useState({ fullName: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<string, string>> = {};
    if (form.fullName.trim().length < 3) next.fullName = 'الاسم قصير جدًا';
    if (!/^[0-9+\s-]{9,}$/.test(form.phone.trim()))
      next.phone = 'رقم جوال غير صالح';
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = 'البريد الإلكتروني غير صالح';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    signIn({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      createdAt: new Date().toISOString(),
    });
    setSubmitting(false);
    navigate('/');
  };

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mx-auto max-w-xl">
            <span className="section-eyebrow">انضم إلينا</span>
            <h1 className="section-title mt-2">سجّل حسابك في دقيقة واحدة</h1>
            <p className="mt-2 text-sm leading-7 text-ink/65">
              التسجيل يساعدنا على تجهيز تجربة أسرع لك في الحجوزات القادمة. لن
              نشاركها مع أي طرف آخر.
            </p>

            <form onSubmit={onSubmit} className="card mt-8 space-y-5 p-6">
              <div>
                <label className="label">
                  <UserRound className="ml-1 inline h-3.5 w-3.5 text-gold" />
                  الاسم الكامل
                </label>
                <input
                  className="input"
                  placeholder="مثال: ريان العبدالله"
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
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-[12px] font-medium text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <Mail className="ml-1 inline h-3.5 w-3.5 text-gold" />
                  البريد الإلكتروني
                </label>
                <input
                  className="input"
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="mt-1.5 text-[12px] font-medium text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3.5 text-base"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>جاري إنشاء الحساب...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>إنشاء الحساب</span>
                  </>
                )}
              </button>

              <p className="text-center text-[12px] text-ink/55">
                بإنشاء الحساب أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بنا.
              </p>
            </form>

            <div className="mt-6 text-center text-sm text-ink/65">
              تريد التصفّح بدون تسجيل؟{' '}
              <Link to="/cars" className="font-semibold text-midnight hover:text-gold">
                اذهب للأسطول
                <ArrowLeft className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-20 space-y-5">
            <div className="card overflow-hidden">
              <div
                className="aspect-[16/10] bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80)',
                }}
              />
              <div className="space-y-3 p-5">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-midnight">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  بياناتك بأمان
                </div>
                <p className="text-sm leading-7 text-ink/65">
                  نستخدم بيانات الحساب فقط لتسهيل تجربتك التالية. يمكنك تسجيل
                  الخروج في أي وقت.
                </p>
              </div>
            </div>
            <TrustBadges layout="grid" size="sm" />
          </div>
        </aside>
      </div>
    </section>
  );
}
