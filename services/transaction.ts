import { transferSol } from '@metaplex-foundation/mpl-toolbox';
import {
    Umi,
    transactionBuilder,
    Transaction,
    Instruction,
    publicKey,
    SolAmount,
    PublicKey,
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

    const transferSolTo = (amount: number, destination: PublicKey) =>
        transferSol(umi, {
            amount: {
                identifier: 'SOL',
                decimals: 9,
                basisPoints: BigInt(amount * 1_000_000_000),
            },
            source: umi.identity,
            destination,
        }).sendAndConfirm(umi);

    const sendAndConfirm = async () => await builder.sendAndConfirm(umi);

    return {
        builder,
        signedTransaction,
        sendTransaction,
        confirmTransaction,
        tx,
        serializeTransaction,
        deserializeTransaction,
        sendAndConfirm,
        transferSolTo,
    };
}
