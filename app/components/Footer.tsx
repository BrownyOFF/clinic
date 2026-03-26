import Image from "next/image";
import Link from "next/link";
import { PhoneCall, Mail, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        {/* КОЛОНКА 1: Про центр (займає 4 колонки) */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
               <Image src="/images/logo.jpg" alt="Логотип Вітрила Життя" width={40} height={40} className="rounded-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Вітрила Життя</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
            Комунальне некомерційне підприємство «Центр медичної реабілітації та паліативної допомоги дітям» Житомирської обласної ради.
          </p>
        </div>

        {/* КОЛОНКА 2: Швидкі посилання (займає 2 колонки) */}
        <div className="lg:col-span-2">
          <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Навігація</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/pro-nas" className="flex items-center gap-2 hover:text-blue-400 transition group">
                <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /> Про нас
              </Link>
            </li>
            <li>
              <Link href="/napryamky" className="flex items-center gap-2 hover:text-blue-400 transition group">
                <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /> Напрямки
              </Link>
            </li>
            <li>
              <Link href="/dlya-patsiyenta/platni-poslugy" className="flex items-center gap-2 hover:text-blue-400 transition group">
                <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /> Платні послуги
              </Link>
            </li>
            <li>
              <Link href="/komanda" className="flex items-center gap-2 hover:text-blue-400 transition group">
                <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /> Команда
              </Link>
            </li>
            <li>
              <Link href="/novyny" className="flex items-center gap-2 hover:text-blue-400 transition group">
                <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /> Новини
              </Link>
            </li>
          </ul>
        </div>

        {/* КОЛОНКА 3: Контакти (займає 3 колонки) */}
        <div className="lg:col-span-3">
          <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Контакти</h4>
          <ul className="space-y-4">
            <li>
              <a href="tel:+380674572828" className="flex items-center gap-3 hover:text-blue-400 transition group text-sm">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-900/50 transition">
                  <PhoneCall size={14} />
                </div>
                <span>(067) 457-28-28</span>
              </a>
            </li>
            <li>
              <a href="mailto:baby_house@ukr.net" className="flex items-center gap-3 hover:text-blue-400 transition group text-sm">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-900/50 transition">
                  <Mail size={14} />
                </div>
                <span>baby_house@ukr.net</span>
              </a>
            </li>
            <li>
               <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <MapPin size={14} />
                  </div>
                  <span>м. Житомир,<br/>вул. Корабельна, 8</span>
                </div>
            </li>
          </ul>
        </div>

        {/* КОЛОНКА 4: Соцмережі (займає 3 колонки) */}
        <div className="lg:col-span-3">
          <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Ми в мережі</h4>
          
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/vitrylazhyttia/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/babyzthouse/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition duration-300 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Вітрила Життя. Всі права захищені.</p>
        <p className="mt-2 md:mt-0">Житомир, Україна</p>
      </div>
    </footer>
  );
}