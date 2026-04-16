import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Дитяча реабілітація: що потрібно знати | Вітрила Життя',
  description: 'Важлива інформація про процес дитячої реабілітації. Як підготуватися, які методи ми використовуємо та що очікувати від курсу відновлення.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}