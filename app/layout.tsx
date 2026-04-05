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
  title: "Вітрила Життя | Центр медичної реабілітації",
  description: "Комунальне некомерційне підприємство «Центр медичної реабілітації та паліативної допомоги дітям» Житомирської обласної ради.",
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