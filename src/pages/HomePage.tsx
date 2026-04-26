import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Wrench,
  Clock4,
  Sparkles,
  CheckCircle2,
  Star,
  ArrowLeft,
  Phone,
  Wallet,
  CarFront,
  KeyRound,
  Headphones,
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { CarCard } from '../components/CarCard';
import { SectionHeader } from '../components/SectionHeader';
import { TrustBadges } from '../components/TrustBadges';
import { CARS } from '../data/cars';
import { TESTIMONIALS } from '../data/testimonials';
import { formatNumber } from '../lib/format';

export function HomePage() {
  const featured = CARS.filter((c) => c.featured).slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedCars cars={featured} />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight text-canvas">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-midnight/70 to-midnight" />

      <div className="container-page relative pt-14 pb-10 sm:pt-20 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <span className="badge-gold mb-4">
            <Sparkles className="h-3 w-3" />
            تأجير سيارات بأسعار واضحة
          </span>
          <h1 className="text-3xl font-bold leading-snug text-canvas sm:text-5xl sm:leading-[1.15]">
            استأجر سيارتك المناسبة <br className="hidden sm:block" />
            <span className="text-gold">خلال دقائق</span>.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-canvas/75 sm:text-lg">
            اختر من سيارات يومية وفاخرة مع أسعار واضحة وتجربة حجز سهلة بدون
            تعقيد. كل ما يهمك يظهر أمامك مباشرة دون رسوم مخفية.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-canvas/70">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-gold" /> تأكيد فوري
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-gold" /> توصيل اختياري
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-gold" /> إلغاء مجاني خلال 30 دقيقة
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 sm:mt-12"
        >
          <SearchBar />
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="سيارة في الأسطول" value="+120" />
          <Stat label="مدن نخدمها" value="6" />
          <Stat label="رضا العملاء" value="98%" />
          <Stat label="دعم على مدار" value="24/7" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-canvas/10 bg-canvas/5 p-4 backdrop-blur">
      <div className="text-xl font-bold text-gold sm:text-2xl">{value}</div>
      <div className="mt-1 text-[12px] text-canvas/65">{label}</div>
    </div>
  );
}

function FeaturedCars({ cars }: { cars: typeof CARS }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="الأكثر طلبًا"
          title="سيارات مميزة هذا الأسبوع"
          description="مجموعة مختارة من سياراتنا الأعلى تقييمًا في الرياض وجدة، جاهزة للحجز الفوري بأسعار واضحة."
          link={{ to: '/cars', label: 'عرض الكل' }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      icon: Wallet,
      title: 'أسعار واضحة بدون مفاجآت',
      text: 'السعر الذي تراه في الصفحة هو السعر الذي تدفعه. ملخص شفّاف يظهر قبل التأكيد.',
    },
    {
      icon: ShieldCheck,
      title: 'تأمين أساسي شامل',
      text: 'كل حجز يشمل تأمينًا أساسيًا، مع خيار الترقية إذا احتجت تغطية أوسع.',
    },
    {
      icon: Wrench,
      title: 'فحص دوري قبل التسليم',
      text: 'نتأكد من جاهزية السيارة قبل كل تسليم، حتى تستلمها بحالة ممتازة.',
    },
    {
      icon: Clock4,
      title: 'إلغاء مجاني خلال 30 دقيقة',
      text: 'بعد إنشاء الطلب لديك نصف ساعة كاملة لإلغائه أو تعديله بدون أي رسوم.',
    },
  ];

  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="لماذا تختارنا"
          title="تجربة حجز نظيفة وواضحة"
          description="بُني هذا النموذج لمعالجة أكبر مشاكل مواقع التأجير: الرسوم المخفية، تعقيد الحجز، وضعف الثقة."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-midnight text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-midnight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-ink/65">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: CarFront,
      title: 'اختر سيارتك',
      text: 'تصفّح الأسطول وفلتر حسب المدينة والفئة والسعر اليومي حتى تجد ما يناسبك.',
    },
    {
      icon: KeyRound,
      title: 'أدخل بياناتك',
      text: 'املأ نموذج حجز قصير من ثلاث خطوات فقط، مع حقول استلام وتسليم واضحة.',
    },
    {
      icon: Headphones,
      title: 'تأكيد فوري',
      text: 'سيصلك رقم طلب فوري، وفريق الدعم متاح للمساعدة على مدار الساعة.',
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="خطوات الحجز"
          title="ثلاث خطوات فقط لاستلام سيارتك"
          description="بدون حسابات إلزامية، بدون نماذج طويلة. تصفّح، اختر، أكّد."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="card relative p-5">
              <span className="absolute left-5 top-5 text-5xl font-bold text-line">
                0{i + 1}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-midnight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-ink/65">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <TrustBadges layout="grid" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="آراء العملاء"
          title="عملاء جربوا التجربة وعادوا"
          description="مئات العملاء يثقون بنا كل شهر. هذه عيّنة من تجاربهم الفعلية."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="card flex flex-col p-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating
                        ? 'fill-gold text-gold'
                        : 'text-line'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-7 text-ink/80">
                «{t.text}»
              </p>
              <div className="mt-4 border-t border-line pt-3">
                <div className="text-sm font-semibold text-midnight">
                  {t.name}
                </div>
                <div className="mt-0.5 text-[12px] text-ink/55">
                  {t.city} · {t.car}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink/50">
          متوسط التقييم {formatNumber(4.7)} من 5 — بناءً على آراء عملاء النموذج.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-midnight p-8 text-canvas sm:p-12">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(800px 300px at 90% -10%, #C89B3C 0%, transparent 60%), radial-gradient(600px 200px at 10% 110%, #1E3A8A 0%, transparent 60%)',
            }}
            aria-hidden
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold sm:text-3xl">
                جاهز تستلم سيارتك اليوم؟
              </h3>
              <p className="mt-2 text-sm leading-7 text-canvas/70">
                ابدأ بالتصفّح أو تواصل مباشرة مع فريق المبيعات للحصول على
                عرض خاص يناسب رحلتك.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/cars" className="btn-gold">
                <span>تصفّح الأسطول</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-canvas/20 px-5 py-3 text-sm font-medium text-canvas transition hover:bg-canvas/5"
              >
                <Phone className="h-4 w-4" />
                <span>تواصل معنا</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
