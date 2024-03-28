'use client';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Image,
    Button,
    Link,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { ArtBlockProps } from '@/types';
import { CartIcon, PhGearSixFillIcon } from './icons';
import { useCart } from '@/services/cart';
import {
    addedItemsAtom,
    shoppingCartAtom,
    useCryptoConversion,
} from '@/services';
import { useAtom } from 'jotai';

export const ArtBlock = ({
    url,
    title,
    currency,
    cryptoPrice,
    cryptoCurrency,
    isDashboardItem,
    id,
    creator,
}: Partial<ArtBlockProps>) => {
    const { add } = useCart();
    const { solanaToUsd, calculatePrice } = useCryptoConversion();
    const [convertedPrice, setConvertedPrice] = useState('');
    const [shoppingCart, setShoppingCart] = useAtom(shoppingCartAtom);
    const [addedItems, setAddedItems] = useAtom(addedItemsAtom);

    const addToCart = async () => {
        const userId = localStorage.getItem('User');
        const items = JSON.parse(localStorage.getItem('Saved-Items') as string);
        if (!userId) {
            if (Object.keys(items).length === 0) {
                const savedItems = Object.assign({ [`${id}`]: 1 }, {});
                localStorage.setItem('Saved-Items', JSON.stringify(savedItems));
            } else {
                localStorage.setItem(
                    'Saved-Items',
                    JSON.stringify({ ...items, [`${id}`]: 1 }),
                );
            }
            setAddedItems({ ...addedItems, [`${id}`]: 1 });
            setShoppingCart([
                ...shoppingCart,
                {
                    url,
                    title,
                    currency,
                    cryptoPrice,
                    cryptoCurrency,
                    creator,
                    id,
                },
            ]);
            return;
        }
        await add({ user: parseInt(userId as string), artwork: id });
    };

    useEffect(() => {
        solanaToUsd().then((data) =>
            setConvertedPrice(calculatePrice(data, cryptoPrice || 0.0)),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={url}
                    width={270}
                />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <h4 className="font-bold text-large my-2">{title}</h4>
                <div className="flex items-center justify-between">
                    <span>
                        <p className="text-tiny uppercase font-bold">Price</p>
                        <small className="flex gap-2">
                            <span className="">
                                {cryptoPrice} {cryptoCurrency}
                            </span>
                            <span className="text-default-500">
                                {currency} {convertedPrice}
                            </span>
                        </small>
                    </span>
                    {isDashboardItem ? (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    size="md"
                                    className="text-sm font-semibold text-default-600 bg-default-100"
                                    startContent={<PhGearSixFillIcon />}
                                    variant="flat"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Artblock Actions">
                                <DropdownItem key="publish/unpublish">
                                    Publish
                                </DropdownItem>
                                <DropdownItem key="edit" startContent="">
                                    Edit
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button
                            isExternal
                            isIconOnly
                            as={Link}
                            size="md"
                            className="text-sm font-semibold text-default-600 bg-default-100"
                            startContent={<CartIcon />}
                            variant="flat"
                            onPress={addToCart}
                            isDisabled={addedItems[`${id}`] === 1}
                        />
                    )}
                </div>
            </CardBody>
        </Card>
    );
};
