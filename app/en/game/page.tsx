import type { Metadata } from "next";
import GameScreenEn from "./GameScreenEn";

export const metadata: Metadata = {
  title: "Children's Game \"Find a Pair\" | Medical Rehabilitation Center \"Vitryla Zhyttia\"",
  description: "Fun and educational mobile Memory Match game for children. Keep your little one entertained in the lobby of the \"Vitryla Zhyttia\" medical center while waiting for an appointment.",
  alternates: {
    canonical: "https://vitrylazhyttia.com.ua/en/game",
    languages: {
      "uk-UA": "https://vitrylazhyttia.com.ua/game",
      "en-US": "https://vitrylazhyttia.com.ua/en/game",
    },
  },
  openGraph: {
    title: "Children's Game \"Find a Pair\" | Vitryla Zhyttia",
    description: "Fun and educational mobile Memory Match game for children.",
    url: "https://vitrylazhyttia.com.ua/en/game",
    type: "website",
  },
};

export default function GamePageEn() {
  return <GameScreenEn />;
}
