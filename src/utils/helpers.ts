import { Transaction, transactionParameter } from "../interface/transaction.dto";

export const generateWalletId = (): string =>{
    return (Math.floor(100000000 + Math.random() * 900000000)).toString();
}

export const getPagination = (
    total: {count: number}, 
    perPage: number, 
    offset: number, 
    rows: Transaction[], 
    page: number
): transactionParameter => {
    return {
        total: total.count,
        perPage: perPage,
        offset: offset,
        to: offset + rows.length,
        lastPage: Math.ceil(total.count / perPage),
        currentPage: page,
        from: offset,
        data: rows
    };
}