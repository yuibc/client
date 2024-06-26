import { Instruction, PublicKey } from '@metaplex-foundation/umi';
import { ReactNode, SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type ArtBlockProps = {
    id: number;
    title: string;
    url: string;
    cryptoPrice: number;
    cryptoCurrency: string;
    currency: string;
    isDashboardItem: boolean;
    disabled: boolean;
    creator: string;
    mint: PublicKey;
    walletAddress: string;
    cid: string;
};

export type TArtBlock = ArtBlockProps;

export type TArtBlockExtra = TArtBlock & {
    published: boolean;
    onClick: () => void;
};

export type TArtwork = Omit<Omit<TArtBlock, 'isDashboardItem'>, 'disabled'> & {
    description: string;
    categories: string;
    metadata: string;
    published: boolean;
    instructions: Instruction[];
};

export type SectionProps = {
    header: string;
    icon: ReactNode;
    children: ReactNode;
    hasFilter: boolean;
    gridSize: 1 | 2 | 3 | 4 | 5;
    onClick: () => void;
    limited: boolean;
    noHeader: boolean;
};

export type FooterSubscriptionProps = {
    subscriptionTitle: string;
    communityTitle: string;
};

export type CreatorBlockProps = {
    avatarUrl: string;
    displayName: string;
    followerCount: number;
    onFollow: () => void;
    noFollowButton: boolean;
    borderless: boolean;
};

export type TCreator = Omit<
    Omit<CreatorBlockProps, 'noFollowButton'>,
    'borderless'
>;

export type TCreatorResponse = {
    id: number;
    email: string;
    displayName: string;
    walletAddress: string;
    follows: unknown[];
};

export type CartDrawerProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
};

export type LoginPopupProps = {
    title: string;
    isOpen: boolean;
    onOpen: () => void;
    onConnect: () => void;
};

export type CartItemProps = {
    title: string;
    creator: string;
    cryptoPrice: number;
    currency: string;
    cryptoCurrency: string;
};

export type CartItemV2Props = CartItemProps & {
    value: string;
    url: string;
    metadata: string;
    mint: string;
    walletAddress: string;
};

export type UserDropdownProps = {
    onClick: () => void;
    displayName: string;
};

export type EmptyProps = {
    description: string;
};

export type PostModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onPost: () => void;
};

export type TAuth = {
    email: string;
    walletAddress: string;
    password: string;
};

export type TUser = {
    email: string;
    displayName: string;
    walletAddress: string;
};

export type TInsensitiveUser = Omit<TUser, 'password'>;

export type TCart = {
    user: number;
    artwork: number;
};

export type TCategory = {
    display: string;
};

export type TPurchasedItemProps = {
    id: number;
    payer: string;
    artworkTitle: string;
    artworkUrl: string;
    mint: string;
    amount: number;
    purchasedAt: Date;
    transaction: string;
    status: 'OWNED' | 'PAID';
};

export type TProfileProps = {
    isOpen: boolean;
    onClose: () => void;
};
