import { GsapProvider } from '@/components/providers/gsap-provider';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { getRepoStars } from '@/lib/github';

export default async function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const stars = await getRepoStars();
    return (
        <GsapProvider>
            <LenisProvider>
                <Navbar stars={stars} />
                <main className="flex-1 pt-[72px]">{children}</main>
                <Footer stars={stars} />
            </LenisProvider>
        </GsapProvider>
    );
}
