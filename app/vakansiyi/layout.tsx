import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вакансії | Центр Вітрила Життя Житомир',
  description: 'Приєднуйтесь до нашої команди професіоналів! Відкриті вакансії для лікарів, фахівців з реабілітації, психологів та медсестер у Житомирі.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}