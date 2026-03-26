import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";

// 1. Імпортуємо GoogleAnalytics
import { GoogleAnalytics } from '@next/third-parties/google';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>

      {/* 2. Вставляємо компонент і ваш ID */}
      <GoogleAnalytics gaId="G-RSQEJVSJFQ" /> 
      
    </html>
  );
}