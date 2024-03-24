import { TAuth } from '@/types';

export function useAuth(url = process.env.NEXT_PUBLIC_YUI_SERVER) {
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

    return { authenticate, authenticateWithWallet };
}
