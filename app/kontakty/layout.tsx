import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Контакти | Центр Вітрила Життя Житомир',
  description: 'Зв\'яжіться з нами для консультації чи запису. Актуальна адреса, телефони, електронна пошта, графік роботи та схема проїзду до нашого центру.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}