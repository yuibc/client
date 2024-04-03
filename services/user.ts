import { BASE_URL } from '@/config/env';
import { TCreatorResponse, TInsensitiveUser, TUser } from '@/types';

export function useUser(url = BASE_URL) {
    const create = async ({
        email,
        displayName,
        walletAddress,
    }: Partial<TUser>) => {
        try {
            const res = await fetch(`${url}/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    displayName,
                    walletAddress,
                }),
            });
            console.log(await res.text());
        } catch (e) {
            console.error(e);
        }
    };

    const users = async (): Promise<TCreatorResponse[]> => {
        const res = await fetch(`${url}/users`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.json();
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

    const findByWalletAddress = async (walletAddress: string) => {
        try {
            const res = await fetch(`${url}/wallet/${walletAddress}/user`, {
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

    const findWalletAddressByDisplayName = async (displayName: string) => {
        try {
            const res = await fetch(`${url}/${displayName}/user`, {
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

    const updateProfile = async (
        walletAddress: string,
        { email, displayName }: Omit<TInsensitiveUser, 'walletAddress'>,
    ) => {
        try {
            const res = await fetch(`${url}/user/${walletAddress}/profile`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ email, displayName }),
            });
            return await res.text();
        } catch (e) {
            console.error(e);
        }
    };

    return {
        create,
        users,
        findById,
        findByWalletAddress,
        findWalletAddressByDisplayName,
        updateProfile,
    };
}
