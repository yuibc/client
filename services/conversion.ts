import { BASE_URL } from '@/config/env';

export function useCryptoConversion(baseUrl = BASE_URL) {
    const solanaToUsd = async (): Promise<number> => {
        const res = await fetch(`${baseUrl}/converted/price`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data['5426'].quote.USD.price;
    };

    const calculatePrice = (solanaInUsd: number, amount: number) =>
        (amount * solanaInUsd).toFixed(2);

    return {
        solanaToUsd,
        calculatePrice,
    };
}
