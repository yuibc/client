'use client';
import { ArtBlock } from '@/components/art-block';
import { Empty } from '@/components/empty';
import { PostModal } from '@/components/post-modal';
import { SectionContent } from '@/components/section-content';
import { toIPFSGateway } from '@/helpers';
import { isAuthAtom } from '@/services';
import { Button, Tab, Tabs } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export default function ArtworkManagement() {
    const [openPostModal, setPostModal] = useState(false);
    const isAuth = useAtomValue(isAuthAtom);
    const handlePostModal = () => {
        setPostModal(!openPostModal);
    };

    useEffect(() => {
        if (!isAuth) location.href = '/';
    }, [isAuth]);

    return (
        <section>
            <div className="flex flex-col items-center mb-6">
                <span className="my-7 flex flex-row gap-2">
                    <Button
                        variant="flat"
                        color="primary"
                        onPress={handlePostModal}>
                        Post your work
                    </Button>
                </span>
            </div>
            <PostModal isOpen={openPostModal} onClose={handlePostModal} />
            <div className="flex w-full flex-col">
                <Tabs
                    size="lg"
                    variant="underlined"
                    className="border-b border-default-50 py-7 font-semibold">
                    <Tab key="work" title="Work (4/30)">
                        <SectionContent gridSize={5} header="Your creations">
                            <ArtBlock
                                isDashboardItem
                                url={toIPFSGateway(
                                    'ipfs://bafybeiaxzk66xbeiuk3rfxz2bygkqtts63wsyhthujbfrpvhsarhfqa7gu/output_3761611179_0.jpg',
                                )}
                            />
                            <ArtBlock isDashboardItem />
                            <ArtBlock isDashboardItem />
                            <ArtBlock isDashboardItem />
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
