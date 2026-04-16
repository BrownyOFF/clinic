import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Новини та події центру | Вітрила Життя',
  description: 'Останні новини, події, корисна інформація та звіти з життя Центру медичної реабілітації та паліативної допомоги дітям у Житомирі.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}