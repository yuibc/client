import { TArtwork } from '@/types';

export function useArtwork(baseUrl = process.env.NEXT_PUBLIC_YUI_SERVER) {
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
        try {
            const walletAddress = localStorage.getItem('User');
            if (!walletAddress) return;

            const res = await fetch(
                `${baseUrl}/user/${walletAddress}/artwork`,
                {
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
                },
            );
            console.log(await res.text());
        } catch (e) {
            console.error(e);
        }
    };

    const upload = async (
        data: FormData,
    ): Promise<Uint8Array | string | undefined> => {
        try {
            const res = await fetch(`${baseUrl}/generic/artwork/upload`, {
                method: 'POST',
                body: data,
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    return {
        artworks,
        add,
        upload,
    };
}
