import { BASE_URL } from '@/config/env';
import { TInsensitiveUser } from '@/types';

export function useFollow(url = BASE_URL) {
    const followers = async (
        userId: number,
    ): Promise<TInsensitiveUser[] | undefined> => {
        const res = await fetch(`${url}/user/${userId}/followers`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.json();
    };

    const follow = async (id: number, userId: number) => {
        const res = await fetch(`${url}/user/${id}/follow?userId=${userId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.text();
    };

    const isFollowed = async (id: number, userId: number) => {
        const res = await fetch(`${url}/user/${id}/follow?userId=${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.text();
    };

    return { followers, follow, isFollowed };
}
