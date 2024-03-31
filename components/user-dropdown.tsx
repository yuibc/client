import { TInsensitiveUser, UserDropdownProps } from '@/types';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from '@nextui-org/react';
import {
    FluentPlugConnected24Filled,
    GgArrowsExchangeV,
    IcRoundDashboardIcon,
    IconamoonProfileCircleFill,
    LetsIconsSignOutSqureFill,
    WalletLoginIcon,
} from './icons';
import { CreatorBlock } from './creator-block';
import { useFollow } from '@/services';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletName } from '@solana/wallet-adapter-wallets';
import { Wallet } from './wallet';

export const UserDropdown = ({
    displayName,
    onClick,
}: Partial<UserDropdownProps>) => {
    const { followers } = useFollow();
    const [followerCount, setFollowerCount] = useState(0);
    const wallet = useWallet();

    const signOut = () => {
        localStorage.clear();
        location.href = '/';
        location.reload();
    };

    const fetchFollowerCount = async () => {
        const userId = parseInt(localStorage.getItem('User') as string);
        const fws = (await followers(userId)) as TInsensitiveUser[];
        setFollowerCount(fws.length);
    };

    const reconnectWallet = async () => {
        const walletName = localStorage.getItem('walletName');
        if (!walletName) return;
        // Default
        if (walletName === PhantomWalletName) {
            wallet.select(PhantomWalletName);
            await wallet.connect();
        }
    };

    useEffect(() => {
        fetchFollowerCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Dropdown backdrop="opaque">
            <DropdownTrigger>
                <Button
                    size="md"
                    onClick={onClick}
                    className="text-sm font-semibold text-default-600 bg-default-100"
                    startContent={<WalletLoginIcon />}
                    variant="flat">
                    {displayName}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dynamic Actions"
                disabledKeys={[
                    wallet.connected ? 'reconnect' : '',
                    'change-wallet',
                ]}>
                <DropdownItem>
                    <CreatorBlock
                        displayName={displayName}
                        followerCount={followerCount}
                        borderless
                        noFollowButton
                    />
                </DropdownItem>
                <DropdownItem
                    key="profile"
                    className="py-3"
                    startContent={<IconamoonProfileCircleFill />}>
                    Profile
                </DropdownItem>
                <DropdownItem
                    key="reconnect"
                    className="py-3"
                    onPress={reconnectWallet}
                    startContent={<FluentPlugConnected24Filled />}>
                    Reconnect
                </DropdownItem>
                <DropdownItem
                    key="change-wallet"
                    className="py-3"
                    onPress={reconnectWallet}
                    startContent={<GgArrowsExchangeV />}>
                    Change Wallet
                </DropdownItem>
                <DropdownItem
                    key="dashboard"
                    as={Link}
                    href="/dashboard"
                    className="py-3"
                    startContent={<IcRoundDashboardIcon />}>
                    Dashboard
                </DropdownItem>
                <DropdownItem
                    key="sign-out"
                    color="danger"
                    className="text-danger py-3"
                    onPress={signOut}
                    startContent={<LetsIconsSignOutSqureFill />}>
                    Sign out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
