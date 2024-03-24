import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage';
import {
    TokenStandard,
    createV1,
    fetchDigitalAsset,
    mintV1,
    mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import {
    GenericFile,
    generateSigner,
    percentAmount,
    publicKey,
} from '@metaplex-foundation/umi';

type TNFT = {
    name: string;
    uri: string;
};

type TArtwork = {
    title: string;
    description: string;
    owner: string;
    artworkUri: string;
};

export function useMetaplex() {
    const umi = createUmi(process.env.NEXT_PUBLIC_YUI_SERVER as string).use(
        mplTokenMetadata(),
    );

    umi.use(
        nftStorageUploader({
            token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string,
        }),
    );

    const mint = generateSigner(umi);

    const uploadArtwork = async (fileBuffer: GenericFile) => {
        const [uri] = await umi.uploader.upload([fileBuffer]);
        return uri;
    };

    const uploadArtworkMetadata = async ({
        title,
        description,
        artworkUri,
        owner,
    }: TArtwork) => {
        return await umi.uploader.uploadJson({
            title,
            description,
            artworkUri,
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
        uploadArtworkMetadata,
        createAccount,
        mintToken,
    };
}
