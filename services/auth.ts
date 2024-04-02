import { BASE_URL } from '@/config/env';
import { TAuth } from '@/types';

export function useAuth(url = BASE_URL) {
    const accessToken = () => localStorage.getItem('Access-Token') || '';

    const setLocalStorage = (accessToken: string, userId: string) => {
        localStorage.setItem('Access-Token', accessToken);
        localStorage.setItem('User', userId);
    };

    const authenticate = async ({
        email,
        password,
    }: Partial<Omit<TAuth, 'walletAddress'>>) => {
        try {
            const res = await fetch(`${url}/auth`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken()}`,
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            setLocalStorage(data.accessToken, data.userId);
        } catch (e) {
            console.error(e);
        }
    };

    const authenticateWithWallet = async (walletAddress: string) => {
        try {
            const res = await fetch(`${url}/wallet/auth`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken()}`,
                },
                body: JSON.stringify({ walletAddress }),
            });
            const data = await res.json();
            setLocalStorage(data.accessToken, data.userId);
        } catch (e) {
            console.error(e);
        }
    };

    const verifyToken = async (): Promise<boolean | undefined> => {
        try {
            const res = await fetch(`${url}/verify/token`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken()}`,
                },
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    return { accessToken, authenticate, authenticateWithWallet, verifyToken };
}
