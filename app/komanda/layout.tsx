import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Наша команда | Центр Вітрила Життя',
  description: 'Познайомтесь із нашими фахівцями. Досвідчені лікарі, реабілітологи, психологи та логопеди, які щодня допомагають дітям ставати здоровішими.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}