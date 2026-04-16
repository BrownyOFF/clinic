import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Напрямки реабілітації та допомоги | Вітрила Життя',
  description: 'Надаємо комплексні послуги з фізичної реабілітації, психологічної підтримки, логопедичної корекції та паліативної допомоги дітям у Житомирі.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}