import { TPurchasedItemProps } from '@/types';
import {
    Card,
    CardBody,
    Chip,
    Image,
    Button,
    Snippet,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

export const PurchasedItem = ({
    id,
    transaction,
    mint,
    payer,
    amount,
    status,
    artworkUrl,
    purchasedAt,
    artworkTitle,
}: Partial<TPurchasedItemProps>) => {
    const formatDate = () => {
        dayjs.extend(LocalizedFormat);
        return purchasedAt ? dayjs(purchasedAt).format('DD/MM/YYYY LT') : '';
    };

    return (
        <Card
            isBlurred
            className="col-span-full border-none bg-background/60 dark:bg-default-100/50"
            shadow="sm">
            <CardBody>
                <div className="grid grid-cols-12 gap-4 items-center justify-center">
                    <div className="relative col-span-3">
                        <Image width={150} shadow="lg" src={artworkUrl} />
                    </div>

                    <div className="flex flex-col col-span-3">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-large font-semibold mt-2">
                                    {artworkTitle}
                                </h1>
                                <p className="text-small text-foreground/80 font-medium">
                                    {amount} SOL
                                </p>
                                <h1 className="text-small">{formatDate()}</h1>
                                <Chip size="lg" variant="flat" color="warning">
                                    {status}
                                </Chip>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <Snippet
                            size="sm"
                            color="success"
                            variant="flat"
                            symbol=" ">
                            {mint}
                        </Snippet>
                    </div>
                    <div className="col-span-1">
                        <Button variant="shadow" color="success">
                            Send and Sign
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
