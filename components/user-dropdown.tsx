import { TInsensitiveUser, UserDropdownProps } from '@/types';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import {
    IcRoundDashboardIcon,
    IconamoonProfileCircleFill,
    LetsIconsSignOutSqureFill,
    WalletLoginIcon,
} from './icons';
import { CreatorBlock } from './creator-block';
import { useFollow } from '@/services';
import { useEffect, useState } from 'react';

export const UserDropdown = ({ displayName }: Partial<UserDropdownProps>) => {
    const { followers } = useFollow();
    const [followerCount, setFollowerCount] = useState(0);
    const signOut = () => {
        localStorage.removeItem('Access-Token');
        localStorage.removeItem('User');
        location.reload();
    };

    const fetchFollowerCount = async () => {
        const userId = parseInt(localStorage.getItem('User') as string);
        const fws = (await followers(userId)) as TInsensitiveUser[];
        setFollowerCount(fws.length);
    };

    useEffect(() => {
        fetchFollowerCount();
    }, []);
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    size="md"
                    className="text-sm font-semibold text-default-600 bg-default-100"
                    startContent={<WalletLoginIcon />}
                    variant="flat">
                    {displayName}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
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
                    startContent={<IconamoonProfileCircleFill />}>
                    Profile
                </DropdownItem>
                <DropdownItem
                    key="dashboard"
                    href="/dashboard"
                    startContent={<IcRoundDashboardIcon />}>
                    Dashboard
                </DropdownItem>
                <DropdownItem
                    key="sign-out"
                    color="danger"
                    className="text-danger"
                    onPress={signOut}
                    startContent={<LetsIconsSignOutSqureFill />}>
                    Sign out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
