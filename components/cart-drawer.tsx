import { CartDrawerProps } from '@/types';
import { Button } from '@nextui-org/button';
import { SolarTrashBinTrashBoldIcon, WalletLoginIcon } from './icons';
import { CheckboxGroup, Divider, RadioGroup } from '@nextui-org/react';
import { CartItemV2 } from './cart-item-v2';
import { useEffect, useState } from 'react';
import { RadioV2 } from './radio-v2';
import { AnimatePresence, motion } from 'framer-motion';
import {
    addedItemsAtom,
    shoppingCartAtom,
    useCart,
    useCryptoConversion,
    useTransaction,
    useUmi,
    useToast,
    useUser,
    useShyftProvider,
} from '@/services';
import { useAtom, useSetAtom } from 'jotai';
import { createNoopSigner, publicKey } from '@metaplex-foundation/umi';
import { fixedArts } from '@/config/fixed-data';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, clusterApiUrl } from '@solana/web3.js';
import { Network, ShyftSdk, signAndSendTransaction } from '@shyft-to/js';

export const CartDrawer = ({
    title,
    isOpen,
    onClose,
}: Partial<CartDrawerProps>) => {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const { cartByUser } = useCart();
    const { solanaToUsd, calculatePrice } = useCryptoConversion();
    const [shoppingCart, setShoppingCart] = useAtom(shoppingCartAtom);
    const setAddedItems = useSetAtom(addedItemsAtom);
    const [convertedPrice, setConvertedPrice] = useState('');
    const umi = useUmi();
    const { transferSolTo } = useTransaction(umi);
    const { onSuccess, onError } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const wallet = useWallet();
    const {
        transfer,
        transferMany,
        completeTransaction,
        completeTransactions,
    } = useShyftProvider();

    type TSelectedItems = {
        title: string;
        cryptoPrice: number;
        creator: string;
        mint: string;
        walletAddress: string;
    };

    const clear = () => {
        setShoppingCart([]);
        setAddedItems({});
        setGroupSelected([]);
        localStorage.setItem('Saved-Items', '{}');
    };

    const getPrice = () => {
        let total = 0;
        if (groupSelected.length === 0) return 0;
        for (const selected of groupSelected) {
            const parsed: TSelectedItems = JSON.parse(selected);
            total += parsed.cryptoPrice as number;
        }
        return total;
    };

    const totalPrice = () =>
        shoppingCart.reduce(
            (accumulator, current) =>
                accumulator +
                parseFloat(current.cryptoPrice as unknown as string),
            0,
        );

    const completePayment = async () => {
        try {
            setIsLoading(true);
            const walletAddress = localStorage.getItem('walletAddress');
            if (!walletAddress) return;

            type TMintContent = { mint: string[]; amount: number };
            const selected = new Map<string, TMintContent>();
            for (const item of groupSelected) {
                const target: TSelectedItems = JSON.parse(item);
                const key = target.walletAddress;
                if (selected.has(key)) {
                    const current = selected.get(key);
                    if (current) {
                        current.mint.push(target.mint);
                        current.amount += target.cryptoPrice;
                        selected.set(key, current);
                    }
                } else {
                    selected.set(key, {
                        mint: [target.mint],
                        amount: target.cryptoPrice,
                    });
                }
            }

            if (selected.size > 1) {
                onError(
                    "You selected artworks by more than one creator. \n\nCurrently, the platform doesn't support multiple transfers yet. \n\nPlease select only artwork from a specific creator!",
                    6000,
                );
                return;
            }

            for (const [tokenOwner, target] of selected) {
                // if (target.mint.length > 1) {
                //     const tx = await transferMany({
                //         mint: target.mint,
                //         currentOwner: tokenOwner,
                //         newOwner: walletAddress,
                //     });
                //     await completeTransactions(tx);
                // } else if (target.mint.length === 1) {
                //     const tx = await transfer({
                //         mint: target.mint[0],
                //         currentOwner: tokenOwner,
                //         newOwner: walletAddress,
                //     });
                //     const connection = new Connection(
                //         process.env.NEXT_PUBLIC_RPC_ENDPOINT as string, // https://api.devnet.solana.com/
                //         'confirmed',
                //     );
                //     const signature = await signAndSendTransaction(
                //         connection,
                //         tx,
                //         wallet,
                //     );
                //     console.log(signature);
                // }
                await transferSolTo(target.amount, publicKey(tokenOwner));
            }
            onSuccess(' Completed!');
            clear();
        } catch (e) {
            console.error(e);
            onError('Cancelled Payment! Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // const userId = localStorage.getItem('User');
        const savedItems = localStorage.getItem('Saved-Items') || '';
        // if (!userId) {
        const temp = [];
        const json = JSON.parse(savedItems);
        const savedArtworks = Object.keys(json);
        if (shoppingCart.length < savedArtworks.length) {
            for (const item of fixedArts) {
                if (json[item.id as number]) temp.push(item);
            }
            setShoppingCart([...shoppingCart, ...temp]);
        }
        // } else {
        //     cartByUser(parseInt(userId))
        //         .then((item) => setShoppingCart(item))
        //         .catch((e) => console.error(e));
        // }

        if (shoppingCart.length === 0) return;
        // solanaToUsd().then((data) =>
        //     setConvertedPrice(calculatePrice(data, totalPrice() || 0.0) + 2.0),
        // );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                    x: [0, 100],
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
                                            onPress={clear}
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
                                            onValueChange={setGroupSelected}>
                                            {shoppingCart.map((item, index) => (
                                                <CartItemV2
                                                    key={index}
                                                    title={item.title}
                                                    currency="$"
                                                    cryptoCurrency="SOL"
                                                    cryptoPrice={
                                                        item.cryptoPrice
                                                    }
                                                    url={item.url}
                                                    creator={item.creator}
                                                    walletAddress={
                                                        item.walletAddress
                                                    }
                                                    mint={item.mint}
                                                />
                                            ))}
                                        </CheckboxGroup>
                                    </div>
                                    <Divider />
                                    <RadioGroup
                                        label="Payment Methods"
                                        className="px-5 mt-2"
                                        defaultValue="Crypto"
                                        orientation="horizontal">
                                        <RadioV2
                                            value="Crypto"
                                            className="w-full"
                                            description="Pay with SOLANA">
                                            Crypto
                                        </RadioV2>
                                        {/* <RadioV2 */}
                                        {/*     value="Visa/Debit" */}
                                        {/*     className="w-full" */}
                                        {/*     description="Pay with your desire card"> */}
                                        {/*     Visa/Debit */}
                                        {/* </RadioV2> */}
                                    </RadioGroup>
                                    <span className="p-5 grid grid-cols-6">
                                        <div className="col-span-4 font-semibold">
                                            <h3 className="line-through">
                                                Transaction Fee
                                            </h3>
                                            <h3>Total Price</h3>
                                        </div>
                                        <div className="col-span-2 italic">
                                            <h3 className="line-through">$2</h3>
                                            <h3>
                                                {getPrice()} SOL{' '}
                                                {totalPrice() > 0 && (
                                                    <span className="italic text-default">
                                                        $ {convertedPrice}
                                                    </span>
                                                )}
                                            </h3>
                                        </div>
                                    </span>
                                    <div className="flex justify-center items-center">
                                        <Button
                                            variant="flat"
                                            onPress={completePayment}
                                            isLoading={isLoading}
                                            isDisabled={
                                                groupSelected.length === 0
                                            }
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
