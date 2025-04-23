// src/app/layout.tsx

'use client';  // Isso indica que esse componente é do lado do cliente

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles"; // Importando o ThemeProvider do MUI
import theme from "./theme/theme";  // Importando o tema que você criou
// import { Mulish } from 'next/font/google'

// const mulish = Mulish({
//   subsets: ['latin'],
//   weight: ['300', '400', '600', '700', '800'],
//   variable: '--font-mulish',
// })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: 'Okay, Where and When?',
//   description: '...',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
