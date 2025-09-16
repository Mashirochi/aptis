import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationHeader from "../components/NavigationHeader";
import { ThemeProvider } from "../contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Listening APTIS - English Listening Practice Platform",
    template: "%s | Listening APTIS"
  },
  description: "Master your English listening skills with our comprehensive APTIS preparation platform. Practice with authentic audio materials, interactive exercises, and detailed feedback across all 4 parts of the APTIS listening test.",
  keywords: [
    "APTIS listening",
    "English listening practice",
    "APTIS preparation",
    "English language learning",
    "listening comprehension",
    "audio exercises",
    "English test preparation",
    "APTIS test",
    "listening skills",
    "English proficiency"
  ],
  authors: [{ name: "Listening APTIS Team" }],
  creator: "Listening APTIS",
  publisher: "Listening APTIS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://listening-aptis.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Listening APTIS - English Listening Practice Platform",
    description: "Master your English listening skills with our comprehensive APTIS preparation platform. Practice with authentic audio materials and interactive exercises.",
    url: 'https://listening-aptis.vercel.app',
    siteName: 'Listening APTIS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Listening APTIS - English Listening Practice Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Listening APTIS - English Listening Practice Platform",
    description: "Master your English listening skills with our comprehensive APTIS preparation platform.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Listening APTIS",
              "description": "English listening practice platform for APTIS test preparation",
              "url": "https://listening-aptis.vercel.app",
              "logo": "https://listening-aptis.vercel.app/logo.png",
              "educationalUse": "Language Learning",
              "teaches": "English Listening Skills",
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student"
              },
              "provider": {
                "@type": "Organization",
                "name": "Listening APTIS"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <NavigationHeader />
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    }, function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
