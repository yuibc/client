export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'YUI',
    description: 'An NFT-Based Marketplace',
    navItems: [
        {
            label: 'Creators',
            href: '/creators',
        },
        {
            label: 'Explore',
            href: '/explore',
        },
    ],
    navMenuItems: [],
    links: {
        github: 'https://github.com/nextui-org/nextui',
        twitter: 'https://twitter.com/getnextui',
    },
};
