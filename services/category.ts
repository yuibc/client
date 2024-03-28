import { BASE_URL } from '@/config/env';

export function useCategory(baseUrl = BASE_URL) {
    const categories = async () => {
        const res = await fetch(`${baseUrl}/categories`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return await res.json();
    };

    return { categories };
}
