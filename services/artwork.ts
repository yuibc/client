import { BASE_URL } from '@/config/env';
import { TArtwork } from '@/types';

export function useArtwork(baseUrl = BASE_URL) {
    const artworks = async () => {};

    const add = async ({
        title,
        description,
        url,
        currency,
        cryptoPrice,
        categories,
        metadata,
        published,
    }: Partial<TArtwork>) => {
        const walletAddress = localStorage.getItem('User');
        if (!walletAddress) return;

        const res = await fetch(`${baseUrl}/user/${walletAddress}/artwork`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                url,
                currency,
                cryptoPrice,
                categories,
                metadata,
                published,
            }),
        });
        return await res.text();
    };

    const upload = async (
        data: FormData,
    ): Promise<Uint8Array | string | undefined> => {
        const res = await fetch(`${baseUrl}/generic/artwork/upload`, {
            method: 'POST',
            body: data,
        });
        return await res.json();
    };

    return {
        artworks,
        add,
        upload,
    };
}
