import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Motorweb',
  description: 'Plataforma de gestão e exibição de veículos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
