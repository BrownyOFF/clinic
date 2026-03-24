"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 md:gap-4 z-50">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-blue-100 dark:border-slate-700 p-0.5 md:p-1 bg-white dark:bg-slate-800 shadow-inner flex-shrink-0">
              <Image src="/images/logo.jpg" alt="Логотип" fill className="object-contain object-center" priority />
          </div>
          <span className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight truncate">Вітрила Життя</span>
        </Link>

        {/* Десктопне меню */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/pro-nas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Про нас</Link>
          
          {/* Випадаюче меню */}
          <div className="relative group py-8">
            <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Для пацієнта <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-[70px] left-0 w-64 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Link href="/dlya-patsiyenta/dokumenty" className="block px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition">Необхідні документи</Link>
              <Link href="/dlya-patsiyenta/reabilitatsiya" className="block px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition">Дитяча реабілітація (Стаття)</Link>
              <Link href="/dlya-patsiyenta/platni-poslugy" className="block px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition">Платні послуги</Link>
            </div>
          </div>

          <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Напрямки</Link>
          <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Команда</Link>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4 z-50">
          <ThemeToggle />
          <button className="hidden md:block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
            Зв'язатися
          </button>
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full max-h-[calc(100vh-80px)] overflow-y-auto bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl md:hidden flex flex-col px-6 py-6 gap-6"
          >
            <nav className="flex flex-col gap-5 text-lg font-medium text-slate-700 dark:text-slate-200">
              <Link href="/pro-nas" onClick={closeMenu}>Про нас</Link>
              
              <div className="border-l-2 border-blue-500 pl-4 py-1 flex flex-col gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-r-xl">
                <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">Для пацієнта</span>
                <Link href="/dlya-patsiyenta/dokumenty" onClick={closeMenu} className="text-base text-slate-600 dark:text-slate-300">Необхідні документи</Link>
                <Link href="/dlya-patsiyenta/reabilitatsiya" onClick={closeMenu} className="text-base text-slate-600 dark:text-slate-300">Дитяча реабілітація</Link>
                <Link href="/dlya-patsiyenta/platni-poslugy" onClick={closeMenu} className="text-base text-slate-600 dark:text-slate-300">Платні послуги</Link>
              </div>

              <Link href="#" onClick={closeMenu}>Напрямки</Link>
              <Link href="#" onClick={closeMenu}>Команда</Link>
            </nav>
            <button className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl text-base font-semibold hover:bg-blue-700 transition">
              Зателефонувати нам
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}