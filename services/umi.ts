import { Umi } from '@metaplex-foundation/umi';
import { createContext, useContext } from 'react';

type TUmiContext = {
    umi: Umi | null;
};

export const UmiContext = createContext<TUmiContext>({ umi: null });

export function useUmi(): Umi {
    const umi = useContext(UmiContext).umi;
    if (!umi) {
        throw new Error(
            'Umi context was not initialized. ' +
                'Did you forget to wrap your app with <UmiProvider />?',
        );
    }
    return umi;
}
