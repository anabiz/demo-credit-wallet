export interface Transaction {
    id?: string;
    tranType?: string;
    status: string;
    reference: string;
    amount: number;
    senderId: string;
    receiverId: string;
    description: string
    created_at?: Date;
    updated_at?: Date;
}