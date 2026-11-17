import type { Metadata } from "next";
import Head from "next/head"
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Player",
  description: "Les jeux de plateau sur navigateur",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <Head>
          <title>Webplayer</title>
          <link rel="stylesheet" href="style.css"/>
      </Head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
