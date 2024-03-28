import { BASE_URL } from '@/config/env';
import { TCart } from '@/types';

export function useCart(url = BASE_URL) {
    const add = async ({ user, artwork }: Partial<TCart>) => {
        try {
            const res = await fetch(`${url}/cart?userId=${user}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ artwork }),
            });
            console.log(await res.text());
        } catch (e) {
            console.error(e);
        }
    };

    const cartByUser = async (userId: number) => {
        try {
            const res = await fetch(`${url}/user/${userId}/cart`, {
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

    return { add, cartByUser };
}
