import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Screening Assistant | Sails of Life Center',
  description: 'Interactive primary screening assistant to help determine rehabilitation or palliative care needs.',
  alternates: {
    canonical: 'https://vitrylazhyttia.com.ua/en/for-patient/screening',
    languages: {
      'uk-UA': 'https://vitrylazhyttia.com.ua/dlya-patsiyenta/screening',
      'en-US': 'https://vitrylazhyttia.com.ua/en/for-patient/screening',
    },
  },
};

export default function ScreeningLayoutEn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
