import { BASE_URL } from '@/config/env';
import { TArtwork } from '@/types';

export function useArtwork(baseUrl = BASE_URL) {
    const artworks = async (walletAddress: string) => {
        const res = await fetch(`${baseUrl}/user/${walletAddress}/artworks`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.json();
    };

    const add = async ({
        title,
        description,
        url,
        currency,
        cryptoPrice,
        categories,
        metadata,
        published,
        instructions,
        mint,
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
                instructions,
                mint,
            }),
        });
        return await res.text();
    };

    const allArtworks = async (): Promise<TArtwork[]> => {
        const res = await fetch(`${baseUrl}/artworks`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.json();
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

    const publish = async (id: number) => {
        const res = await fetch(`${baseUrl}/artwork/${id}/published`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.text();
    };

    const updatePrice = async (id: number, price: number) => {
        const res = await fetch(`${baseUrl}/artwork/${id}/price`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ price }),
        });
        return await res.text();
    };

    return {
        artworks,
        add,
        upload,
        allArtworks,
        publish,
        updatePrice,
    };
}
