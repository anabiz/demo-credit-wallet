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

export interface transactionParameter {
    total: number;
    perPage: number;
    offset: number;
    to: number;
    lastPage: number;
    currentPage: number;
    from: number;
    data: Transaction[]
}