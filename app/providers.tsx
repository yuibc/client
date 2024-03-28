'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import {
    WalletProvider,
    ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { UmiProvider } from './umi-provider';

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}
export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

    if (typeof window !== 'undefined') {
        const savedItems = localStorage.getItem('Saved-Items');
        if (!savedItems) localStorage.setItem('Saved-Items', '{}');
    }
    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={[]}>
                        <UmiProvider
                            endpoint={
                                process.env.NEXT_PUBLIC_RPC_ENDPOINT as string
                            }>
                            {children}
                        </UmiProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}
