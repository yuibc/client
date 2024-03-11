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
  onClick: () => void;
};

export type FooterSubscriptionProps = {
  subscriptionTitle: string;
  communityTitle: string;
};
