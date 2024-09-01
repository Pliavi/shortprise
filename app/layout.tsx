import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "./globals.css";
import { RSBackgroundBubbles } from "@/components/RSBackgroundBubbles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shortprise",
  description: "Crie seus atalhos para URLs como uma surpresa!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex flex-col w-dvw h-dvh relative bg-gray-900 items-center justify-center overflow-hidden text-white">
          <RSBackgroundBubbles />
          <div className="fixed inset-0 border-4 border-l-pink-500 border-r-orange-500 border-b-cyan-500 border-t-purple-500 border-opacity-25"></div>
          <div className="fixed inset-0 backdrop-blur-3xl z-[2]"></div>
          <div className="fixed inset-0 z-[4] bg-[url('/background.jpg')] bg-cover bg-center mix-blend-color-dodge opacity-25"></div>
          <div className="fixed inset-0 h-dvh sm:inset-auto sm:relative z-10 container md:max-w-[1024px] mx-auto sm:h-4/5 flex flex-col items-center justify-stretch sm:justify-center sm:gap-6">
            <h1 className="flex-shrink-0 basis-20 flex items-center justify-center relative text-4xl sm:text-6xl text-center text-white font-black drop-shadow-xl">
              Shortprise
            </h1>
            <div className="w-full flex-1 overflow-y-scroll sm:max-h-[90%] bg-gray-950 bg-opacity-75 sm:rounded-2xl shadow-2xl">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
