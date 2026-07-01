import LogoSvg from './logo-svg';
import { cn } from '@/lib/utils';

export default function LogoComponent(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                'relative flex size-8 items-center justify-center rounded-lg bg-accent border border-accent-foreground/20',
                props.className
            )}
        >
            <LogoSvg />
        </div>
    );
}