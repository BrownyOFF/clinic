import { Building } from "lucide-react";

export default function Location() {
  return (
    <section className="py-24 bg-transparent transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-3xl flex items-center justify-center mb-8 border border-blue-200 dark:border-blue-800 shadow-inner transition-colors">
                    <Building size={32} />
                </div>
                {/* ТУТ: dark:text-white */}
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">Ми знаходимося в Житомирі</h2>
                
                {/* ТУТ: dark:text-slate-300 */}
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4 transition-colors">
                  Наш центр — це не просто медичний заклад, це затишний простір, адаптований під потреби дітей. Ви можете легко знайти нас на карті та прокласти маршрут.
                </p>
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 transition-colors">м. Житомир, вул. Корабельна, 8</p>
            </div>
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 group transition-colors">
                <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-sm font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-slate-900 dark:text-white">
                  Натисніть "Більше", щоб відкрити додаток
                </div>
                <iframe 
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%D0%BC.%20%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80,%20%D0%B2%D1%83%D0%BB.%20%D0%9A%D0%BE%D1%80%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0,%208+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0"
                ></iframe>
            </div>
        </div>
    </section>
  );
}