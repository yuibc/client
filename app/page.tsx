'use client';
import { ArtBlock } from '@/components/art-block';
import { FooterSubscription } from '@/components/footer-subscription';
import { GgTrendingIcon, MdiCreationIcon } from '@/components/icons';
import { SectionContent } from '@/components/section-content';
import { fixedArts } from '@/config/fixed-data';
import { toIPFSGateway } from '@/helpers';
import { useArtwork } from '@/services';
import { TArtwork } from '@/types';
import { Card, Skeleton } from '@nextui-org/react';
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
                        published={item.published}
                    />
                ))}
                {presentArtworks.length === 0 &&
                    [1, 2, 3, 4, 5].map((item) => (
                        <Card key={item} className="p-4 space-y-5" radius="lg">
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        </Card>
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
