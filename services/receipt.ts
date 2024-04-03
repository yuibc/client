import { BASE_URL } from '@/config/env';

type TReceipt = {
    artworkId: number;
    transaction: string;
};

export function useReceipt(baseUrl = BASE_URL) {
    const receipts = async (userId: number) => {
        const res = await fetch(`${baseUrl}/user/${userId}/receipts`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.json();
    };

    const createReceipt = async (
        userId: number,
        { artworkId, transaction }: TReceipt,
    ) => {
        const res = await fetch(`${baseUrl}/user/${userId}/receipt/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ artworkId, transaction }),
        });
        return await res.text();
    };

    return {
        receipts,
        createReceipt,
    };
}
