import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    Input,
    Autocomplete,
    AutocompleteItem,
    Textarea,
    Spacer,
    Checkbox,
} from '@nextui-org/react';
import { PostModalProps } from '@/types';
import { Dropzone } from './dropzone';
import { useArtwork, useMetaplex } from '@/services';
import { ChangeEvent, useRef, useState } from 'react';
import {
    generateSigner,
    publicKey,
    signerIdentity,
} from '@metaplex-foundation/umi';
import { useWallet } from '@solana/wallet-adapter-react';

export const PostModal = ({ isOpen, onClose }: Partial<PostModalProps>) => {
    const title = useRef<HTMLInputElement | null>(null);
    const description = useRef<HTMLTextAreaElement | null>(null);
    const categories = useRef<HTMLTextAreaElement | null>(null);
    const cryptoPrice = useRef<HTMLInputElement | null>(null);

    const [published, setPublished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileUploaded, setFileUploaded] = useState<File | null>(null);
    const { uploadArtwork, nft, mintToken, umi } = useMetaplex();
    const { add } = useArtwork();
    const { connected, wallet } = useWallet();

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target) return;
        if (!e.target.files) return;
        setFileUploaded(e.target.files[0]);
    };

    const addArtwork = async () => {
        try {
            const walletAddress = localStorage.getItem('walletAddress');
            if (!title.current?.value || !description.current?.value) return;
            if (!walletAddress) return;
            setIsLoading(true);

            const mint = generateSigner(umi);
            umi.use(signerIdentity(mint));

            console.log(walletAddress);
            console.log(publicKey(walletAddress));
            const { url: metadata, data } = await uploadArtwork({
                title: title.current.value,
                description: description.current.value,
                owner: walletAddress,
                artwork: fileUploaded as File,
            });

            const nftResult = await nft(mint, walletAddress, {
                name: title.current.value,
                uri: data.image.toString(),
            });
            // const mintResult = await mintToken(mint, walletAddress);
            console.log(nftResult.result);
            // console.log(mintResult.result);

            await add({
                title: title.current.value,
                description: description.current.value,
                categories: categories.current?.value,
                cryptoPrice:
                    parseFloat(cryptoPrice.current?.value as string) || 0.0,
                currency: 'SOL',
                url: data.image.toString(),
                metadata,
                published,
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
            if (onClose) onClose();
        }
    };

    const check = () => {
        alert(connected ? 'Connected' : 'Not connected');
        console.log(wallet);
    };

    const animals = [
        {
            label: 'Cat',
            value: 'cat',
            description: 'The second most popular pet in the world',
        },
        {
            label: 'Dog',
            value: 'dog',
            description: 'The most popular pet in the world',
        },
        {
            label: 'Elephant',
            value: 'elephant',
            description: 'The largest land animal',
        },
        { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
        {
            label: 'Tiger',
            value: 'tiger',
            description: 'The largest cat species',
        },
        {
            label: 'Giraffe',
            value: 'giraffe',
            description: 'The tallest land animal',
        },
        {
            label: 'Dolphin',
            value: 'dolphin',
            description:
                'A widely distributed and diverse group of aquatic mammals',
        },
        {
            label: 'Penguin',
            value: 'penguin',
            description: 'A group of aquatic flightless birds',
        },
        {
            label: 'Zebra',
            value: 'zebra',
            description: 'A several species of African equids',
        },
        {
            label: 'Shark',
            value: 'shark',
            description:
                'A group of elasmobranch fish characterized by a cartilaginous skeleton',
        },
        {
            label: 'Whale',
            value: 'whale',
            description:
                'Diverse group of fully aquatic placental marine mammals',
        },
        {
            label: 'Otter',
            value: 'otter',
            description: 'A carnivorous mammal in the subfamily Lutrinae',
        },
        {
            label: 'Crocodile',
            value: 'crocodile',
            description: 'A large semiaquatic reptile',
        },
    ];
    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalContent>
                <ModalBody className="mt-5 font-semibold">
                    <div className="grid grid-cols-12 mt-3 gap-5">
                        <span className="col-span-6 flex flex-col gap-5">
                            <Input
                                aria-label="title"
                                classNames={{
                                    inputWrapper: 'bg-default-100',
                                    input: 'text-sm xl:w-[535px] lg:w-[535px] md:[355px]',
                                }}
                                label="Title"
                                labelPlacement="outside"
                                placeholder="..."
                                startContent=""
                                type="search"
                                ref={title}
                            />
                            <Textarea
                                label="Description"
                                labelPlacement="outside"
                                placeholder="..."
                                disableAutosize
                                maxRows={4}
                                size="lg"
                                ref={description}
                            />
                            <Autocomplete
                                label="Categories"
                                labelPlacement="outside"
                                placeholder="...">
                                {animals.map((animal) => (
                                    <AutocompleteItem
                                        key={animal.value}
                                        value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Textarea
                                disableAutosize
                                maxRows={4}
                                size="lg"
                                ref={categories}
                            />
                        </span>
                        <span className="col-span-6">
                            <Dropzone onChange={handleUpload} />
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <span className="grid grid-cols-6 gap-3">
                                <Input
                                    aria-label="crypto-price"
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm',
                                        base: 'col-span-4',
                                    }}
                                    label="Crypto Price"
                                    labelPlacement="outside"
                                    placeholder="0.00"
                                    startContent=""
                                    type="number"
                                    ref={cryptoPrice}
                                />
                                <Input
                                    aria-label="crypto-currency"
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm',
                                        base: 'col-span-2 font-semibold',
                                    }}
                                    label="Currency"
                                    labelPlacement="outside"
                                    value="SOL"
                                    startContent=""
                                    type="text"
                                    readOnly
                                />
                                <Checkbox
                                    isSelected={published}
                                    onValueChange={setPublished}>
                                    Published?
                                </Checkbox>
                            </span>
                        </span>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-center items-center">
                    <Button
                        title="post"
                        color="primary"
                        variant="flat"
                        isLoading={isLoading}
                        onPress={addArtwork}>
                        Add to your creation
                    </Button>
                    <Button
                        title="check"
                        color="primary"
                        variant="flat"
                        onPress={check}>
                        Check
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
