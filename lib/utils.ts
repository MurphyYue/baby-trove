import crypto from "crypto";

export const hashPassword = (password: string) => {
    return crypto.createHash('sha256').update(password).digest('hex')
}

export const compareHashPassword = (password: string, hashedPassword: string) => {
    if (hashPassword(password) === hashedPassword) {
        return { success: true, message: 'Password matched' }
    }
    return { success: false, message: 'Password not matched' }
}