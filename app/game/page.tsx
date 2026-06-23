import type { Metadata } from "next";
import GameScreen from "./GameScreen";

export const metadata: Metadata = {
  title: "Дитяча гра «Знайти пару» | Центр медичної реабілітації «Вітрила Життя»",
  description: "Весела та розвиваюча мобільна гра Memory Match для дітей. Розважте малюка в холі медичного центру «Вітрила Життя» під час очікування прийому.",
  alternates: {
    canonical: "https://vitrylazhyttia.com.ua/game",
    languages: {
      "uk-UA": "https://vitrylazhyttia.com.ua/game",
      "en-US": "https://vitrylazhyttia.com.ua/en/game",
    },
  },
  openGraph: {
    title: "Дитяча гра «Знайти пару» | Вітрила Життя",
    description: "Весела та розвиваюча мобільна гра Memory Match для дітей.",
    url: "https://vitrylazhyttia.com.ua/game",
    type: "website",
  },
};

export default function GamePage() {
  return <GameScreen />;
}
