import { ReactNode, SVGProps } from "react";

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
};

export type TArtBlock = ArtBlockProps;

export type SectionProps = {
  header: string;
  icon: ReactNode;
  children: ReactNode;
  hasFilter: boolean;
  gridSize: 3 | 4 | 5;
  onClick: () => void;
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
};

export type TCreator = CreatorBlockProps;

export type LoginPopupProps = {
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onConnect: () => void;
};
