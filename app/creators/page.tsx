'use client';
import { CreatorBlock } from '@/components/creator-block';
import { Empty } from '@/components/empty';
import { FaSolidUsersIcon, MingcuteUserStarFillIcon } from '@/components/icons';
import { SectionContent } from '@/components/section-content';
import { creatorsAtom, useFollow, useToast, useUser } from '@/services';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export default function Creators() {
    const { users } = useUser();
    const { follow } = useFollow();
    const [creators, setCreators] = useAtom(creatorsAtom);
    const { onSuccess, onError } = useToast();
    const [isLoading, setIsLoading] = useState({
        selectedId: 0,
        loading: false,
    });

    const fetchCreators = async () => {
        try {
            const loggedUser = localStorage.getItem('User');
            const data = await users();
            if (!data || creators.length > 0 || !loggedUser) return;
            const excludeSelf = data.filter(
                (creator) => creator.id !== parseInt(loggedUser),
            );
            setCreators(excludeSelf);
        } catch (e) {
            console.error(e);
        }
    };

    const followCreator = async (userId: number, displayName: string) => {
        try {
            const user = localStorage.getItem('User');
            if (!user || !userId) return;
            setIsLoading({ selectedId: userId, loading: true });
            await follow(parseInt(user), userId);
            setIsLoading({ selectedId: 0, loading: false });
            onSuccess(`Followed ${displayName}`);
        } catch (e) {
            console.error(e);
            onError(`Cannot follow ${displayName}`);
        }
    };

    useEffect(() => {
        fetchCreators();
    }, []);

    return (
        <section>
            <div className="flex flex-col items-center mb-6">
                <span className="my-7 flex flex-row gap-2">
                    <MingcuteUserStarFillIcon size={60} />
                    <h1 className="text-5xl font-bold">
                        Creators of the month
                    </h1>
                </span>
                <div className="flex justify-center items-center gap-3">
                    <CreatorBlock
                        displayName="@X_User"
                        followerCount={10000}
                        rankingBorder="first"
                    />
                    <CreatorBlock
                        displayName="@Y_User"
                        followerCount={6000}
                        rankingBorder="second"
                    />
                    <CreatorBlock
                        displayName="@Z_User"
                        followerCount={4000}
                        rankingBorder="third"
                    />
                </div>
            </div>
            <hr className="my-10 border-default-50" />
            <SectionContent
                header="Creators"
                icon={<FaSolidUsersIcon />}
                hasFilter
                gridSize={4}>
                {creators.length > 0 &&
                    creators.map((creator, index) => (
                        <CreatorBlock
                            key={index}
                            id={creator.id}
                            displayName={creator.displayName}
                            followerCount={creator.follows.length}
                            onFollow={() =>
                                followCreator(creator.id, creator.displayName)
                            }
                            avatarUrl="https://picsum.photos/200/300"
                            isLoading={
                                creator.id === isLoading.selectedId &&
                                isLoading.loading
                            }
                        />
                    ))}
            </SectionContent>
            {creators.length === 0 && <Empty description="No item" />}
        </section>
    );
}
