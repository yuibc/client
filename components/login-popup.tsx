import { LoginPopupProps } from '@/types';
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from '@nextui-org/react';
import {
    ArcticonsPhantomBlackIcon,
    FlatColorIconsGoogle,
    IcBaselineEmailIcon,
    ParkSolidConnectIcon,
} from './icons';

export const LoginPopup = ({
    title,
    isOpen,
    onOpen,
    onConnect,
}: Partial<LoginPopupProps>) => {
    const emailInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: 'bg-default-100',
                input: 'text-sm xl:w-[535px] lg:w-[535px] md:[355px]',
            }}
            labelPlacement="outside"
            placeholder="Email"
            startContent={
                <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    );

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onOpen}>
            <ModalContent>
                <ModalBody className="text-center mt-5 font-semibold">
                    <h2 className="text-2xl">{title}</h2>
                    <div className="grid grid-cols-6 gap-3 my-3">
                        <span className="col-span-4">{emailInput}</span>
                        <span className="col-span-2">
                            <Button
                                title="Connect with email"
                                onClick={onConnect}
                                variant="flat"
                                startContent={<ParkSolidConnectIcon />}>
                                Connect
                            </Button>
                        </span>
                    </div>
                    <h2 className="text-2xl">Or</h2>
                </ModalBody>
                <ModalFooter className="grid grid-cols-6 gap-3 mb-5">
                    <Button
                        className="col-span-3"
                        title="Connect via Phantom"
                        onClick={onConnect}
                        variant="flat"
                        startContent={<ArcticonsPhantomBlackIcon />}>
                        Connect via Phantom
                    </Button>
                    <Button
                        className="col-span-3"
                        title="Connect via Google"
                        onClick={onConnect}
                        variant="flat"
                        startContent={<FlatColorIconsGoogle />}>
                        Connect via Google
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
