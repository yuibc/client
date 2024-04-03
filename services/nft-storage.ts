import { NFTStorage } from 'nft.storage';

type TArtwork = {
    title: string;
    description: string;
    owner: string;
    artwork: File | Blob;
};

export function useNFTStorage() {
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

    const deleteUploaded = async (cid: string) => await storage.delete(cid);

    return { uploadArtwork, deleteUploaded };
}
