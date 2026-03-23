import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astrology",
  description: "Astrology, natal charts, forecasts and tarot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
