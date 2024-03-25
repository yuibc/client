import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
    TokenStandard,
    createNft,
    createV1,
    fetchDigitalAsset,
    mintV1,
    mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import {
    KeypairSigner,
    percentAmount,
    publicKey,
} from '@metaplex-foundation/umi';
import { NFTStorage } from 'nft.storage';

type TNFT = {
    name: string;
    uri: string;
};

type TArtwork = {
    title: string;
    description: string;
    owner: string;
    artwork: File | Blob;
};

export function useMetaplex() {
    const umi = createUmi('https://api.testnet.solana.com/').use(
        mplTokenMetadata(),
    );

    const storage = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string,
    });

    const uploadArtwork = async ({
        title,
        description,
        artwork,
        owner,
    }: TArtwork) => {
        return await storage.store({
            name: title,
            description,
            image: artwork,
            owner,
        });
    };

    const fetchAsset = async (mint: KeypairSigner) =>
        await fetchDigitalAsset(umi, mint.publicKey);

    const createAccount = async (mint: KeypairSigner, { name, uri }: TNFT) =>
        await createV1(umi, {
            mint,
            authority: mint,
            name,
            uri,
            sellerFeeBasisPoints: percentAmount(0.0),
            tokenStandard: TokenStandard.NonFungible,
        }).sendAndConfirm(umi);

    const nft = async (
        mint: KeypairSigner,
        walletAddress: string,
        { name, uri }: TNFT,
    ) =>
        await createNft(umi, {
            mint,
            name,
            uri,
            sellerFeeBasisPoints: percentAmount(5.5),
            tokenOwner: publicKey(walletAddress),
        }).sendAndConfirm(umi);

    const mintToken = async (mint: KeypairSigner, walletAddress: string) =>
        await mintV1(umi, {
            mint: mint.publicKey,
            amount: 1,
            tokenOwner: publicKey(walletAddress),
            tokenStandard: TokenStandard.NonFungible,
        }).sendAndConfirm(umi);

    return {
        fetchAsset,
        uploadArtwork,
        createAccount,
        mintToken,
        umi,
        nft,
    };
}
