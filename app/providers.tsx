'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { WalletProvider } from '@solana/wallet-adapter-react';

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}
export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        const savedItems = localStorage.getItem('Saved-Items');
        if (!savedItems) localStorage.setItem('Saved-Items', '{}');
    }
    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>
                <WalletProvider wallets={[]}>{children}</WalletProvider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}
