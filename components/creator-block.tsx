import { CreatorBlockProps } from '@/types';
import { Avatar, Button } from '@nextui-org/react';
import { FlowbiteUsersSolidIcon } from './icons';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { isAuthAtom } from '@/services';

export const CreatorBlock = ({
    avatarUrl,
    displayName,
    followerCount,
    onFollow,
    noFollowButton,
    borderless,
    rankingBorder,
    isLoading,
    id,
}: Partial<
    CreatorBlockProps & {
        rankingBorder: 'first' | 'second' | 'third';
        id: number;
        isLoading: boolean;
    }
>) => {
    const isAuth = useAtomValue(isAuthAtom);
    const formatThousand = (total: number) =>
        total > 1000 ? `${total * 0.001}k` : total;
    const formatFollower = (total: number) =>
        total < 2 ? `${total} Follower` : `${formatThousand(total)} Followers`;

    return (
        <div
            className={clsx({
                ['flex justify-evenly items-center p-5 gap-3']: true,
                ['border-1 border-default-100 rounded-md']: !borderless,
                ['border-0 rounded-md']: borderless,
                ['border-5 border-indigo-500 rounded-md']:
                    rankingBorder === 'first',
                ['border-3 border-pink-600 rounded-md']:
                    rankingBorder === 'second',
                ['border-1 border-yellow-700 rounded-md']:
                    rankingBorder === 'third',
            })}>
            <div>
                <Avatar
                    name={displayName}
                    className="w-20 h-20 text-large"
                    src={avatarUrl}
                />
            </div>
            <div className="flex flex-col gap-3">
                <h2 className="text-xl">{displayName}</h2>
                <span className="flex gap-1">
                    <FlowbiteUsersSolidIcon />
                    <h5 className="text-sm">
                        {formatFollower(followerCount as number)}
                    </h5>
                </span>
                {!noFollowButton && (
                    <Button
                        title="Follow"
                        onClick={onFollow}
                        variant="flat"
                        isDisabled={isAuth ? false : true}
                        isLoading={isLoading}>
                        Follow
                    </Button>
                )}
            </div>
        </div>
    );
};
