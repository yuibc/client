'use client';
import { ArtBlock } from '@/components/art-block';
import { Empty } from '@/components/empty';
import { IconParkSolidAddPic } from '@/components/icons';
import { PostModal } from '@/components/post-modal';
import { SectionContent } from '@/components/section-content';
import { toIPFSGateway } from '@/helpers';
import { isAuthAtom, isUploadedAtom, useArtwork } from '@/services';
import { TArtwork } from '@/types';
import { Tab, Tabs } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export default function ArtworkManagement() {
    const [openPostModal, setPostModal] = useState(false);
    const [artworks, setArtworks] = useState<TArtwork[]>([]);
    const isAuth = useAtomValue(isAuthAtom);
    const isUploaded = useAtomValue(isUploadedAtom);
    const { artworks: getArtworks } = useArtwork();
    const handlePostModal = () => {
        setPostModal(!openPostModal);
    };

    useEffect(() => {
        if (!isAuth) location.href = '/';
        const walletAddress = localStorage.getItem('walletAddress');
        if (!walletAddress) return;
        getArtworks(walletAddress)
            .then((data) => setArtworks(data))
            .catch((e) => console.error(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, isUploaded]);

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
                    <Tab key="purchased" title="Purchased">
                        <Empty description="You haven't bought anything yet!" />
                    </Tab>
                    <Tab key="bookmark" title="Bookmark">
                        <Empty description="You haven't saved any artwork!" />
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}
