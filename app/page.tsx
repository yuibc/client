import { ArtBlock } from '@/components/art-block';
import { FooterSubscription } from '@/components/footer-subscription';
import { GgTrendingIcon, MdiCreationIcon } from '@/components/icons';
import { SectionContent } from '@/components/section-content';
import { fixedArts } from '@/config/fixed-data';

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center w-full gap-y-5">
            <SectionContent
                limited
                header="TOP Trending"
                icon={<GgTrendingIcon />}
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
