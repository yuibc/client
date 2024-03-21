import { TInsensitiveUser } from '@/types';

export function useFollow(url = process.env.NEXT_PUBLIC_YUI_SERVER) {
    const followers = async (
        userId: number,
    ): Promise<TInsensitiveUser[] | undefined> => {
        try {
            const res = await fetch(`${url}/user/${userId}/followers`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    const follow = async (userId: number) => {
        try {
            const res = await fetch(`${url}/${userId}/follow`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            console.log(await res.text());
        } catch (e) {
            console.error(e);
        }
    };

    return { followers, follow };
}
