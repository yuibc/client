import { TUser } from '@/types';

export function useUser() {
    const create = async ({ email }: Partial<TUser>) => {
        try {
            const res = await fetch(`${process.env.YUI_SERVER}/user`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    accept: 'application/json',
                },
            });
            console.log(await res.text());
        } catch (e) {
            console.error(e);
        }
    };

    const users = async () => {
        return await fetch(`${process.env.YUI_SERVER}/users`);
    };

    return { create, users };
}
