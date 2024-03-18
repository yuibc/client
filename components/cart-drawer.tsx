import { CartDrawerProps } from '@/types';
import { Button } from '@nextui-org/button';
import { SolarTrashBinTrashBoldIcon, WalletLoginIcon } from './icons';
import { CheckboxGroup, Divider, RadioGroup } from '@nextui-org/react';
import { CartItemV2 } from './cart-item-v2';
import { useState } from 'react';
import { RadioV2 } from './radio-v2';
import { AnimatePresence, motion } from 'framer-motion';

export const CartDrawer = ({
    title,
    isOpen,
    onClose,
}: Partial<CartDrawerProps>) => {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed top-0 right-0 h-screen z-[1000]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    x: [100, 0],
                                    opacity: 1,
                                    transition: {
                                        duration: 0.1,
                                    },
                                }}
                                exit={{
                                    x: [100, 0],
                                    opacity: 0,
                                    transition: {
                                        duration: 0.1,
                                    },
                                }}>
                                <div className="w-[500px] bg-white dark:bg-neutral-950 rounded-lg h-screen p-1">
                                    <div className="flex justify-around items-center my-8">
                                        <h1 className="text-3xl font-semibold">
                                            {title}
                                        </h1>
                                        <Button
                                            variant="flat"
                                            startContent={
                                                <SolarTrashBinTrashBoldIcon />
                                            }>
                                            Clear
                                        </Button>
                                    </div>
                                    <Divider />
                                    <div className="flex flex-col items-center h-[400px] overflow-x-hidden overflow-y-auto">
                                        <CheckboxGroup
                                            value={groupSelected}
                                            classNames={{ base: 'w-full' }}
                                            onChange={setGroupSelected}>
                                            <CartItemV2
                                                title="Horses for Courses"
                                                author="@adudarkwa"
                                                currency="$"
                                                cryptoCurrency="SOL"
                                                cryptoPrice={1}
                                                convertedPrice={97}
                                            />
                                        </CheckboxGroup>
                                    </div>
                                    <Divider />
                                    <RadioGroup
                                        label="Payment Methods"
                                        className="px-5 mt-2"
                                        orientation="horizontal">
                                        <RadioV2
                                            value="Crypto"
                                            className="w-full"
                                            description="Pay with SOLANA">
                                            Crypto
                                        </RadioV2>
                                        <RadioV2
                                            value="Visa/Debit"
                                            className="w-full"
                                            description="Pay with your desire card">
                                            Visa/Debit
                                        </RadioV2>
                                    </RadioGroup>
                                    <span className="p-5 grid grid-cols-6">
                                        <div className="col-span-4 font-semibold">
                                            <h3>Transaction Fee</h3>
                                            <h3>Total Price</h3>
                                        </div>
                                        <div className="col-span-2 italic">
                                            <h3>$2</h3>
                                            <h3>2.02 SOL ($ 196)</h3>
                                        </div>
                                    </span>
                                    <div className="flex justify-center items-center">
                                        <Button
                                            variant="flat"
                                            startContent={<WalletLoginIcon />}>
                                            Complete Purchase
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 w-full h-screen bg-neutral-950 z-[900]"></motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
