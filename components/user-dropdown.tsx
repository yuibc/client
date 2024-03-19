import { UserDropdownProps } from '@/types';
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

export const UserDropdown = ({ displayName }: Partial<UserDropdownProps>) => {
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
                        followerCount={1200}
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
                    startContent={<LetsIconsSignOutSqureFill />}>
                    Sign out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
