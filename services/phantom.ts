export function usePhantomProvider() {
    const provider = () => window.phantom?.solana;

    const isPhantomInstalled = () => window.phantom?.solana?.isPhantom;

    const establishConnection = async () => {
        try {
            const res = await provider().connect();
            return res.publicKey.toString();
        } catch (e) {
            console.error(e);
        }
    };

    return {
        isPhantomInstalled,
        establishConnection,
    };
}
