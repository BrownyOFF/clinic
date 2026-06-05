"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, HelpCircle, Activity, FileText, Heart } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface FAQItem {
  id: string;
  category: "rehab" | "palliative" | "docs" | "general";
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "free-services",
    category: "general",
    question: "Чи безкоштовні послуги у вашому центрі?",
    answer: "Так, усі послуги з медичної реабілітації та паліативної допомоги є абсолютно безкоштовними для дітей. Вони фінансуються Національною службою здоров'я України (НСЗУ) за відповідними пакетами медичних гарантій, за умови наявності електронного направлення.",
  },
  {
    id: "get-referral",
    category: "docs",
    question: "Як отримати електронне направлення до центру?",
    answer: "Електронне направлення може виписати педіатр дитини, сімейний лікар або лікуючий вузький спеціаліст (невролог, травматолог, хірург тощо) після огляду. Направлення має бути створене в системі eHealth на консультацію до лікаря ФРМ (фізичної та реабілітаційної медицини) або на відповідний реабілітаційний чи паліативний пакет.",
  },
  {
    id: "prm-doctor",
    category: "rehab",
    question: "Хто такий лікар ФРМ і яка його роль?",
    answer: "Лікар фізичної та реабілітаційної медицини (ФРМ) — це провідний спеціаліст, який очолює мультидисциплінарну реабілітаційну команду. Він проводить первинний огляд дитини, визначає реабілітаційний потенціал, призначає конкретні заняття та процедури, координує роботу фізичних терапевтів, ерготерапевтів та оцінює динаміку відновлення.",
  },
  {
    id: "palliative-definition",
    category: "palliative",
    question: "Що передбачає паліативна допомога і кому вона надається?",
    answer: "Паліативна допомога спрямована на покращення якості життя дітей із важкими невиліковними захворюваннями та всебічну підтримку їхніх родин. Вона включає адекватне знеболення, полегшення інших симптомів, медичний догляд, психологічну та духовну підтримку.",
  },
  {
    id: "hospitalization-docs",
    category: "docs",
    question: "Які документи необхідно мати для оформлення дитини до центру?",
    answer: "Для оформлення дитини до стаціонарного або амбулаторного відділення необхідно мати: 1) Свідоцтво про народження дитини та паспорт одного з батьків (або законних опікунів); 2) Активне електронне направлення; 3) Детальну виписку з медичної карти (форма 027/о) з результатами останніх аналізів та висновками спеціалістів.",
  },
  {
    id: "rehab-duration",
    category: "rehab",
    question: "Скільки триває курс реабілітації?",
    answer: "Стандартний курс реабілітації за пакетом НСЗУ в стаціонарі триває від 14 до 21 календарного дня залежно від діагнозу (неврологічні порушення, стани після травм чи операцій). Амбулаторна реабілітація також триває близько 2 тижнів і може коригуватися лікарем ФРМ відповідно до стану дитини.",
  },
  {
    id: "mobile-palliative",
    category: "palliative",
    question: "Чи надає центр паліативну допомогу вдома?",
    answer: "Так, у нашому центрі працює мобільна паліативна служба. Мультидисциплінарна команда (лікар, медсестра, психолог) здійснює регулярні виїзди до дитини додому для проведення оглядів, коригування симптоматичної терапії, надання рекомендацій родичам щодо догляду та психологічної підтримки.",
  },
];

const categories = [
  { id: "all", label: "Усі питання", icon: HelpCircle },
  { id: "rehab", label: "Реабілітація", icon: Activity },
  { id: "palliative", label: "Паліативна опіка", icon: Heart },
  { id: "docs", label: "Документи та запис", icon: FileText },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFAQ = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative z-10">
        
        {/* Банер заголовку */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
            Інформаційний центр
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mt-4 tracking-tight leading-none">
            Часті запитання (FAQ)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base md:text-lg max-w-xl mx-auto font-medium">
            Знайдіть швидкі відповіді на питання щодо оформлення дитини до центру, безкоштовних послуг за пакетами НСЗУ та особливостей реабілітації.
          </p>
        </div>

        {/* Рядок пошуку */}
        <div className="relative max-w-xl mx-auto mb-10 shadow-lg rounded-2xl overflow-hidden">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Шукати питання за ключовими словами..."
            className="w-full pl-12 pr-4 py-4.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base transition"
          />
        </div>

        {/* Категорії */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenId(null);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold transition shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-slate-105 dark:bg-slate-900 text-slate-650 dark:text-slate-350 border border-slate-150 dark:border-slate-800"
                }`}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Список FAQ */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQ.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredFAQ.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/85 dark:border-slate-800/85 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleAccordion(item.id)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none group cursor-pointer"
                      >
                        <span className="font-bold text-slate-900 dark:text-white text-base md:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-5 pt-1 text-sm md:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-medium border-t border-dashed border-slate-100 dark:border-slate-800">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-150 dark:border-slate-800"
              >
                <p className="text-slate-500 dark:text-slate-400 font-medium">Нічого не знайдено за вашим запитом. Спробуйте змінити слова для пошуку.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      <Footer />
    </div>
  );
}
