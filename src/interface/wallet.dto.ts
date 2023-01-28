export interface Wallet {
    id: string;
    userId: string;
    walletID: string;
    balance?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface WalletAndUser {
    id?: string;
    userId: string;
    walletID: string;
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
    created_at?: Date;
    updated_at?: Date;
}
