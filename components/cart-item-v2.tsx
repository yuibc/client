import React from 'react';
import { Checkbox, Chip, cn, Image } from '@nextui-org/react';
import { CartItemV2Props } from '@/types';

export const CartItemV2 = ({
    title,
    author,
    cryptoPrice,
    currency,
    cryptoCurrency,
    url,
}: Partial<CartItemV2Props>) => {
    return (
        <Checkbox
            classNames={{
                base: cn(
                    'inline-flex max-w-md w-full bg-content1 m-0',
                    'hover:bg-content2 items-center justify-start',
                    'cursor-pointer gap-2 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-primary',
                ),
                label: 'w-full',
            }}
            value={JSON.stringify({ title, cryptoPrice })}>
            <div className="w-full flex justify-between gap-2">
                <Image
                    className="col-span-1"
                    width={90}
                    height={90}
                    src={url}
                    fallbackSrc="https://via.placeholder.com/300x200"
                    alt="https://via.placeholder.com/300x200"
                />
                <span className="flex flex-col">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <Chip color="primary" size="sm" variant="flat">
                        {author}
                    </Chip>
                </span>
                <span className="flex col-span-1 justify-end items-end gap-1">
                    <h3 className="font-semibold">
                        {cryptoPrice} {cryptoCurrency}
                    </h3>
                    <h5 className="text-default-500">{currency}</h5>
                </span>
            </div>
        </Checkbox>
    );
};
