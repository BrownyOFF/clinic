import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ScrollToTop from "@/app/components/ScrollToTop";
import Script from "next/script"; // <-- ДОДАЛИ ІМПОРТ SCRIPT

const inter = Inter({ subsets: ["latin", "cyrillic"], display: 'swap', });

export const metadata: Metadata = {
  title: "Вітрила Життя | Центр медичної реабілітації дітей у Житомирі",
  description: "Комплексна медична реабілітація та паліативна допомога дітям у Житомирі. Безкоштовні послуги за пакетами НСЗУ: фізична терапія, ерготерапія, логопед, психолог, раннє втручання.",
  keywords: [
    "реабілітація дітей Житомир", "Вітрила Життя", "дитячий реабілітаційний центр", 
    "паліативна допомога дітям", "логопед Житомир", "дитячий невролог Житомир",
    "фізична терапія для дітей", "ДЦП реабілітація", "раннє втручання Житомир", "ЦМР та ПДД ЖОР"
  ],
  icons: { 
    icon: 'icon.png',
    apple: '/icon.png',
   },
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
      index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning> 
      
      <body className={inter.className}>
        <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
        </div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ScrollToTop />
        </ThemeProvider>

        {/* ПРАВИЛЬНЕ ЛІНИВЕ ПІДКЛЮЧЕННЯ АНАЛІТИКИ */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-RSQEJVSJFQ" 
          strategy="lazyOnload" 
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RSQEJVSJFQ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}