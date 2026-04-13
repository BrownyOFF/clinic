import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { newsData } from "@/app/data/news";
import PhotoCarousel from "@/app/components/PhotoCarousel";

// Генерація статичних шляхів
export function generateStaticParams() {
  return newsData.map((news) => ({
    slug: news.slug,
  }));
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  // Розпаковуємо параметри (чекаємо, поки Next.js їх прочитає)
  const resolvedParams = await params;
  
  // Тепер шукаємо новину за правильним посиланням
  const newsItem = newsData.find((n) => n.slug === resolvedParams.slug);

  // Якщо посилання неправильне — показуємо 404
  if (!newsItem) {
    notFound();
  }

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden bg-white dark:bg-slate-950">
      
      {/* АБСТРАКТНИЙ ФОН */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>

      <Header />

      <main className="py-16 md:py-24 max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Кнопка "Назад" */}
        <Link href="/novyny" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-10 font-semibold">
          <ArrowLeft size={20} /> Повернутися до всіх новин
        </Link>

        {/* Шапка статті */}
        <article>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-6 font-medium">
            <Calendar size={18} />
            <span>{newsItem.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 text-slate-900 dark:text-white leading-[1.15]">
            {newsItem.title}
          </h1>

          {/* МАГИЯ ЗДЕСЬ: Если у новости есть массив images, показываем карусель. Иначе - обычное фото */}
          {newsItem.images && newsItem.images.length > 0 ? (
            <PhotoCarousel images={newsItem.images} />
          ) : (
            <div className="relative w-full aspect-[21/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <Image 
                src={newsItem.image} 
                alt={newsItem.title} 
                fill 
                className="object-cover object-center" 
                priority
              />
            </div>
          )}

          {/* Розумний рендер тексту статті */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            {newsItem.content.map((block: any, index: number) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="mb-6" dangerouslySetInnerHTML={{ __html: block.value }} />
                );
              }
              if (block.type === "heading") {
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-slate-900 dark:text-white" dangerouslySetInnerHTML={{ __html: block.value }} />
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={index} className="list-disc pl-6 mb-6 space-y-2 marker:text-blue-500">
                    {block.items.map((item: string, i: number) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}