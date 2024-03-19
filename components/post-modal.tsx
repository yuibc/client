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
import Dropzone from './dropzone';

export const PostModal = ({
    onPost,
    isOpen,
    onClose,
}: Partial<PostModalProps>) => {
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
                            />
                            <Textarea
                                label="Description"
                                labelPlacement="outside"
                                placeholder="..."
                                disableAutosize
                                maxRows={4}
                                size="lg"
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
                            <Textarea disableAutosize maxRows={4} size="lg" />
                        </span>
                        <span className="col-span-6">
                            <Dropzone />
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
                                <Checkbox>Published?</Checkbox>
                            </span>
                        </span>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-center items-center">
                    <Button
                        title="post"
                        color="primary"
                        variant="flat"
                        onPress={onPost}>
                        Add to your creation
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
