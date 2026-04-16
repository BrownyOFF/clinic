import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Про нас | Центр Вітрила Життя',
  description: 'Дізнайтеся більше про нашу місію, цінності та історію. Ми створюємо комфортні умови для ефективної реабілітації та паліативної допомоги дітям.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}