import { UserDropdownProps } from '@/types';
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
import {
    PhantomWalletAdapter,
    PhantomWalletName,
} from '@solana/wallet-adapter-wallets';
import { Profile } from './profile';

export const UserDropdown = ({
    displayName,
    onClick,
}: Partial<UserDropdownProps>) => {
    const { followers } = useFollow();
    const [followerCount, setFollowerCount] = useState(0);
    const wallet = useWallet();
    const [openProfile, setOpenProfile] = useState(false);

    const signOut = () => {
        localStorage.clear();
        location.href = '/';
        location.reload();
    };

    const fetchFollowerCount = async () => {
        const userId = localStorage.getItem('User');
        if (!userId) return;
        const fws = await followers(parseInt(userId));
        if (!fws) return;
        setFollowerCount(fws.length);
    };

    useEffect(() => {
        fetchFollowerCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Profile
                isOpen={openProfile}
                onClose={() => setOpenProfile(false)}
            />
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
                        aria-label="profile"
                        onPress={() => setOpenProfile(true)}
                        startContent={<IconamoonProfileCircleFill />}>
                        Profile
                    </DropdownItem>
                    <DropdownItem
                        key="dashboard"
                        as={Link}
                        href="/dashboard"
                        className="py-3"
                        aria-label="dashboard"
                        startContent={<IcRoundDashboardIcon />}>
                        Dashboard
                    </DropdownItem>
                    <DropdownItem
                        key="sign-out"
                        color="danger"
                        aria-label="signOut"
                        className="text-danger py-3"
                        onPress={signOut}
                        startContent={<LetsIconsSignOutSqureFill />}>
                        Sign out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};
