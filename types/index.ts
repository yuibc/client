import { ReactNode, SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type ArtBlockProps = {
    title: string;
    url: string;
    cryptoPrice: number;
    convertedPrice: number;
    cryptoCurrency: string;
    currency: string;
    isDashboardItem: boolean;
};

export type TArtBlock = ArtBlockProps;

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

export type TCreator = CreatorBlockProps;

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
    convertedPrice: number;
    currency: string;
    cryptoCurrency: string;
};

export type CartItemV2Props = CartItemProps & {
    value: string;
};

export type UserDropdownProps = {
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
};
