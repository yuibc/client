import { TInsensitiveUser, TUser } from '@/types';

export function useUser(url = process.env.NEXT_PUBLIC_YUI_SERVER) {
    const create = async ({ email, password, displayName }: Partial<TUser>) => {
        try {
            const res = await fetch(`${url}/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ email, password, displayName }),
            });
            console.log(await res.text());
        } catch (e) {
            console.error(e);
        }
    };

    const users = async () => {
        return await fetch(`${url}/users`);
    };

    const findById = async (
        id: number | string,
    ): Promise<TInsensitiveUser | undefined> => {
        try {
            const res = await fetch(`${url}/users/${id}`, {
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

    return { create, users, findById };
}
