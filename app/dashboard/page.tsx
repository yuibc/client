'use client';
import { ArtBlock } from '@/components/art-block';
import { Empty } from '@/components/empty';
import { IconParkSolidAddPic } from '@/components/icons';
import { PostModal } from '@/components/post-modal';
import { PurchasedItem } from '@/components/purchased-item';
import { SectionContent } from '@/components/section-content';
import { toIPFSGateway } from '@/helpers';
import {
    artworksAtom,
    isAuthAtom,
    receiptsAtom,
    useArtwork,
    useReceipt,
} from '@/services';
import { Tab, Tabs } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export default function ArtworkManagement() {
    const [openPostModal, setPostModal] = useState(false);
    const [artworks, setArtworks] = useAtom(artworksAtom);
    const isAuth = useAtomValue(isAuthAtom);
    const { artworks: getArtworks } = useArtwork();
    const [purchases, setReceipts] = useAtom(receiptsAtom);
    const { receipts } = useReceipt();

    const handlePostModal = () => {
        setPostModal(!openPostModal);
    };

    const fetchArtworks = async () => {
        try {
            const walletAddress = localStorage.getItem('walletAddress');
            if (!walletAddress) return;
            const data = await getArtworks(walletAddress);
            setArtworks(data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchReceipts = async () => {
        try {
            const userId = localStorage.getItem('User');
            if (!userId) return;
            const data = await receipts(parseInt(userId));
            setReceipts(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (!isAuth) location.href = '/';
        fetchArtworks();
        fetchReceipts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            {/* <div className="flex flex-col items-center mb-6"> */}
            {/*     <span className="my-7 flex flex-row gap-2"> */}
            {/*         <Button */}
            {/*             variant="flat" */}
            {/*             color="primary" */}
            {/*             onPress={handlePostModal}> */}
            {/*             Post your work */}
            {/*         </Button> */}
            {/*     </span> */}
            {/* </div> */}
            <PostModal isOpen={openPostModal} onClose={handlePostModal} />
            <div className="flex w-full flex-col">
                <Tabs
                    size="lg"
                    variant="underlined"
                    className="border-b border-default-50 py-7 font-semibold">
                    <Tab key="work" title={`Work (${artworks.length}/30)`}>
                        <SectionContent
                            gridSize={5}
                            header="Your creations"
                            noHeader>
                            {artworks.map((artwork, index) => (
                                <ArtBlock
                                    key={index}
                                    isDashboardItem
                                    url={toIPFSGateway(artwork.url)}
                                    title={artwork.title}
                                    id={artwork.id}
                                    cryptoPrice={artwork.cryptoPrice}
                                    cryptoCurrency={artwork.currency}
                                    currency="$"
                                    creator={artwork.creator}
                                    published={artwork.published}
                                    mint={artwork.mint}
                                    cid={artwork.cid}
                                />
                            ))}
                            <label
                                htmlFor="open-post-modal"
                                className="flex flex-col items-center justify-center w-full border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-neutral-200 dark:border-purple-500 dark:hover:border-purple-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <IconParkSolidAddPic size={72} />
                                    <p className="text-default-300 mt-2 font-semibold font-mono text-sm">
                                        Upload your work
                                    </p>
                                </div>
                                <input
                                    id="open-post-modal"
                                    type="button"
                                    className="hidden"
                                    onClick={handlePostModal}
                                />
                            </label>
                        </SectionContent>
                    </Tab>
                    <Tab
                        key="purchased"
                        title={`Purchased (${purchases.length})`}>
                        {purchases.length > 0 ? (
                            <SectionContent
                                gridSize={1}
                                header="Receipts"
                                noHeader>
                                {purchases.map((receipt, index) => (
                                    <PurchasedItem
                                        key={index}
                                        amount={receipt.amount}
                                        status={receipt.status}
                                        artworkTitle={receipt.artworkTitle}
                                        artworkUrl={toIPFSGateway(
                                            receipt.artworkUrl,
                                        )}
                                        mint={receipt.mint}
                                        id={receipt.id}
                                        purchasedAt={receipt.purchasedAt}
                                        payer={receipt.payer}
                                        transaction={receipt.transaction}
                                    />
                                ))}
                            </SectionContent>
                        ) : (
                            <Empty description="You haven't bought anything yet!" />
                        )}
                    </Tab>
                    <Tab key="bookmark" title="Bookmark">
                        <Empty description="You haven't saved any artwork!" />
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}
