import { Network, ShyftSdk } from '@shyft-to/js';

/**
 * @param mint              Token address or mint of the asset
 * @param currentOwner      Public key of current owner
 * @param newOwner          Public key of new owner
 */
type TTransferInfo = {
    mint: string | string[];
    currentOwner: string;
    newOwner: string;
};

export function useShyftProvider() {
    const apiKey = process.env.NEXT_PUBLIC_SHYFT_API_KEY;
    const shyft = new ShyftSdk({
        network: Network.Devnet,
        apiKey: apiKey as string,
    });

    const transfer = async ({
        mint,
        currentOwner,
        newOwner,
    }: TTransferInfo): Promise<string> => {
        return await shyft.nft.transfer({
            mint: mint as string,
            fromAddress: currentOwner,
            toAddress: newOwner,
        });
    };

    const transferMany = async ({
        mint,
        currentOwner,
        newOwner,
    }: TTransferInfo) => {
        return await shyft.nft.transferMultiple({
            mints: mint as string[],
            fromAddress: currentOwner,
            toAddress: newOwner,
        });
    };

    const createRelayer = async () => {
        return await shyft.txnRelayer.getOrCreate();
    };

    const completeTransaction = async (encodedTransaction: string) => {
        return await shyft.transaction.send({
            encodedTransaction,
        });
    };

    const completeTransactions = async (encodedTransactions: string[]) => {
        return await shyft.transaction.sendMany({
            encodedTransactions,
            commitment: 'finalized',
        });
    };

    return {
        transfer,
        transferMany,
        createRelayer,
        completeTransaction,
        completeTransactions,
    };
}
