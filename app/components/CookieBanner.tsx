"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const initGA = (gaId: string) => {
  if (typeof window === "undefined" || window.gtag || !gaId) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
};

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      initGA(gaId);
    } else if (!consent) {
      // Show banner with a small delay for better user experience
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [gaId]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    initGA(gaId);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  const isEnglish = pathname.startsWith("/en");

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-3xl shadow-2xl z-[90] text-slate-800 dark:text-slate-250 transition-colors duration-500"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Cookie size={22} className="animate-bounce" style={{ animationDuration: "3s" }} />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {isEnglish ? "Cookie Preferences" : "Ми використовуємо кукі"}
              </h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                {isEnglish ? (
                  <>
                    This website uses cookies and analytics (Google Analytics) to optimize performance, improve navigation, and analyze traffic. Learn more in our{" "}
                    <Link href="/en/privacy-policy" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Цей сайт використовує файли cookie та аналітичні системи (Google Analytics) для оптимізації роботи, покращення навігації та аналізу відвідуваності. Детальніше в нашій{" "}
                    <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                      Політиці конфіденційності
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
            <button
              onClick={handleDecline}
              className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full transition shrink-0 cursor-pointer"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-300 rounded-xl text-xs md:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
            >
              {isEnglish ? "Decline" : "Відхилити"}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-blue-600/20 transition cursor-pointer"
            >
              {isEnglish ? "Accept" : "Погодитися"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
