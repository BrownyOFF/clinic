import Header from "./components/Header";
import Hero from "./components/Hero";
import Directions from "./components/Directions";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function Home() {
  return (
    // Головний контейнер з плавним переходом кольорів
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-500">
      
      {/* --- АБСТРАКТНИЙ ФОН --- */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         {/* Мікро-сітка */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         {/* М'яке синє сяйво зверху */}
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>
      
      <Header />
      <main>
        <Hero />
        <Directions />
        <Location />
      </main>
      <Footer />
    </div>
  );
}