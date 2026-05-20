"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Copy, Check, Gift, Users, CreditCard, Send, ArrowRight, Loader2 } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface BankDetailRow {
  label: string;
  value: string;
  field: string;
}

const bankDetails: BankDetailRow[] = [
  { label: "Отримувач", value: "КНП 'Дитячий клінічний центр Вітрила Життя'", field: "recipient" },
  { label: "Код ЄДРПОУ", value: "12345678", field: "edrpou" },
  { label: "Банк отримувача", value: "АТ КБ 'ПриватБанк'", field: "bank" },
  { label: "IBAN рахунку", value: "UA893052990000026001234567890", field: "iban" },
  { label: "Призначення платежу", value: "Благодійний внесок на статутну діяльність центру", field: "purpose" },
];

const materialNeeds = [
  {
    category: "Засоби догляду та гігієни",
    items: [
      { name: "Підгузки дитячі (розміри 4, 5, 6)", status: "critical" },
      { name: "Вологі серветки гіпоалергенні", status: "always" },
      { name: "Одноразові пелюшки (60х90 см)", status: "critical" },
      { name: "Рідке мило та дитячі шампуні", status: "always" },
    ],
  },
  {
    category: "Реабілітаційні матеріали та іграшки",
    items: [
      { name: "Сенсорні м'ячі та балансири", status: "critical" },
      { name: "Розвиваючі дерев'яні іграшки (пазли, бізіборди)", status: "always" },
      { name: "Обважнювачі та жилети для сенсорної інтеграції", status: "normal" },
      { name: "Кінетичний пісок та пластилін", status: "always" },
    ],
  },
  {
    category: "Витратні реабілітаційні матеріали",
    items: [
      { name: "Одноразові простирадла в рулонах для кушеток", status: "critical" },
      { name: "Масажні дитячі олії та гіпоалергенні креми", status: "always" },
      { name: "Перев'язувальні матеріали та еластичні пластирі", status: "always" },
      { name: "Безпечні антисептики для іграшок та поверхонь", status: "always" },
    ],
  },
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<"financial" | "material" | "volunteer">("financial");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Форма волонтера
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    phone: "",
    email: "",
    direction: "children",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Тип_форми: "Заявка волонтера",
          Ім_я: volunteerForm.name,
          Телефон: volunteerForm.phone,
          Email: volunteerForm.email,
          Напрямок: volunteerForm.direction,
          Повідомлення: volunteerForm.message,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("Сталася помилка при відправці. Спробуйте ще раз.");
      }
    } catch (error) {
      alert("Помилка з'єднання. Перевірте підключення до інтернету.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative z-10">
        
        {/* Шапка сторінки */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-650 dark:text-red-455 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
            <Heart size={14} className="fill-current" /> Допомогти Центру
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-none">
            Ваша підтримка рятує життя
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Кожна гривня, кожна пачка серветок чи година вашого часу як волонтера наближають одужання дітей та полегшують стан маленьких паліативних пацієнтів.
          </p>
        </div>

        {/* Перемикач табів */}
        <div className="flex justify-center p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl mx-auto mb-12 shadow-inner">
          <button
            onClick={() => setActiveTab("financial")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeTab === "financial"
                ? "bg-white dark:bg-slate-800 text-blue-650 dark:text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <CreditCard size={16} /> Фінансова підтримка
          </button>
          <button
            onClick={() => setActiveTab("material")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeTab === "material"
                ? "bg-white dark:bg-slate-800 text-blue-650 dark:text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <Gift size={16} /> Матеріальні потреби
          </button>
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeTab === "volunteer"
                ? "bg-white dark:bg-slate-800 text-blue-650 dark:text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <Users size={16} /> Стати волонтером
          </button>
        </div>

        {/* Контент табів */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl transition-colors duration-500">
          <AnimatePresence mode="wait">
            
            {activeTab === "financial" && (
              <motion.div
                key="financial"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                    <CreditCard className="text-blue-600 dark:text-blue-400" />
                    Благодійний рахунок центру
                  </h2>
                  <p className="text-sm font-medium text-slate-550 dark:text-slate-400 mt-2">
                    Ви можете зробити благодійний переказ у будь-якому банківському додатку чи касі банку. Нижче наведено офіційні реквізити установи.
                  </p>
                </div>

                <div className="space-y-4 max-w-3xl">
                  {bankDetails.map((detail) => (
                    <div
                      key={detail.field}
                      className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-slate-200 dark:hover:border-slate-700 transition"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                          {detail.label}
                        </span>
                        <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-white leading-relaxed">
                          {detail.value}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(detail.value, detail.field)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 self-start sm:self-auto ${
                          copiedField === detail.field
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50"
                            : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {copiedField === detail.field ? (
                          <>
                            <Check size={14} /> Скопійовано!
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Копіювати
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "material" && (
              <motion.div
                key="material"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                    <Gift className="text-blue-600 dark:text-blue-400" />
                    Актуальні матеріальні потреби
                  </h2>
                  <p className="text-sm font-medium text-slate-550 dark:text-slate-400 mt-2">
                    Якщо ви бажаєте придбати та привезти або надіслати речі особисто — нижче наведено перелік того, чого наш центр потребує найбільше.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {materialNeeds.map((category, catIdx) => (
                    <div
                      key={catIdx}
                      className="p-6 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 text-lg">
                          {category.category}
                        </h3>
                        <ul className="mt-4 space-y-4">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2.5">
                              <span
                                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                  item.status === "critical"
                                    ? "bg-red-500"
                                    : item.status === "always"
                                    ? "bg-blue-500"
                                    : "bg-slate-400"
                                }`}
                              />
                              <div className="space-y-0.5">
                                <p className="text-sm font-semibold text-slate-850 dark:text-slate-300 leading-tight">
                                  {item.name}
                                </p>
                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                  {item.status === "critical" && (
                                    <span className="text-red-500 dark:text-red-400">Вкрай необхідно</span>
                                  )}
                                  {item.status === "always" && (
                                    <span className="text-blue-500 dark:text-blue-400">Потрібно завжди</span>
                                  )}
                                  {item.status === "normal" && (
                                    <span className="text-slate-400 dark:text-slate-500">За потреби</span>
                                  )}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-350">
                  Перед покупкою або відправкою великих партій рекомендуємо зателефонувати до адміністрації за номером <strong className="text-blue-600 dark:text-blue-400">+38 (067) 123-45-67</strong> для узгодження логістики.
                </div>
              </motion.div>
            )}

            {activeTab === "volunteer" && (
              <motion.div
                key="volunteer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                    <Users className="text-blue-600 dark:text-blue-400" />
                    Долучайтеся як волонтер
                  </h2>
                  <p className="text-sm font-medium text-slate-550 dark:text-slate-400 mt-2">
                    Ми раді будь-якій допомозі: проведенню творчих занять для дітей, допомозі в організації заходів, благоустрої території чи професійній підтримці.
                  </p>
                </div>

                {!formSubmitted ? (
                  <form onSubmit={handleVolunteerSubmit} className="space-y-5 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-450 uppercase tracking-wide">Ваше ім'я</label>
                        <input
                          type="text"
                          required
                          value={volunteerForm.name}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 text-slate-950 dark:text-white text-sm focus:border-blue-500 focus:outline-none transition"
                          placeholder="Іван Петренко"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-450 uppercase tracking-wide">Номер телефону</label>
                        <input
                          type="tel"
                          required
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 text-slate-950 dark:text-white text-sm focus:border-blue-500 focus:outline-none transition"
                          placeholder="+380..."
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-450 uppercase tracking-wide">Email адреса</label>
                      <input
                        type="email"
                        required
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 text-slate-950 dark:text-white text-sm focus:border-blue-500 focus:outline-none transition"
                        placeholder="example@mail.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-450 uppercase tracking-wide">Напрямок волонтерства</label>
                      <select
                        value={volunteerForm.direction}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, direction: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 text-slate-950 dark:text-white text-sm focus:border-blue-500 focus:outline-none transition"
                      >
                        <option value="children">Заняття та дозвілля з дітьми</option>
                        <option value="events">Організація благодійних заходів</option>
                        <option value="repair">Благоустрій та дрібний ремонт</option>
                        <option value="professional">Професійна допомога (IT, дизайн, юридична)</option>
                        <option value="other">Інше (опишіть детальніше нижче)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-450 uppercase tracking-wide">Як саме ви хочете допомогти?</label>
                      <textarea
                        rows={4}
                        value={volunteerForm.message}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 text-slate-950 dark:text-white text-sm focus:border-blue-500 focus:outline-none transition resize-none"
                        placeholder="Напишіть кілька слів про свій досвід або ідеї..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                      {isSubmitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      Надіслати заявку волонтера
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 text-center max-w-xl mx-auto space-y-4"
                  >
                    <Check size={48} className="mx-auto" />
                    <div>
                      <h3 className="text-xl font-bold">Заявку прийнято!</h3>
                      <p className="text-sm font-medium mt-2 opacity-95">
                        Дякуємо за ваше велике серце. Наш координатор волонтерів зв'яжеться з вами найближчим часом.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setVolunteerForm({ name: "", phone: "", email: "", direction: "children", message: "" });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-450 transition"
                    >
                      Заповнити ще раз <ArrowRight size={12} />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      <Footer />
    </div>
  );
}
