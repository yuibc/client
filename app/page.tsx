'use client';
import { ArtBlock } from '@/components/art-block';
import { FooterSubscription } from '@/components/footer-subscription';
import { GgTrendingIcon, MdiCreationIcon } from '@/components/icons';
import { SectionContent } from '@/components/section-content';
import { fixedArts } from '@/config/fixed-data';
import { toIPFSGateway } from '@/helpers';
import { useArtwork } from '@/services';
import { TArtwork } from '@/types';
import { useEffect, useState } from 'react';

export default function Home() {
    const { allArtworks } = useArtwork();
    const [presentArtworks, setPresentArtworks] = useState<TArtwork[]>([]);

    const isCreator = (owner: string) => {
        const walletAddress = localStorage.getItem('walletAddress');
        if (!walletAddress) return false;
        return walletAddress === owner;
    };

    useEffect(() => {
        allArtworks()
            .then((data) => {
                const publishedArtworks = data.filter(
                    (artwork) => artwork.published,
                );
                setPresentArtworks(publishedArtworks);
            })
            .catch((e) => console.error(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section className="flex flex-col items-center justify-center w-full gap-y-5">
            <SectionContent
                limited
                header="TOP Trending"
                icon={<GgTrendingIcon />}
                gridSize={5}>
                {presentArtworks.map((item, index) => (
                    <ArtBlock
                        key={index}
                        id={item.id}
                        title={item.title}
                        currency={item.currency}
                        cryptoCurrency={item.cryptoCurrency}
                        cryptoPrice={item.cryptoPrice}
                        url={toIPFSGateway(item.url)}
                        creator={item.creator}
                        walletAddress={item.walletAddress}
                        mint={item.mint}
                        isDashboardItem={isCreator(item.walletAddress)}
                    />
                ))}
            </SectionContent>
            <SectionContent
                limited
                header="TOP Creation"
                icon={<MdiCreationIcon />}
                gridSize={5}>
                {fixedArts.map((item, index) => (
                    <ArtBlock
                        key={index}
                        id={item.id}
                        title={item.title}
                        currency={item.currency}
                        cryptoCurrency={item.cryptoCurrency}
                        cryptoPrice={item.cryptoPrice}
                        url={item.url}
                        creator={item.creator}
                    />
                ))}
            </SectionContent>
            <FooterSubscription
                subscriptionTitle="Interested in this digital world?"
                communityTitle="Join the community"
            />
        </section>
    );
}
