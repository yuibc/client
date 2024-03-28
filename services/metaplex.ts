import {
    TokenStandard,
    createNft,
    createV1,
    mintV1,
} from '@metaplex-foundation/mpl-token-metadata';
import {
    KeypairSigner,
    PublicKey,
    Umi,
    generateSigner,
    percentAmount,
    publicKey,
} from '@metaplex-foundation/umi';

type TMintData = {
    name: string;
    uri: string;
    walletAddress: string;
};

export function useMetaplexUmi() {
    const sellerFeeBasisPoints = percentAmount(2.0, 2);

    const mint = (umi: Umi) => generateSigner(umi);

    const createAccount = async (
        umi: Umi,
        mint: KeypairSigner,
        { name, uri }: Omit<TMintData, 'walletAddress'>,
    ) =>
        await createV1(umi, {
            mint,
            name,
            uri,
            sellerFeeBasisPoints,
            tokenStandard: TokenStandard.NonFungible,
        }).sendAndConfirm(umi);

    const mintToken = async (
        umi: Umi,
        pk: PublicKey,
        authority: KeypairSigner,
        walletAddress: string,
    ) =>
        await mintV1(umi, {
            mint: pk,
            authority,
            amount: 1,
            tokenOwner: publicKey(walletAddress),
            tokenStandard: TokenStandard.NonFungible,
        }).sendAndConfirm(umi);

    const nft = async (
        umi: Umi,
        mint: KeypairSigner,
        { name, uri, walletAddress }: TMintData,
    ) =>
        await createNft(umi, {
            mint,
            name,
            uri,
            sellerFeeBasisPoints,
            tokenOwner: publicKey(walletAddress),
        }).sendAndConfirm(umi);

    return {
        mint,
        nft,
        createAccount,
        mintToken,
    };
}
