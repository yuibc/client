import React, { FC, useMemo, useState } from 'react';
import {
    ConnectionProvider,
    useWallet,
    Wallet as TWallet,
} from '@solana/wallet-adapter-react';
import {
    WalletAdapterNetwork,
    WalletReadyState,
} from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {
    Button,
    Link,
    Listbox,
    ListboxItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from '@nextui-org/react';
import { WalletLoginIcon } from './icons';
import { WalletIcon } from '@solana/wallet-adapter-react-ui';
import { isAuthAtom, useAuth, useUser } from '@/services';
import { generateRandomString } from '@/helpers';
import { useSetAtom } from 'jotai';

export const Wallet: FC = () => {
    const [isOpen, setOpen] = useState(false);
    const wallet = useWallet();
    const { authenticateWithWallet } = useAuth();
    const { create, findByWalletAddress } = useUser();
    const setIsAuth = useSetAtom(isAuthAtom);

    const network = WalletAdapterNetwork.Testnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const [listedWallets, _] = useMemo(() => {
        const installed: TWallet[] = [];
        const notInstalled: TWallet[] = [];

        for (const w of wallet.wallets) {
            if (w.readyState === WalletReadyState.Installed) {
                installed.push(w);
            } else {
                notInstalled.push(w);
            }
        }

        return installed.length
            ? [installed, notInstalled]
            : [notInstalled, []];
    }, [wallet.wallets]);

    const connectWallet = async (selectedWallet: TWallet) => {
        wallet.wallet = selectedWallet;
        wallet.select(selectedWallet.adapter.name);
        await wallet.wallet.adapter.connect();

        const walletAddress = wallet.wallet.adapter.publicKey?.toString() || '';
        const user = await findByWalletAddress(walletAddress);
        if (!user) {
            await create({
                email: '',
                displayName: generateRandomString(10),
                walletAddress,
            });
            await authenticateWithWallet(walletAddress);
            setOpen(false);
            setIsAuth(true);
            return;
        }
        await authenticateWithWallet(walletAddress);
        localStorage.setItem('walletAddress', walletAddress);
        setOpen(false);
        setIsAuth(true);
    };

    return (
        <ConnectionProvider endpoint={endpoint}>
            <Button
                isExternal
                as={Link}
                startContent={<WalletLoginIcon />}
                onPress={() => setOpen(!isOpen)}
                variant="flat">
                Connect
            </Button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onClose={() => setOpen(false)}>
                <ModalContent>
                    <ModalBody className="text-center mt-5 font-semibold">
                        <h2 className="text-2xl">
                            Connect a wallet on Solana to continue
                        </h2>
                    </ModalBody>
                    <ModalFooter className="flex justify-center flex-col">
                        <Listbox
                            variant="faded"
                            disallowEmptySelection
                            aria-label="Wallet Selection"
                            selectionMode="single">
                            {listedWallets.map((wallet) => (
                                <ListboxItem
                                    key={wallet.adapter.name}
                                    textValue={wallet.adapter.name}
                                    onClick={() => connectWallet(wallet)}
                                    startContent={
                                        <WalletIcon
                                            wallet={wallet}
                                            width={36}
                                        />
                                    }>
                                    <span className="flex justify-between items-center p-3">
                                        <span className="font-semibold">
                                            {wallet.adapter.name}
                                        </span>
                                        <span className="font-mono">
                                            {wallet.readyState ===
                                            WalletReadyState.Installed
                                                ? 'Detected'
                                                : ''}
                                        </span>
                                    </span>
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ConnectionProvider>
    );
};
