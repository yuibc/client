import {
    Umi,
    transactionBuilder,
    Transaction,
    Instruction,
} from '@metaplex-foundation/umi';

export function useTransaction(umi: Umi) {
    const builder = transactionBuilder();

    const tx = async (instructions: Instruction[]) =>
        umi.transactions.create({
            version: 0,
            payer: umi.identity.publicKey,
            instructions,
            blockhash: (await umi.rpc.getLatestBlockhash()).blockhash,
        });

    const serializeTransaction = (tx: Transaction) =>
        umi.transactions.serialize(tx);

    const deserializeTransaction = (serialize: Uint8Array) =>
        umi.transactions.deserialize(serialize);

    const signedTransaction = async () => await builder.buildAndSign(umi);

    const sendTransaction = async (signedTransaction: Transaction) =>
        umi.rpc.sendTransaction(signedTransaction);

    const confirmTransaction = async (signature: Uint8Array) =>
        await umi.rpc.confirmTransaction(signature, {
            strategy: {
                type: 'blockhash',
                ...(await umi.rpc.getLatestBlockhash()),
            },
        });

    return {
        signedTransaction,
        sendTransaction,
        confirmTransaction,
        tx,
        serializeTransaction,
        deserializeTransaction,
    };
}
