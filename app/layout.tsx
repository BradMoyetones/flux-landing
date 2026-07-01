import type { Metadata } from 'next';
import { geistSans, geistMono, outfitSans } from '@/lib/fonts';
import './globals.css';

import { SITE_CONFIG } from '@/lib/config';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
    title: {
        default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
        template: `%s — ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
        'workflow engine',
        'desktop automation',
        'tauri',
        'rust',
        'node-based',
        'n8n alternative',
        'make alternative',
        'local automation',
    ],
    openGraph: {
        title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
        description: SITE_CONFIG.description,
        type: 'website',
        siteName: SITE_CONFIG.name,
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
        description: SITE_CONFIG.description,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${outfitSans.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
