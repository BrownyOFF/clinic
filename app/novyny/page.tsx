"use client";

import { motion, Variants } from "framer-motion";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header"; 
import Footer from "@/app/components/Footer"; 
import { newsData } from "@/app/data/news"; // ТУТ: Імпортуємо нашу базу новин

export default function NewsPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">
      
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>

      <Header />

      <main className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Newspaper size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Останні <span className="text-blue-600 dark:text-blue-400">новини</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Події нашого центру, корисні статті для батьків та оновлення у сфері дитячої реабілітації.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ТУТ: Використовуємо newsData замість зашитих у сторінку даних */}
            {newsData.map((news, idx) => (
              <motion.article key={idx} variants={fadeUp} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300 flex flex-col group">
                <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image src={news.image} alt={news.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-lg">
                    <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
                    {news.date}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/novyny/${news.slug}`}>{news.title}</Link>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">{news.excerpt}</p>
                  
                  <Link href={`/novyny/${news.slug}`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-800 dark:hover:text-blue-300 transition-colors mt-auto group/btn">
                    Читати повністю <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}