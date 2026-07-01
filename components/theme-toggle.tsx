'use client';

import * as React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = React.useCallback(() => {
        switch (resolvedTheme) {
            case 'light':
                setTheme('dark');
                break;
            case 'dark':
                setTheme('light');
                break;
        }
    }, [resolvedTheme, setTheme]);

    return (
        <Button onClick={toggleTheme} variant="outline" size="icon-lg">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
