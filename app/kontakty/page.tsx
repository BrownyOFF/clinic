"use client";

import { useState, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, PhoneCall, Mail, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ContactsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // МАГІЯ WEB3FORMS: Тиха та безпечна відправка без перезавантаження
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    // 1. Збираємо дані форми
    formData.forEach((value, key) => {
      if (key.endsWith('[]')) {
        const cleanKey = key.replace('[]', '');
        if (!data[cleanKey]) data[cleanKey] = [];
        data[cleanKey].push(value);
      } else {
        data[key] = value;
      }
    });

    // 2. Об'єднуємо масиви (наприклад, обраних лікарів) через кому
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key] = data[key].join(', ');
      }
    });

    try {
      // 3. Відправляємо на наш власний безпечний API маршрут
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true); // Показуємо повідомлення про успіх
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
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">
      
      {/* АБСТРАКТНИЙ ФОН */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>

      <Header />

      <main className="py-16 md:py-24 relative z-10 max-w-7xl mx-auto px-6">
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
            Зв'яжіться з <span className="text-blue-600 dark:text-blue-400">нами</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ми завжди готові відповісти на ваші запитання, надати консультацію або допомогти з оформленням документів для реабілітації вашої дитини.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ІНФОРМАЦІЯ ТА КАРТА */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-5 space-y-8">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Наші контакти</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Адреса</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">м. Житомир, вул. Корабельна, 8</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Телефон</p>
                    <a href="tel:+380674572828" className="text-slate-600 dark:text-slate-400 text-sm mt-1 hover:text-emerald-600 transition-colors block">(067) 457-28-28</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                    <a href="mailto:baby_house@ukr.net" className="text-slate-600 dark:text-slate-400 text-sm mt-1 hover:text-amber-600 transition-colors block">baby_house@ukr.net</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Графік роботи</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Пн-Пт: 08:00 - 17:00<br/>Сб-Нд: Вихідні (стаціонар цілодобово)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Міні-карта */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.8152438531584!2d28.69466847648316!3d50.24407887154944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c64bd2db8b98b%3A0x8683e9b13fb8053!2z0LLRg9C7LiDQmtC-0YDQsNCx0LXQu9GM0L3QsCwgOCwg0JbQuNGC0L7QvNC40YAsINCW0LjRgtC-0LzQuNGA0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDEwMDAw!5e0!3m2!1suk!2sua!4v1710000000000!5m2!1suk!2sua" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>

          {/* ФОРМА ЗВОРОТНОГО ЗВ'ЯЗКУ */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="lg:col-span-7">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-bl-full -z-10 pointer-events-none"></div>
              
              {isSubmitted ? (
                // СТАН УСПІШНОЇ ВІДПРАВКИ
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Анкету успішно відправлено!</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
                    Дякуємо за звернення. Наш адміністратор зв'яжеться з вами найближчим часом для узгодження всіх деталей.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    Відправити ще одну анкету
                  </button>
                </motion.div>
              ) : (
                // ФОРМА
                <>
                  <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Запис на реабілітацію</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">Заповніть анкету, і наш адміністратор зв'яжеться з вами для узгодження візиту.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* 🛡️ HONEYPOT (Пастка для спам-ботів) */}
                    <input type="text" name="bot_check" className="hidden" autoComplete="off" tabIndex={-1} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ПІБ пацієнта *</label>
                        <input type="text" name="ПІБ_пацієнта" required className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="Іваненко Іван Іванович" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Дата народження *</label>
                        <input 
                          type="text" 
                          name="Дата_народження" 
                          required 
                          pattern="\d{2}\.\d{2}\.\d{4}"
                          title="Будь ласка, введіть дату у форматі ДД.ММ.РРРР (наприклад, 15.03.2020)"
                          className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" 
                          placeholder="ДД.ММ.РРРР" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Телефон для зв'язку *</label>
                        <input type="tel" name="Телефон" required className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="+38 (000) 000-00-00" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Електронне направлення</label>
                        <select name="Направлення" className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white appearance-none">
                          <option value="Не вказано">Оберіть тип направлення...</option>
                          <option value="Стаціонарна медична реабілітація">Стаціонарна медична реабілітація</option>
                          <option value="Нестаціонарна медична реабілітація">Нестаціонарна медична реабілітація</option>
                          <option value="Стаціонарна паліативна допомога">Стаціонарна паліативна допомога</option>
                          <option value="Нестаціонарна паліативна допомога">Нестаціонарна паліативна допомога</option>
                          <option value="Без направлення">Без направлення</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Адреса проживання *</label>
                      <input type="text" name="Адреса" required className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="Область, місто/село, вулиця" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Потреба в консультації спеціалістів:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                        {[
                          "Лікар ФРМ", "Фізичний терапевт", "Ерготерапевт", 
                          "Логопед/дефектолог", "Психолог", "Невролог дитячий", 
                          "Психіатр дитячий", "Ортопед-травматолог дитячий"
                        ].map((doc) => (
                          <label key={doc} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="Потрібна_консультація[]" value={doc} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc}</span>
                          </label>
                        ))}
                        <div className="sm:col-span-2 mt-2">
                           <input type="text" name="Консультація_Інше" className="w-full px-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="Інше (вкажіть спеціаліста)..." />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Діагноз (за бажанням)</label>
                      <input type="text" name="Діагноз" className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="Вкажіть діагноз..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Додаткова інформація</label>
                      <textarea name="Додаткова_інформація" rows={3} className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400 resize-none" placeholder="Додайте будь-яку інформацію, яку вважаєте важливою..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:bg-blue-400 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group mt-8"
                    >
                      {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Відправити анкету
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

            </div>
          </motion.div>
        </div>

      </main>

      <Footer />
    </div>
  );
}