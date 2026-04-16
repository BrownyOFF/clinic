import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Платні медичні послуги та ціни | Вітрила Життя Житомир',
  description: 'Офіційний перелік та вартість додаткових платних медичних послуг, процедур і консультацій, які надає наш реабілітаційний центр.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}