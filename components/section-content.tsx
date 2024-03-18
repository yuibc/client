import { SectionProps } from '@/types';
import { Button, Link } from '@nextui-org/react';
import { FluentFilter24FilledIcon } from './icons';
import clsx from 'clsx';

export const SectionContent = ({
    header,
    icon,
    children,
    hasFilter,
    gridSize,
    onClick,
}: Partial<SectionProps>) => {
    return (
        <div className="flex flex-col gap-3 w-full mb-5">
            <div className="flex justify-between items-center gap-3">
                <span className="flex items-center gap-3">
                    <Button
                        isIconOnly
                        color="default"
                        startContent={icon}
                        variant="faded"
                    />
                    <h2 className="text-2xl font-semibold">{header}</h2>
                </span>
                {hasFilter && (
                    <Button
                        color="default"
                        variant="flat"
                        startContent={<FluentFilter24FilledIcon />}
                        onClick={onClick}>
                        Filter
                    </Button>
                )}
            </div>
            <div
                className={clsx(
                    'grid gap-5',
                    { 'grid-cols-3': gridSize === 3 },
                    { 'grid-cols-4': gridSize === 4 },
                    { 'grid-cols-5': gridSize === 5 },
                )}>
                {children}
            </div>
            <div className="flex justify-end">
                <Link className="text-md font-semibold cursor-pointer">
                    See more
                </Link>
            </div>
        </div>
    );
};
