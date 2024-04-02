import { CartItemProps } from '@/types';
import { Image } from '@nextui-org/react';

export const CartItem = ({
    title,
    creator,
    cryptoPrice,
    currency,
    cryptoCurrency,
}: Partial<CartItemProps>) => {
    return (
        <div className="w-full h-[140px] p-5 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <div className="grid grid-cols-4 gap-5">
                <Image
                    className="col-span-1"
                    width={150}
                    height={150}
                    src=""
                    fallbackSrc="https://via.placeholder.com/300x200"
                    alt="https://via.placeholder.com/300x200"
                />
                <span className="flex flex-col col-span-2">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <h5 className="text-lg italic">{creator}</h5>
                </span>
                <span className="flex col-span-1 justify-end items-end gap-1">
                    <h3 className="font-semibold">
                        {cryptoPrice} {cryptoCurrency}
                    </h3>
                    <h5 className="text-default-500">{currency}</h5>
                </span>
            </div>
        </div>
    );
};
