import {
    TokenStandard,
    burnV1,
    createNft,
    createV1,
    mintV1,
    transferV1,
} from '@metaplex-foundation/mpl-token-metadata';
import {
    KeypairSigner,
    PublicKey,
    Umi,
    generateSigner,
    percentAmount,
    publicKey,
    Signer,
} from '@metaplex-foundation/umi';

type TMintData = {
    name: string;
    uri: string;
    walletAddress: string;
};

type TTransfer = {
    mint: PublicKey;
    tokenOwner: Signer;
    destinationOwner: PublicKey;
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

    const nft = (
        umi: Umi,
        mint: KeypairSigner,
        { name, uri, walletAddress }: TMintData,
    ) =>
        createNft(umi, {
            mint,
            name,
            uri,
            sellerFeeBasisPoints,
            tokenOwner: publicKey(walletAddress),
        });

    const transferOwnership = (
        umi: Umi,
        { mint, tokenOwner, destinationOwner }: TTransfer,
    ) =>
        transferV1(umi, {
            mint,
            authority: tokenOwner,
            tokenOwner: tokenOwner.publicKey,
            destinationOwner,
            tokenStandard: TokenStandard.NonFungible,
        });

    const burnNft = async (umi: Umi, mint: PublicKey) =>
        await burnV1(umi, {
            mint,
            authority: umi.identity,
            tokenOwner: umi.identity.publicKey,
            tokenStandard: TokenStandard.NonFungible,
        }).sendAndConfirm(umi);

    return {
        mint,
        nft,
        createAccount,
        mintToken,
        transferOwnership,
        burnNft,
    };
}
