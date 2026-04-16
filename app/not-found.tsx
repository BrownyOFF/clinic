import Link from "next/link";
// УВАГА: Перевірте, чи правильний шлях до вашого Header! 
// Якщо він лежить у папці components, то шлях має бути приблизно таким:
import Header from "@/app/components/Header"; 

export default function NotFound() {
  return (
    <>
      {/* Додаємо вашу навігацію зверху */}
      <Header />

      <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6">
        <div className="relative">
          {/* Декоративний елемент на фоні */}
          <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 rounded-full w-full h-full -z-10"></div>
          
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-4 drop-shadow-sm">
            404
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Ой! Сторінку не знайдено
        </h2>
        
        <p className="text-slate-600 dark:text-slate-300 max-w-lg mb-10 text-lg">
          Схоже, ви перейшли за старим посиланням. Ми нещодавно оновили наш сайт, і деякі сторінки переїхали за новими адресами. Але не хвилюйтеся, все найважливіше — на головній!
        </p>
        
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95"
        >
          Повернутися на головну
        </Link>
      </main>
    </>
  );
}