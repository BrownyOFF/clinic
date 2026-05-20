import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Помічник первинного скринінгу | Центр Вітрила Життя',
  description: 'Інтерактивний помічник первинного скринінгу для визначення необхідності реабілітації чи паліативної допомоги.',
  alternates: {
    canonical: 'https://vitrylazhyttia.com.ua/dlya-patsiyenta/screening',
    languages: {
      'uk-UA': 'https://vitrylazhyttia.com.ua/dlya-patsiyenta/screening',
      'en-US': 'https://vitrylazhyttia.com.ua/en/for-patient/screening',
    },
  },
};

export default function ScreeningLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
