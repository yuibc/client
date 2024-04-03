export function generateRandomString(length: number) {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        const randomChar = charSet[randomIndex];
        result += randomChar;
    }

    return result;
}

export const toIPFSGateway = (ipfs: string) =>
    `https://ipfs.io/ipfs/${ipfs.slice(7, ipfs.length)}`;

export function groupBy(collection: Record<string, any>[], property: string) {
    let i = 0,
        val,
        index,
        values = [],
        result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1) result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

export const isCreator = (owner: string) => {
    const walletAddress = localStorage.getItem('walletAddress');
    if (!walletAddress) return false;
    return walletAddress === owner;
};
