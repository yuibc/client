export function usePhantomProvider() {
    const provider = () => window.phantom?.solana;

    const isPhantomInstalled = () => window.phantom?.solana?.isPhantom;

    const establishConnection = async () => {
        const res = await provider().connect();
        return res.publicKey.toString();
    };

    return {
        provider,
        isPhantomInstalled,
        establishConnection,
    };
}
