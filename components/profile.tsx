import React, { useRef } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Spacer,
} from '@nextui-org/react';
import { TProfileProps } from '@/types';
import { profileAtom, useToast, useUmi, useUser } from '@/services';
import { useAtomValue } from 'jotai';

export const Profile = ({ isOpen, onClose }: Partial<TProfileProps>) => {
    const displayName = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const { updateProfile } = useUser();
    const umi = useUmi();
    const { onSuccess } = useToast();
    const info = useAtomValue(profileAtom);

    const update = async () => {
        try {
            if (!displayName.current) return;
            if (!displayName.current.value) return;
            const walletAddress = umi.identity.publicKey;
            await updateProfile(walletAddress, {
                displayName: displayName.current.value,
                email: email.current?.value as string,
            });
            if (onClose) onClose();
            onSuccess('Updated profile');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal isOpen={isOpen} placement="top-center" backdrop="blur">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Profile
                </ModalHeader>
                <ModalBody>
                    <Input
                        autoFocus
                        variant="bordered"
                        label="Display name"
                        placeholder="@"
                        defaultValue={info.displayName}
                        ref={displayName}
                    />
                    <Spacer />
                    <Input
                        label="Email"
                        placeholder="#"
                        defaultValue={info.email}
                        variant="bordered"
                        ref={email}
                    />
                    <Spacer />
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={update}>
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
