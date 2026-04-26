# Drive-Now — درايف الآن

موقع تأجير سيارات عربي فاخر، نموذج تسويقي يعمل بالكامل داخل المتصفح بدون باكند.

## الميزات

- واجهة عربية كاملة باتجاه RTL
- بحث وفلاتر متقدمة (مدينة، فئة، سعر يومي، ناقل، مقاعد، التوفر)
- صفحة تفاصيل السيارة مع معرض صور وملخص سعر شفاف
- نموذج حجز من 3 خطوات مع حفظ محلي ورقم طلب فوري
- تسجيل دخول محلي + صفحة تواصل + Footer احترافي
- 12 سيارة سعودية ببيانات واقعية و6 مدن

## التقنيات

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router + Zustand
- lucide-react + framer-motion

## التشغيل المحلي

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # بناء إنتاجي
npm run preview  # معاينة الإنتاج
```

## النشر

يتم النشر تلقائيًا على GitHub Pages عبر [GitHub Actions](.github/workflows/deploy.yml) عند كل push إلى `main`.

## المطوّر

تم تطوير هذا النموذج بواسطة [أفق التقنية](https://ofqtech.com/) — [GitHub](https://github.com/ziad9899)
