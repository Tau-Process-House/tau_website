import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tau Process House",
  description: "Process Automation for your company",
  icons: {
    icon: [
      {
        url: 'favicon.ico',
        href: 'favicon.ico'
      }
    ],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body>
        {children}
        <Script
          id="cookieyes"
          strategy="lazyOnload"
          src="https://cdn-cookieyes.com/client_data/9f7466614a16a609c3f3f65c/script.js"
        />
      </body>
    </html>
  );
}
