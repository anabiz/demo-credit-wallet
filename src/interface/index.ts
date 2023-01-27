export interface User {
    id: string;
    firstName: string;
    lastName: number;
    isDeleted: boolean;
    password: string;
    email: string;
    isVerified: boolean;
    phoneNumber: string;
}

export interface JwtExpPayload {
    expiresIn: string;
    exp: number;
    id: string;
    email: string;
}