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
import { useCryptoConversion } from '@/services';

export const ArtBlock = ({
    url,
    title,
    currency,
    cryptoPrice,
    cryptoCurrency,
    isDashboardItem,
    artworkId,
}: Partial<ArtBlockProps>) => {
    const { add } = useCart();
    const { solanaToUsd, calculatePrice } = useCryptoConversion();
    const [convertedPrice, setConvertedPrice] = useState('');
    const addToCart = async () => {
        const userId = localStorage.getItem('User');
        if (!userId) return;
        await add({ user: parseInt(userId as string), artwork: artworkId });
    };

    useEffect(() => {
        // solanaToUsd().then((data) =>
        //     setConvertedPrice(calculatePrice(data, cryptoPrice || 0.0)),
        // );
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
                                {convertedPrice} {currency}
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
                        />
                    )}
                </div>
            </CardBody>
        </Card>
    );
};
