'use client';
import { ArtBlock } from '@/components/art-block';
import { SectionContent } from '@/components/section-content';
import { Button, Tab, Tabs } from '@nextui-org/react';

export default function ArtworkManagement() {
    return (
        <section>
            <div className="flex flex-col items-center mb-6">
                <span className="my-7 flex flex-row gap-2">
                    <Button variant="flat" color="primary">
                        Post your work
                    </Button>
                </span>
            </div>
            <hr className="my-10 border-default-50" />
            <div className="flex w-full flex-col">
                <Tabs>
                    <Tab key="work" title="Work">
                        <SectionContent gridSize={5} header="Your creations">
                            <ArtBlock />
                            <ArtBlock />
                            <ArtBlock />
                            <ArtBlock />
                            <ArtBlock />
                        </SectionContent>
                    </Tab>
                    <Tab key="purchased" title="Purchased"></Tab>
                    <Tab key="bookmark" title="Bookmark"></Tab>
                </Tabs>
            </div>
        </section>
    );
}
