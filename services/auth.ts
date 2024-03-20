import { TAuth } from '@/types';

export function useAuth() {
    const authenticate = async ({
        email,
        password,
        walletAddress,
    }: Partial<TAuth>) => {
        try {
            const accessToken = localStorage.getItem('Access-Token') || '';
            const res = await fetch(`${process.env.YUI_SERVER}/auth`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            localStorage.setItem('Access-Token', data.accessToken);
            localStorage.setItem('User', data.userId);
        } catch (e) {
            console.error(e);
        }
    };

    return { authenticate };
}
