import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
    TokenStandard,
    createV1,
    fetchDigitalAsset,
    mintV1,
    mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import {
    generateSigner,
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
    const umi = createUmi(process.env.NEXT_PUBLIC_YUI_SERVER as string).use(
        mplTokenMetadata(),
    );

    const mint = generateSigner(umi);

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

    const fetchAsset = async () => await fetchDigitalAsset(umi, mint.publicKey);

    const createAccount = async ({ name, uri }: TNFT) =>
        await createV1(umi, {
            mint,
            authority: mint,
            name,
            uri,
            sellerFeeBasisPoints: percentAmount(2.0),
            tokenStandard: TokenStandard.NonFungible,
        }).sendAndConfirm(umi);

    const mintToken = async (walletAddress: string) =>
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
    };
}
