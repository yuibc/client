import { LoginPopupProps } from '@/types';
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Spacer,
} from '@nextui-org/react';
import {
    ArcticonsPhantomBlackIcon,
    FlatColorIconsGoogle,
    IcBaselineEmailIcon,
    ParkSolidConnectIcon,
} from './icons';
import { useUser } from '@/services';
import { useRef, useState } from 'react';
import { useAuth } from '@/services/auth';

export const LoginPopup = ({
    title,
    isOpen,
    onOpen,
    onConnect,
}: Partial<LoginPopupProps>) => {
    const url = '';
    const { create } = useUser(url);
    const { authenticate } = useAuth(url);
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const displayName = useRef<HTMLInputElement | null>(null);
    const [isSignUp, setIsSignUp] = useState(false);

    const signup = async () => {
        await create({
            email: email.current?.value,
            password: password.current?.value,
            displayName: displayName.current?.value,
        });
        setTimeout(async () => {
            await authenticate({
                email: email.current?.value,
                password: password.current?.value,
            });
            location.reload();
        }, 1000);
    };

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onOpen}>
            <ModalContent>
                <ModalBody className="text-center mt-5 font-semibold">
                    <h2 className="text-2xl">{title}</h2>
                    <div className="grid grid-cols-6 gap-3 my-3">
                        <span className="col-span-4">
                            <Input
                                ref={email}
                                aria-label="Email"
                                classNames={{
                                    inputWrapper: 'bg-default-100',
                                    input: 'text-sm xl:w-[535px] lg:w-[535px] md:[355px]',
                                }}
                                labelPlacement="outside"
                                placeholder="Email"
                                startContent={
                                    <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                type="email"
                            />
                            {isSignUp && (
                                <>
                                    <Spacer />
                                    <Spacer />
                                    <Input
                                        ref={password}
                                        aria-label="Password"
                                        classNames={{
                                            inputWrapper: 'bg-default-100',
                                            input: 'text-sm xl:w-[535px] lg:w-[535px] md:[355px]',
                                        }}
                                        labelPlacement="outside"
                                        placeholder="Password"
                                        startContent={
                                            <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        type="password"
                                    />
                                    <Spacer />
                                    <Spacer />
                                    <Input
                                        ref={displayName}
                                        aria-label="Display Name"
                                        classNames={{
                                            inputWrapper: 'bg-default-100',
                                            input: 'text-sm xl:w-[535px] lg:w-[535px] md:[355px]',
                                        }}
                                        labelPlacement="outside"
                                        placeholder="Display Name"
                                        startContent={
                                            <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        type="text"
                                    />
                                </>
                            )}
                        </span>
                        <span className="col-span-2">
                            {isSignUp ? (
                                <Button
                                    title="Sign up with email"
                                    onPress={signup}
                                    variant="flat"
                                    startContent={<ParkSolidConnectIcon />}>
                                    Sign up
                                </Button>
                            ) : (
                                <Button
                                    title="Connect with email"
                                    onPress={() => setIsSignUp(!isSignUp)}
                                    variant="flat"
                                    startContent={<ParkSolidConnectIcon />}>
                                    Connect
                                </Button>
                            )}
                        </span>
                    </div>
                    <Button
                        variant="light"
                        onPress={() => setIsSignUp(!isSignUp)}>
                        {isSignUp
                            ? 'Already have an account? Click here to sign in.'
                            : 'No account? Click here to sign up.'}
                    </Button>
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
