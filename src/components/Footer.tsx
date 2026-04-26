import { Link } from 'react-router-dom';
import { Globe, Github, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-midnight text-canvas">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="light" withTagline />
          <p className="mt-5 max-w-sm text-sm leading-7 text-canvas/70">
            نموذج تسويقي يعرض تجربة حجز سيارة سهلة وأسعار واضحة بدون رسوم
            مخفية، مصمم خصيصًا لإبراز جودة منتجات أفق التقنية.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-canvas">روابط سريعة</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
            <li>
              <Link to="/" className="hover:text-gold">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/cars" className="hover:text-gold">
                السيارات
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                تواصل معنا
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gold">
                تسجيل الدخول
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-canvas">للتواصل</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              <span dir="ltr">+966 50 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              <span dir="ltr">hello@ofqtech.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              <span>المملكة العربية السعودية</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-canvas">المطوّر</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
            <li>
              <a
                href="https://ofqtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-gold"
              >
                <Globe className="h-4 w-4" />
                <span>أفق التقنية</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ziad9899"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-gold"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-xs text-canvas/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} درايف الآن — جميع الحقوق محفوظة.</p>
          <p className="inline-flex items-center gap-1.5">
            تم تطوير هذا النموذج بواسطة
            <a
              href="https://ofqtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-gold hover:underline"
            >
              أفق التقنية
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
