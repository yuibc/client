import { ReactNode, SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type ArtBlockProps = {
    artworkId: number;
    title: string;
    url: string;
    cryptoPrice: number;
    cryptoCurrency: string;
    currency: string;
    isDashboardItem: boolean;
    disabled: boolean;
};

export type TArtBlock = ArtBlockProps;

export type TArtwork = Omit<
    Omit<Omit<TArtBlock, 'isDashboardItem'>, 'artworkId'>,
    'disabled'
> & {
    description: string;
    categories: string;
    metadata: string;
    published: boolean;
};

export type SectionProps = {
    header: string;
    icon: ReactNode;
    children: ReactNode;
    hasFilter: boolean;
    gridSize: 3 | 4 | 5;
    onClick: () => void;
    limited: boolean;
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
    author: string;
    cryptoPrice: number;
    currency: string;
    cryptoCurrency: string;
};

export type CartItemV2Props = CartItemProps & {
    value: string;
    url: string;
    metadata: string;
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
    password: string;
    displayName: string;
    walletAddress: string;
};

export type TInsensitiveUser = Omit<TUser, 'password'>;

export type TCart = {
    user: number;
    artwork: number;
};
