import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Ben Ogren - Product Leader',
  description: 'Strategic product leader with 15+ years building enterprise SaaS platforms and emerging technology products',
  keywords: ['product leader', 'product management', 'SaaS', 'AI', 'emerging technology', 'enterprise software'],
  authors: [{ name: 'Ben Ogren', url: 'https://benogren.com' }],
  creator: 'Ben Ogren',
  publisher: 'Ben Ogren',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://chores-ai-api.vercel.app/icon1.png',
  },
  manifest: 'https://chores-ai-api.vercel.app/manifest.json',
  openGraph: {
    title: 'Ben Ogren - Product Leader',
    description: 'Strategic product leader with 15+ years building enterprise SaaS platforms and emerging technology products',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://chores-ai-api.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ben Ogren - Product Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ben Ogren - Product Leader',
    description: 'Strategic product leader with 15+ years building enterprise SaaS platforms and emerging technology products',
    images: ['https://chores-ai-api.vercel.app/x-og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
