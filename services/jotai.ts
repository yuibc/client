import {
    TArtwork,
    TCreatorResponse,
    TInsensitiveUser,
    TPurchasedItemProps,
} from '@/types';
import { Getter, SetStateAction, Setter, atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

export const isAuthAtom = atom(false);

export const shoppingCartAtom = atom<Partial<TArtwork>[]>([]);

export const addedItemsAtom = atom<{ [K: string]: number }>({});

export const isUploadedAtom = atom(false);

const toggle = (prev: boolean) => !prev;

export const isUploadedEffect = atomEffect((get: Getter, set: Setter) => {
    if (get(toggleUploadedState)) set(isUploadedAtom, toggle);
});

export const toggleUploadedState = atom<
    boolean,
    [unknown | SetStateAction<boolean>],
    void
>(false, (_get, set) => {
    set(toggleUploadedState, toggle);
});

export const artworksAtom = atom<TArtwork[]>([]);

export const publishedArtworksAtom = atom<TArtwork[]>([]);

export const creatorsAtom = atom<TCreatorResponse[]>([]);

export const receiptsAtom = atom<TPurchasedItemProps[]>([]);

export const profileAtom = atom<Partial<TInsensitiveUser>>({});
