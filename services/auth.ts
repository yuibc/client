import { TAuth } from '@/types';

export function useAuth(url = process.env.NEXT_PUBLIC_YUI_SERVER) {
    const authenticate = async ({
        email,
        password,
        walletAddress,
    }: Partial<TAuth>) => {
        try {
            const accessToken = localStorage.getItem('Access-Token') || '';
            const res = await fetch(`${url}/auth`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ email, password }),
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
