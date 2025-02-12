import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'  // Verbessert FCP (First Contentful Paint)
});

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
      <head>
        <link rel="preconnect" href="https://cdn-cookieyes.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WJFGRZMTSF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WJFGRZMTSF');
          `}
        </Script>
      </head>
      <body>
        {children}
        <Script
          id="cookieyes"
          strategy="lazyOnload"
          src="https://cdn-cookieyes.com/client_data/b45a3cd385ffd614b2659a4a/script.js"
          defer
        />
      </body>
    </html>
  );
}
