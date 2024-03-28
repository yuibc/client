import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { useWallet } from '@solana/wallet-adapter-react';
import { ReactNode } from 'react';
import { UmiContext } from '@/services';

export const UmiProvider = ({
    endpoint,
    children,
}: {
    endpoint: string;
    children: ReactNode;
}) => {
    const wallet = useWallet();
    const umi = createUmi(endpoint)
        .use(walletAdapterIdentity(wallet))
        .use(mplTokenMetadata());

    return (
        <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>
    );
};
