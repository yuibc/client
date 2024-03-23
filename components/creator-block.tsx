import { CreatorBlockProps } from '@/types';
import { Avatar, Button } from '@nextui-org/react';
import { FlowbiteUsersSolidIcon } from './icons';
import clsx from 'clsx';

export const CreatorBlock = ({
    avatarUrl,
    displayName,
    followerCount,
    onFollow,
    noFollowButton,
    borderless,
}: Partial<CreatorBlockProps>) => {
    const formatThousand = (total: number) =>
        total > 1000 ? `${total * 0.001}k` : total;
    const formatFollower = (total: number) =>
        total < 1 ? `${total} Follower` : `${formatThousand(total)} Followers`;

    return (
        <div
            className={clsx({
                ['flex justify-evenly items-center p-5 gap-3']: true,
                ['border-1 border-default-100 rounded-md']: !borderless,
                ['border-0 rounded-md']: borderless,
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
                    <Button title="Follow" onClick={onFollow} variant="flat">
                        Follow
                    </Button>
                )}
            </div>
        </div>
    );
};
