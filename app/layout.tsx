import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";

// 1. Імпортуємо GoogleAnalytics
import { GoogleAnalytics } from '@next/third-parties/google';

// 1. Імпортуємо заставку
import SplashScreen from "@/app/components/SplashScreen";

// 2. Імпортуємо нашу нову кнопку
import ScrollToTop from "@/app/components/ScrollToTop";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Вітрила Життя | Центр медичної реабілітації дітей у Житомирі",
  
  description: "Комплексна медична реабілітація та паліативна допомога дітям у Житомирі. Безкоштовні послуги за пакетами НСЗУ: фізична терапія, ерготерапія, логопед, психолог, раннє втручання.",
  
  keywords: [
    "реабілітація дітей Житомир", 
    "Вітрила Життя", 
    "дитячий реабілітаційний центр", 
    "паліативна допомога дітям", 
    "логопед Житомир", 
    "дитячий невролог Житомир",
    "фізична терапія для дітей",
    "ДЦП реабілітація",
    "раннє втручання Житомир",
    "ЦМР та ПДД ЖОР"
  ],
  
  openGraph: {
    title: "Вітрила Життя | Центр медичної реабілітації",
    description: "Комплексна медична реабілітація та паліативна допомога дітям у Житомирі.",
    url: "https://vitrylazhyttia.com.ua",
    siteName: "Вітрила Життя",
    locale: "uk_UA",
    type: "website",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Обов'язково додайте suppressHydrationWarning сюди, якщо використовуєте темну тему
    <html lang="uk" suppressHydrationWarning> 
      <body className={inter.className}>

        {/* 2. Ставимо заставку сюди, щоб вона перекривала все */}
        <SplashScreen />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          
          {/* 3. Вставляємо кнопку, щоб вона відображалася поверх усіх сторінок */}
          <ScrollToTop />
        </ThemeProvider>
      </body>

      {/* Вставляємо компонент аналітики і ваш ID */}
      <GoogleAnalytics gaId="G-RSQEJVSJFQ" /> 
      
    </html>
  );
}