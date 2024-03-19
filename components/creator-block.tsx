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

    return (
        <div
            className={clsx(
                'flex justify-evenly items-center gap-3 border-1 border-default-100 rounded-md p-5',
            )}>
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
                        {formatThousand(followerCount as number)} Followers
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
