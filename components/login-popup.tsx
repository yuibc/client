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
import { useUser, useAuth, usePhantomProvider } from '@/services';
import { useRef, useState } from 'react';
import { generateRandomString } from '@/helpers';

export const LoginPopup = ({
    title,
    isOpen,
    onOpen,
    onConnect,
}: Partial<LoginPopupProps>) => {
    const { create, findByWalletAddress } = useUser();
    const { authenticate, authenticateWithWallet } = useAuth();
    const { isPhantomInstalled, establishConnection } = usePhantomProvider();
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const displayName = useRef<HTMLInputElement | null>(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isConnect, setIsConnect] = useState(false);
    const [isSignUpContinue, setIsSignUpContinue] = useState(false);

    const switchState = () => {
        setIsSignUp(!isSignUp);
        setIsConnect(false);
    };

    const signup = async () => {
        await create({
            email: email.current?.value,
            displayName: displayName.current?.value,
        });
        await authenticate({
            email: email.current?.value,
            password: password.current?.value,
        });
        location.reload();
    };

    const connect = async () => {
        await authenticate({
            email: email.current?.value,
            password: password.current?.value,
        });
        location.reload();
    };

    const connectWithPhantom = async () => {
        if (!isPhantomInstalled()) {
            alert("You haven't installed Phantom app yet!");
            return;
        }
        setIsSignUpContinue(true);
    };

    const finishConnection = async () => {
        const walletAddress = await establishConnection();
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
        location.reload();
    };

    return (
        <>
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
                                    isRequired
                                    startContent={
                                        <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    type="email"
                                />
                                {isConnect && (
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
                                            isRequired
                                            startContent={
                                                <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            type="password"
                                        />
                                    </>
                                )}
                                {isSignUp && !isConnect && (
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
                                            isRequired
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
                                ) : isConnect ? (
                                    <Button
                                        title="Connect with email"
                                        onPress={connect}
                                        variant="flat"
                                        startContent={<ParkSolidConnectIcon />}>
                                        Connect
                                    </Button>
                                ) : (
                                    <Button
                                        title="Connect with email"
                                        onPress={() => setIsConnect(true)}
                                        variant="flat"
                                        startContent={<ParkSolidConnectIcon />}>
                                        Log in
                                    </Button>
                                )}
                            </span>
                        </div>
                        <Button variant="light" onPress={switchState}>
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
                            onClick={connectWithPhantom}
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
            <Modal
                backdrop="blur"
                isOpen={isSignUpContinue}
                onClose={() => setIsSignUpContinue(false)}>
                <ModalContent>
                    <ModalBody className="text-center mt-5 font-semibold">
                        <h2 className="text-2xl">Finish Connection</h2>
                        <div className="grid grid-cols-6 gap-3 my-3">
                            <span className="col-span-6">
                                <Input
                                    ref={email}
                                    aria-label="Email (Optional)"
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm w-full',
                                    }}
                                    labelPlacement="outside"
                                    placeholder="Email (Optional)"
                                    startContent={
                                        <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    type="email"
                                />
                                <Spacer />
                                <Spacer />
                                <Input
                                    ref={password}
                                    aria-label="Password"
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm w-full',
                                    }}
                                    labelPlacement="outside"
                                    placeholder="Password"
                                    startContent={
                                        <IcBaselineEmailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    type="password"
                                />
                            </span>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex items-center justify-center gap-3 mb-5">
                        <Button
                            className="col-span-3"
                            title="Connect"
                            onClick={finishConnection}
                            variant="flat"
                            startContent={<ArcticonsPhantomBlackIcon />}>
                            Connect
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
