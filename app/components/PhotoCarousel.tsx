"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoCarousel({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Стан для збереження відкритої фотографії
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Блокуємо скрол основної сторінки, коли фото відкрито на весь екран
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImage]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* --- ОСНОВНА КАРУСЕЛЬ (Або одне фото) --- */}
      {images.length === 1 ? (
        <div 
          className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] overflow-hidden mb-10 shadow-lg cursor-zoom-in group"
          onClick={() => setSelectedImage(images[0])}
        >
          <Image src={images[0]} alt="Фото новини" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
        </div>
      ) : (
        <div className="relative w-full mb-10 group">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((src, index) => (
              <div 
                key={index} 
                className="relative w-full md:w-[85%] shrink-0 aspect-video md:aspect-[21/9] snap-center rounded-[32px] overflow-hidden shadow-md cursor-zoom-in group/photo bg-slate-200 dark:bg-slate-800 та animate-pulse"
                onClick={() => setSelectedImage(src)}
              >
                <Image src={src} alt={`Фото ${index + 1}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px" className="object-cover group-hover/photo:scale-105 transition-transform duration-700" priority={index === 0} 
  loading={index === 0 ? "eager" : "lazy"} />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">
                  {index + 1} / {images.length}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block pointer-events-none absolute inset-0">
            <button 
              onClick={(e) => { e.stopPropagation(); scroll("left"); }}
              className="pointer-events-auto absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl rounded-full flex items-center justify-center text-slate-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-white"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); scroll("right"); }}
              className="pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl rounded-full flex items-center justify-center text-slate-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-white"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}

      {/* --- МОДАЛЬНЕ ВІКНО ДЛЯ ЗБІЛЬШЕНОГО ФОТО --- */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            
            {/* Темний фон, клік по якому закриває фото */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />

            {/* Контейнер з фотографією */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl"
            >
              {/* Кнопка закриття (Хрестик) */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              <Image 
                src={selectedImage} 
                alt="Збільшене фото" 
                fill 
                className="object-contain" // object-contain гарантує, що фото поміститься цілком без обрізки
                priority
              />
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}