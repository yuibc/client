import React from 'react';
import { Checkbox, Chip, cn, Image } from '@nextui-org/react';
import { CartItemV2Props } from '@/types';

export const CartItemV2 = ({
    title,
    creator,
    cryptoPrice,
    currency,
    cryptoCurrency,
    url,
    walletAddress,
    mint,
    id,
}: Partial<CartItemV2Props & { id: number }>) => {
    return (
        <Checkbox
            classNames={{
                base: cn(
                    'inline-flex max-w-full bg-content m-0',
                    'hover:bg-content2 items-center justify-start',
                    'cursor-pointer gap-2 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-primary',
                ),
                label: 'w-full',
            }}
            value={JSON.stringify({
                id,
                title,
                cryptoPrice,
                creator,
                mint,
                walletAddress,
            })}>
            <div className="w-full flex justify-between gap-2">
                <Image
                    width={300}
                    height={300}
                    src={url}
                    fallbackSrc="https://via.placeholder.com/300x200"
                    alt="https://via.placeholder.com/300x200"
                />
                <span className="flex flex-col w-full">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <Chip color="primary" size="sm" variant="flat">
                        {creator}
                    </Chip>
                </span>
                <span className="flex justify-end items-end gap-1 w-full">
                    <h3 className="font-semibold">
                        {cryptoPrice} {cryptoCurrency}
                    </h3>
                    <h5 className="text-default-500">{currency}</h5>
                </span>
            </div>
        </Checkbox>
    );
};
