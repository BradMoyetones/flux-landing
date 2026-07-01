import { Geist, Geist_Mono, Outfit } from "next/font/google";

const geistSans = Geist({
    variable: '--font-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
});

const outfitSans = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
});

export { geistMono, geistSans, outfitSans }