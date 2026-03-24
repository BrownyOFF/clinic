"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Header from "@/app/components/Header"; // Перевірте свій шлях
import Footer from "@/app/components/Footer"; // Перевірте свій шлях

// Категорії для фільтрації
const categories = ["Всі", "Керівництво", "Лікарі", "Фахівці з реабілітації", "Психологи та Логопеди"];

// Масив співробітників (підставте реальні імена та назви файлів)
const teamMembers = [
  {
    id: 1,
    name: "Тетяна Шевченко",
    role: "В.о. директора, дитячий психіатр, дитячий невролог",
    category: "Керівництво",
    image: "/images/shevckenko.jpg", // Фото керівника
  },
  {
    id: 2,
    name: "Ім'я Прізвище 1",
    role: "Лікар фізичної та реабілітаційної медицини (ФРМ)",
    category: "Лікарі",
    image: "/images/image_0f9825.jpg", // Фото зі скану
  },
  {
    id: 3,
    name: "Ім'я Прізвище 2",
    role: "Ерготерапевт",
    category: "Фахівці з реабілітації",
    image: "/images/image_0f9844.jpg", // Фото зі скану
  },
  {
    id: 4,
    name: "Ім'я Прізвище 3",
    role: "Фізичний терапевт",
    category: "Фахівці з реабілітації",
    image: "/images/image_0f9864.jpg", // Фото зі скану
  },
  {
    id: 5,
    name: "Ім'я Прізвище 4",
    role: "Лікар-педіатр",
    category: "Лікарі",
    image: "/images/logo.jpg", // Заглушка
  },
  {
    id: 6,
    name: "Ім'я Прізвище 5",
    role: "Логопед-дефектолог",
    category: "Психологи та Логопеди",
    image: "/images/logo.jpg", // Заглушка
  },
];

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState("Всі");

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Фільтруємо команду залежно від обраної категорії
  const filteredTeam = teamMembers.filter(member => 
    activeCategory === "Всі" || member.category === activeCategory
  );

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">
      
      {/* АБСТРАКТНИЙ ФОН */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>

      <Header />

      <main className="py-16 md:py-24 relative z-10">
        
        {/* ШАПКА СТОРІНКИ */}
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Наша <span className="text-blue-600 dark:text-blue-400">команда</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Мультидисциплінарна команда спеціалістів, які щодня працюють заради здоров'я, розвитку та посмішок наших пацієнтів.
            </p>
          </motion.div>
        </div>

        {/* ФІЛЬТРИ */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* СІТКА СПІВРОБІТНИКІВ */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredTeam.map((member) => (
                <motion.div
                  layout
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow group"
                >
                  {/* ФОТО */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  
                  {/* ІНФОРМАЦІЯ */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">{member.category}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredTeam.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              Спеціалістів у цій категорії не знайдено.
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}