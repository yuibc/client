import { TArtBlock, TCreator } from '@/types';

export const fixedArts: Omit<TArtBlock, 'isDashboardItem'>[] = [
    {
        artworkId: 1,
        title: 'Horses for Courses',
        url: '/assets/output_3761611179_0.jpg',
        cryptoPrice: 1,
        cryptoCurrency: 'SOL',
        currency: '$',
    },
    {
        artworkId: 2,
        title: 'Clockwork',
        url: '/assets/output_3761611179_1.jpg',
        cryptoPrice: 0.012,
        cryptoCurrency: 'SOL',
        currency: '$',
    },
    {
        artworkId: 3,
        title: 'Abstraction',
        url: '/assets/output_3952756105_0.jpg',
        cryptoPrice: 0.0025,
        cryptoCurrency: 'SOL',
        currency: '$',
    },
    {
        artworkId: 4,
        title: 'Uniqueness',
        url: '/assets/6769c8aa-23bf-43c9-93c6-204744e427db.jpeg',
        cryptoPrice: 0.001,
        cryptoCurrency: 'SOL',
        currency: '$',
    },
    {
        artworkId: 5,
        title: 'Empowered',
        url: '/assets/output_3761611179_1.jpg',
        cryptoPrice: 0.01,
        cryptoCurrency: 'SOL',
        currency: '$',
    },
];

export const fixedCreators: TCreator[] = [
    {
        avatarUrl: '',
        displayName: '@LTRFZzMket',
        followerCount: 100,
        onFollow: () => {},
    },
    {
        avatarUrl: '',
        displayName: '@YbrNLicXBV',
        followerCount: 100,
        onFollow: () => {},
    },
    {
        avatarUrl: '',
        displayName: '@loXuBidpAY',
        followerCount: 100,
        onFollow: () => {},
    },
    {
        avatarUrl: '',
        displayName: '@kEPmNTIurq',
        followerCount: 100,
        onFollow: () => {},
    },
    {
        avatarUrl: '',
        displayName: '@RbiujfxBMA',
        followerCount: 100,
        onFollow: () => {},
    },
    {
        avatarUrl: '',
        displayName: '@IYnGScPXKO',
        followerCount: 100,
        onFollow: () => {},
    },
];
