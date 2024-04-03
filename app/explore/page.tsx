'use client';
import { ArtBlock } from '@/components/art-block';
import { Empty } from '@/components/empty';
import { SectionContent } from '@/components/section-content';
import { isCreator, toIPFSGateway } from '@/helpers';
import { isAuthAtom, publishedArtworksAtom, useArtwork } from '@/services';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export default function Explore() {
    const [isLoading, setIsLoading] = useState(false);
    const [artworks, setPresentArtworks] = useAtom(publishedArtworksAtom);
    const isAuth = useAtomValue(isAuthAtom);
    const { allArtworks } = useArtwork();

    const fetchPublishedArtworks = async () => {
        try {
            setIsLoading(true);
            const data = await allArtworks();
            const publishedArtworks = data.filter(
                (artwork) => artwork.published,
            );
            setPresentArtworks(publishedArtworks);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        if (artworks.length === 0) fetchPublishedArtworks();
    }, []);

    return (
        <SectionContent gridSize={5} header="Explore" noHeader>
            {!isLoading &&
                artworks.map((item, index) => (
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
                        isDashboardItem={
                            isAuth && isCreator(item.walletAddress)
                        }
                        published={item.published}
                        cid={item.cid}
                    />
                ))}
            {artworks.length === 0 && (
                <div className="col-span-5 h-[200px]">
                    <Empty description="No item" />
                </div>
            )}
        </SectionContent>
    );
}
