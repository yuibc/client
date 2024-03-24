import React, { FC, useMemo, useState } from 'react';
import {
    ConnectionProvider,
    useWallet,
    Wallet as TWallet,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    WalletAdapterNetwork,
    WalletReadyState,
    Adapter,
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
import { useAuth, useUser } from '@/services';
import { generateRandomString } from '@/helpers';

export const Wallet: FC = () => {
    const [isOpen, setOpen] = useState(false);
    const { wallets } = useWallet();
    const { authenticateWithWallet } = useAuth();
    const { create, findByWalletAddress } = useUser();

    const network = WalletAdapterNetwork.Testnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const [listedWallets, _] = useMemo(() => {
        const installed: TWallet[] = [];
        const notInstalled: TWallet[] = [];

        for (const wallet of wallets) {
            if (wallet.readyState === WalletReadyState.Installed) {
                installed.push(wallet);
            } else {
                notInstalled.push(wallet);
            }
        }

        return installed.length
            ? [installed, notInstalled]
            : [notInstalled, []];
    }, [wallets]);

    const connectWallet = async (adapter: Adapter) => {
        await adapter.connect();
        if (!adapter.connected) return;

        const walletAddress = adapter.publicKey?.toString() || '';
        const user = await findByWalletAddress(walletAddress);
        if (!user) {
            await create({
                email: '',
                displayName: generateRandomString(10),
                walletAddress,
            });
            await authenticateWithWallet(walletAddress);
            location.reload();
        }

        await authenticateWithWallet(walletAddress);
        localStorage.setItem('walletAddress', walletAddress);
        location.reload();
    };

    return (
        <>
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
                                        onClick={() =>
                                            connectWallet(wallet.adapter)
                                        }
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
        </>
    );
};
