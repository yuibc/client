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
