import { Connection, PublicKey } from '@solana/web3.js';

export function useSolanaConnection() {
    return new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT as string);
}

export function useAccount() {
    const retrieveTokenAccount = async (walletAddress: string) => {
        const publicKey = new PublicKey(walletAddress);
        const programId = new PublicKey(
            process.env.NEXT_PUBLIC_TOKEN_PROGRAM_ID as string,
        );
        return await useSolanaConnection().getParsedTokenAccountsByOwner(
            publicKey,
            { programId },
        );
    };

    return {
        retrieveTokenAccount,
    };
}
