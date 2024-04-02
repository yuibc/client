import { transferSol } from '@metaplex-foundation/mpl-toolbox';
import {
    Umi,
    transactionBuilder,
    Transaction,
    Instruction,
    PublicKey,
    Signer,
} from '@metaplex-foundation/umi';
import { createTransferCheckedInstruction } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey as PKey,
    SystemProgram,
    Transaction as Tx,
    sendAndConfirmTransaction,
    Keypair,
} from '@solana/web3.js';

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

    const transferOwnership = async (
        amount: number,
        currentOwner: string,
        destOwner: string,
        mint: string,
    ) => {
        const connection = new Connection(
            process.env.NEXT_PUBLIC_RPC_ENDPOINT as string,
            'confirmed',
        );

        const fromPublicKey = new PKey(currentOwner);
        const toPublicKey = new PKey(destOwner);
        const mintPublicKey = new PKey(mint);
        const amountLamports = amount * LAMPORTS_PER_SOL;

        const signer = Keypair.generate();

        const tx = new Tx()
            .add(
                SystemProgram.transfer({
                    fromPubkey: fromPublicKey,
                    toPubkey: toPublicKey,
                    lamports: amountLamports,
                }),
            )
            .add(
                createTransferCheckedInstruction(
                    fromPublicKey,
                    mintPublicKey,
                    toPublicKey,
                    fromPublicKey,
                    amountLamports,
                    9,
                ),
            );

        return { tx, connection, signer };
    };

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
        transferOwnership,
    };
}
