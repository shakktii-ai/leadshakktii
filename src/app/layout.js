import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Real Estate Lead Protection Audit | Shakktii AI',
  description:
    'Take this 2-minute assessment and discover how an owned property website can help you protect buyer relationships, eliminate shared portal lead waste, and build your own lead pipeline.',
  keywords: [
    'Real Estate Lead Audit',
    'Real Estate Website System',
    'Channel Partner Lead Generation',
    'Property Broker Marketing',
    'Micro-market Real Estate Website',
    'Shakktii AI',
  ],
  authors: [{ name: 'Shakktii AI' }],
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Real Estate Lead Protection Audit | Shakktii AI',
    description:
      'Stop losing your buyers to other agents. Check if your hard-earned leads are slipping away and see how an owned website saves you lakhs every year.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0B2B68',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 font-sans"
      >
        {children}
      </body>
    </html>
  );
}
