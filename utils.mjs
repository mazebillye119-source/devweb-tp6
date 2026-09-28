import crypto from "node:crypto";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function nanoid(length = 6) {
    const bytes = crypto.randomBytes(length);
    let result = "";
    for (const byte of bytes) {
        result += ALPHABET[byte % ALPHABET.length];
    }
    return result;
}