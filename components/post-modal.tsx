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
    Chip,
    Card,
    CardBody,
    ModalHeader,
} from '@nextui-org/react';
import { PostModalProps, TCategory } from '@/types';
import { Dropzone } from './dropzone';
import {
    artworksAtom,
    useArtwork,
    useMetaplexUmi,
    useNFTStorage,
    useToast,
} from '@/services';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCategory, useUmi } from '@/services';
import { useSetAtom } from 'jotai';

export const PostModal = ({ isOpen, onClose }: Partial<PostModalProps>) => {
    const title = useRef<HTMLInputElement | null>(null);
    const description = useRef<HTMLTextAreaElement | null>(null);
    const cryptoPrice = useRef<HTMLInputElement | null>(null);

    const [published, setPublished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileUploaded, setFileUploaded] = useState<File | null>(null);
    const [cates, setCategories] = useState<TCategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { mint, nft } = useMetaplexUmi();
    const { uploadArtwork } = useNFTStorage();
    const { add, artworks } = useArtwork();
    const { categories: retrieveCategories } = useCategory();
    const umi = useUmi();
    const { onSuccess, onError } = useToast();
    const setUploadedArtwork = useSetAtom(artworksAtom);

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target) return;
        if (!e.target.files) return;
        setFileUploaded(e.target.files[0]);
        onSuccess('The uploaded file is available');
    };

    const addArtwork = async () => {
        try {
            const walletAddress = localStorage.getItem('walletAddress');
            if (!title.current?.value || !description.current?.value) return;
            if (!walletAddress) return;
            setIsLoading(true);

            const signer = mint(umi);

            const {
                url: metadata,
                data,
                ipnft,
            } = await uploadArtwork({
                title: title.current.value,
                description: description.current.value,
                owner: walletAddress,
                artwork: fileUploaded as File,
            });

            const target = nft(umi, signer, {
                name: title.current.value,
                uri: data.image.toString(),
                walletAddress,
            });

            const instructions = target.getInstructions();
            await target.sendAndConfirm(umi);

            await add({
                title: title.current.value,
                description: description.current.value,
                categories: selectedCategories.join(','),
                cryptoPrice:
                    parseFloat(cryptoPrice.current?.value as string) || 0.0,
                currency: 'SOL',
                url: data.image.toString(),
                metadata,
                published,
                instructions,
                mint: signer.publicKey,
                cid: ipnft,
            });
            const updatedArtworks = await artworks(walletAddress);
            setUploadedArtwork(updatedArtworks);
            if (onClose) onClose();
            onSuccess('Uploaded new creation!');
        } catch (e) {
            console.error(e);
            onError('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    const addCategory = (category: unknown) => {
        if (!category || (category as string).length === 0) return;
        const added =
            selectedCategories.filter(
                (selected) => selected === (category as string),
            ).length === 1;
        if (added) return;
        setSelectedCategories([...selectedCategories, category as string]);
    };

    const removeCategory = (remove: string) => {
        setSelectedCategories(
            selectedCategories.filter((selected) => selected !== remove),
        );
    };

    useEffect(() => {
        retrieveCategories()
            .then((res) => setCategories(res))
            .catch((e) => console.error(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalContent>
                <ModalHeader>Mint your creation into NFT</ModalHeader>
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
                                defaultValue=""
                                type="search"
                                ref={title}
                            />
                            <Textarea
                                label="Description"
                                labelPlacement="outside"
                                placeholder="..."
                                disableAutosize
                                defaultValue=""
                                maxRows={4}
                                size="lg"
                                ref={description}
                            />
                            <Autocomplete
                                label="Categories"
                                labelPlacement="outside"
                                onSelectionChange={(key) => addCategory(key)}
                                placeholder="...">
                                {cates.map((c) => (
                                    <AutocompleteItem
                                        key={c.display}
                                        value={c.display}>
                                        {c.display}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Card shadow="none">
                                <CardBody className="flex flex-row gap-2">
                                    {selectedCategories.map(
                                        (selected, index) => (
                                            <Chip
                                                key={index}
                                                onClose={() =>
                                                    removeCategory(selected)
                                                }
                                                variant="flat">
                                                {selected}
                                            </Chip>
                                        ),
                                    )}
                                </CardBody>
                            </Card>
                        </span>
                        <span className="col-span-6">
                            <Dropzone onChange={handleUpload} />
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <span className="grid grid-cols-6 gap-3">
                                <Input
                                    aria-label="crypto-price"
                                    defaultValue="0.0"
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
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
