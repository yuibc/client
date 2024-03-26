import { TArtwork } from '@/types';
import { atom } from 'jotai';

export const isAuthAtom = atom(false);

export const shoppingCartAtom = atom<Partial<TArtwork>[]>([]);

export const addedItemsAtom = atom<{ [K: string]: number }>({});
